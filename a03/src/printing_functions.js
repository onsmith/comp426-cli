/**
 * # titleGenerator
 *
 * Takes in a message and an optional parameter for how many decorators to use.
 * If no decorator number is supplied, the default value will be 4.
 *
 * @param {string} title - String that will be displayed in the title.
 * @param {number} [decorationLength = 4] - Number of decorator symbols to prepend and append.
 *
 * @returns {string} String formatted as `~~~~TITLE~~~~` where the number of tildes to
 * the left and right are determined by `decorationLength`.
 */
export function titleGenerator(title, decorationLength) {

}

/**
 * # footerGenerator
 *
 * Generates the footer to the title. It prints `~` equal to the length of the title,
 * then wraps inside more `~` to equal out the length.
 *
 * @param {string} title - String that will be used to calculate the number of decorators to use.
 * @param {number} decorationLength - Number of extra decorator symbols to prepend and append.
 *
 * @returns {string} String formatted as `~~~~~~~~~~~~` where the number of tildes to
 * the left and right are determined by `decorationLength` and the number in the middle is determined
 * by the length of the `title`.
 */
export function footerGenerator(title, decorationLength) {

}

/**
 * # getPrettyString
 *
 * Combines the functionality of `titleGenerator` and `footerGenerator` to generate
 * a nicely formatted string.
 *
 * @param {string} title - String that will be passed to `titleGenerator`.
 * @param {string} body - String that will be inserted between the title and footer.
 * @param {number} decorationLength - Number passed to title and footer for decoration.
 * @returns {string} string formatted with
 * `~~~~TITLE~~~~`
 * `BODY CONTENT...`
 * `BODY CONTENT...`
 * `~~~~~~~~~~~~~`
 * ```
 */
export function getPrettyString(title, body, decorationLength) {

}

/*
This should print
~~~~~~~~Title~~~~~~~~
This is some body content.
It is multiple lines
~~~~~~~~~~~~~~~~~~~~~
 */
const prettyString = getPrettyString('Title',
    'This is some body content. \nIt is multiple lines.',
    8);

console.log(prettyString);
