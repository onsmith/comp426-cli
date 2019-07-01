/**
 * This script submits COMP 426 assignment code to the server
 */


// Dependencies
const prompts = require("prompts");
const chalk   = require("chalk");
const zip     = require("bestzip");
const fs      = require("fs");


// Server URL
const host = "https://comp426.com";

// Zip file name
const zipfile = "submission.zip";

// Accepted assignments
const assignments = [
    "a0",
    "a1",
    "a2",
    "a3",
    "a4",
    "a5",
    "a6",
    "a7",
    "a8",
    "a9",
    "a10",
];


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
}


// Retrieves student credentials
const getAuthentication = async () => {
    // Try to get the value from environment variables
    // TODO

    // Get the value by prompting the user
    return await prompts([{
        type: "text",
        name: "onyen",
        message: "What is your onyen?",
        format: x => x.trim().toLowerCase(),
        validate: x => x.length === 0 ? "Your onyen can't be blank" : true,
    }, {
        type: "password",
        name: "password",
        message: "What is your COMP 426 account password?",
        format: x => x.trim().toLowerCase(),
        validate: x => x.length < 8 ? "COMP 426 passwords must be at least 8 characters long" : true,
    }]);
}


// Submits an assignment
const submitAssignment = async (assignment, student) => {
    console.log(`\nSubmitting assignment ${chalk.blue(assignment)} for user ${chalk.blue(student.onyen)}...`);
    try {
        await zip({
            source: "*",
            destination: `../${zipfile}`,
            cwd: assignment,
        });
        await sendFile(zipfile, host);
        console.log(chalk.green("Success! Visit comp426.com to see your grade."));
    } catch (error) {
        console.log(chalk.red("Something went wrong and your assignment was not submitted for grading."));
        console.log(chalk.red(`Error message: ${error.message}`));
    } finally {
        fs.unlinkSync(zipfile);
    }
}


// Sends a file to the server
const sendFile = async (filepath, url) => {
    // TODO
}


// Main program
const main = async () => {
    // Welcome message
    console.log("Welcome to the COMP 426 autograder submission tool.\n");

    // Determine which assignment to submit
    const assignment = await getAssignment();

    // Get student credentials
    const student = await getAuthentication();

    // Submit assignment
    await submitAssignment(assignment, student);
};


// Run main program
main();