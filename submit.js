/**
 * This script submits COMP 426 assignment code to the server
 */


// Dependencies
const FormData = require('form-data');
const Cryptr = require("cryptr");
const prompts = require("prompts");
const chalk = require("chalk");
const zip = require("bestzip");
const fs = require("fs");


// Server URL
const server = "https://comp426-1fa20.cs.unc.edu/submissions";
// const server = {
//     host: "localhost",
//     port: 1337,
//     path: '/submissions',
// };

// Max allowed zip file size
const maxDataSize = 10 * 1024 * 1024;

// Zip file name
const zipfile = "submission.zip";

// Environment variable file name
const envfile = ".env";

// Accepted assignments
const assignments = [
    "a00",
    "a01",
    "a02",
    "a03",
    "a04",
    "a05",
    "a06",
    "a07",
    "a08",
    "a09",
];

// Exclusion list for zip file
const exclusions = [
    '.gitkeep',
    'node_modules',
    'images',
    'icons',
];


// Cryptr instance
const cryptr = new Cryptr("hyNcEaR63qTk13TQmHkr");


// Determines which assignment to submit
const getAssignment = async () => {
    // Try to get the value from command line arguments
    if (process.argv.length > 2 && assignments.includes(process.argv[2])) {
        console.log(`You are about to submit assignment ${chalk.blue(process.argv[2])} for grading.`);
        return process.argv[2];
    }

    // Get the value by prompting the user
    return assignments[(await prompts({
        type: "select",
        name: "assignment",
        message: "Which assignment do you want to submit for grading?",
        choices: assignments,
    })).assignment];
};


// Asks the user if they want to save the login information
const promptRememberLogin = async (student) => {
    const shouldStoreCredentials = (await prompts({
        type: "select",
        name: "answer",
        message: "Do you want the system to remember your onyen and password?",
        choices: ["yes", "no"],
    })).answer === 0;

    if (shouldStoreCredentials) {
        try {
            const encryptedPassword = cryptr.encrypt(student.password);
            const contents = `ONYEN=${student.onyen}\nENCRYPTED_PASSWORD=${encryptedPassword}\n`;
            fs.writeFileSync(envfile, contents);
        } catch (error) {
            console.log(chalk.red("Something went wrong and your user credentials were not stored."));
            console.log(chalk.red(`Error message: ${error.message}`));
            console.log(chalk.red("The program will still try to submit your assignment."));
        }
    }
};


// Tries to retrieve student credentials from the environment variables
const getAuthFromEnv = async () => {
    const student = {
        onyen: process.env.ONYEN,
        password: process.env.ENCRYPTED_PASSWORD,
    };

    if (student.onyen === undefined || student.password === undefined) {
        throw new Error("No stored credentials could be found.");
    }

    student.password = cryptr.decrypt(student.password);

    const shouldUseAuthFromEnv = (await prompts({
        type: "select",
        name: "answer",
        message: `Do you want to submit the assignment as user ${student.onyen}?`,
        choices: ["yes", "no"],
    })).answer === 0;

    if (!shouldUseAuthFromEnv) {
        throw new Error("User elected not to use saved credentials");
    }

    return student;
};


// Retrieves student credentials
const getAuth = async () => {
    // Try to retrieve student credentials from environment variables
    try {
        const student = await getAuthFromEnv();
        student.source = "env";
        return student;
    } catch (error) {
        // Intentionally empty
    }

    // If no environment variables exist, then prompt the user
    console.log(chalk.yellow("\nThe system needs your COMP 426 username and password in order to submit"));
    console.log(chalk.yellow("your assignment. Please enter this information below."));
    const student = await prompts([{
        type: "text",
        name: "onyen",
        message: "What is your onyen?",
        validate: x => x.length === 0 ? "Your onyen can't be blank" : true,
    }, {
        type: "password",
        name: "password",
        message: "What is your COMP 426 account password?",
        validate: x => x.length < 8 ? "COMP 426 passwords must be at least 8 characters long" : true,
    }]);
    student.source = "cli";
    return student;
};


// Submits an assignment
const submitAssignment = async (assignment, student) => {
    if (assignment === undefined) {
        console.log(chalk.red("Something went wrong and your assignment was not submitted for grading."));
        console.log(chalk.red("The assignment number you specified is missing or invalid."));
        return false;
    } else if (student === undefined || student.onyen === undefined || student.password === undefined) {
        console.log(chalk.red("Something went wrong and your assignment was not submitted for grading."));
        console.log(chalk.red("The student login credentials are missing or invalid."));
        return false;
    }

    console.log(`\nSubmitting assignment ${chalk.blue(assignment)} for user ${chalk.blue(student.onyen)}...`);
    try {
        const files = fs
            .readdirSync(assignment)
            .filter(x => !exclusions.includes(x));
        await zip({
            source: files,
            destination: `../${zipfile}`,
            cwd: assignment,
        });
        // TODO: Check zip file size here and warn if it's too big
        console.log("Assignment code has been zipped. Now uploading, please wait...");
        const response = await sendFile({
            zippath: zipfile,
            onyen: student.onyen,
            password: student.password,
            assignment: assignment,
        });
        if (response.statusCode === 200) {
            console.log(chalk.green("Success! Visit comp426.com to see your grade."));
            return true;
        }
        console.log(chalk.red("Something went wrong and your assignment was not submitted for grading."));
        switch (response.statusCode) {
            case 400:
            case 404:
                console.log(chalk.red(`Assignment ${assignment} is currently not accepting submissions.`));
                break;
            case 401:
                console.log(chalk.red(`Incorrect username or password.`));
                break;
            case 413:
                console.log(chalk.red(`Your files are too large for the server! Make sure your folder size is under ~10 MB and then try again.`));
                break;
            case 429:
                console.log(chalk.red(response.body));
                break;
            case 500:
                console.log(chalk.red(`${response.statusCode} ${response.statusMessage}`));
                break;
            default:
                console.log(response.body);
                break;
        }
        return false;
    } catch (error) {
        console.log(chalk.red("Something went wrong and your assignment was not submitted for grading."));
        console.log(chalk.red("An unknown error occurred."));
        return false;
    } finally {
        fs.unlinkSync(zipfile);
    }
};


// Sends a file to the server
const sendFile = async ({ zippath, assignment, onyen, password }) => {
    return new Promise(function (resolve, reject) {
        const form = new FormData({ maxDataSize });
        form.append('assignment', assignment);
        form.append('onyen', onyen);
        form.append('password', password);
        form.append('zip', fs.createReadStream(zippath));
        form.submit(server, function (error, stream) {
            if (error) {
                reject(error);
            } else {
                let body = '';
                stream.on('data', chunk => { body += chunk; });
                stream.on('error', error => { reject(error); });
                stream.on('end', () => {
                    resolve({
                        body: body,
                        statusCode: stream.statusCode,
                        statusMessage: stream.statusMessage,
                    });
                });
            }
        });
    });
};


// Main program
const main = async () => {
    // Welcome message
    console.log("Welcome to the COMP 426 autograder submission tool.\n");

    // Determine which assignment to submit
    const assignment = await getAssignment();

    // Get student credentials
    const student = await getAuth();

    // Submit assignment
    const success = await submitAssignment(assignment, student);

    // Ask the user if they want to remember the login
    if (success && student.source === "cli") {
        await promptRememberLogin(student);
    }
};


// Run main program
main();
