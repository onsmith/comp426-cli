/**
 * Course: COMP 426
 * Assignment: a08
 * Author: <type your name here>
 *
 * This script uses axios to make simple HTTP requests to the COMP 426 server
 */



/**
 * This function should use axios to make a GET request to the following url:
 *   https://comp426fa19.cs.unc.edu/a08/heroes
 *
 * The axios request should be "await"ed, and once the response is available,
 *   the body of the HTTP response (which is in JSON format) should be returned
 *   as a JavaScript Object.
 *
 * @returns  {Object}  The body of the HTTP response.
 */
export async function fn1() {

};


/**
 * Like fn1(), this function should use axios to make a GET request to the
 *   following url: https://comp426fa19.cs.unc.edu/a08/heroes
 *
 * However, this function should pass the following GET parameter to the server:
 *   { sort: 'first ASC' }
 *
 * This parameter tells the server to sort the resulting heroes by the "first"
 *   field in ascending order.
 *
 * The axios request should be "await"ed, and once the response is available,
 *   the HTTP status code of the response should be returned as a number.
 *
 * @returns  {Number}  The HTTP status code of the response.
 */
export async function fn2() {

};


/**
 * This function should use axios to make a POST request to the following url:
 *   https://comp426fa19.cs.unc.edu/a08/users
 *
 * The POST HTTP verb is conventionally used when instructing the server to
 *   create a new record in the database. The new record's data is traditionally
 *   passed to the server through POST parameters. Here, your task is to create
 *   a new "user" that represents you. The new record should have three
 *   non-empty fields: "first", "last", and "onyen".
 *
 * Example POST parameters:
 *   {
 *      first: 'Ketan',
 *      last:  'Mayer-Patel',
 *      onyen: 'kmp',
 *   }
 *
 * Note: Making a POST request to this URL does not actually create a new record
 *   in the server database (it's just pretend), so don't worry about breaking
 *   things or making an account that conflicts with yours.
 *
 * The axios request should be "await"ed, and once the response is available,
 *   the entire response object should be returned.
 *
 * @returns  {Object}  The complete axios response object
 */
export async function fn3() {
  
};


/**
 * Sometimes, the server isn't able to fulfill a request. In this case, it may
 *   respond with a 4XX or 5XX HTTP error code. The request made in fn3() will
 *   be rejected by the server if "first", "last", or "onyen" are missing or
 *   blank. This function should demonstrate that behavior by making another
 *   "create user" request to the server that omits one or more of these
 *   parameters. However, your function should catch the error in a try/catch
 *   block.
 *
 * The axios request should be "await"ed, and once the response is available,
 *   the entire response object should be returned. If the request fails (which
 *   it should), return the entire error object instead.
 *
 * @returns  {Object}  The complete axios response object if the request
 *                     succeeds, or the complete axios error object if the
 *                     request fails
 */
export async function fn4() {
  
};


/**
 * This function should use axios to make a PUT request to the following url:
 *   https://comp426fa19.cs.unc.edu/a08/headers
 *
 * No parameters should be sent with the request, but instead a special HTTP
 *   request header should be added to your request named
 *   "my-custom-request-header" with value "Hello, World!".
 *
 * The axios request should be "await"ed, and once the response is available,
 *   the entire response object should be returned.
 *
 * @returns  {Object}  The complete axios response object
 */
export async function fn5() {
  
};


/**
 * This function should use axios to make a GET request to the following url:
 *   https://comp426fa19.cs.unc.edu/a08/headers
 *
 * No parameters should be sent with the request.
 *
 * Instead, the server will respond with a special HTTP response header named
 *   "my-custom-response-header".
 *
 * The axios request should be "await"ed, and once the response is available,
 *   the value of the HTTP response header named "my-custom-response-header"
 *   should be returned by the function.
 *
 * @returns  {String}  The value of the HTTP response header named
 *   "my-custom-response-header"
 */
export async function fn6() {
  
};
