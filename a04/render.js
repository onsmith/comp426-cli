/**
 * Course: COMP 426
 * Assignment: a04
 * Author: <type your name here>
 *
 * This script uses jQuery to build an HTML page with content taken from the
 * data defined in data.js.
 */



/**
 * Given a list of hero objects, this function generates a <table> with
 *     a header row followed by a row for each hero
 * @param heroes  An array of hero objects (see data.js)
 */
const renderHeroTable = function(heroes) {
    // TODO: Implement this function

    // TODO: Should return html elements including a <table> html element
};



/**
 * Given a hero object, this function generates a "card" showing the hero's
 *     name, information, and colors.
 * @param heroes  An array of hero objects (see data.js)
 */
const renderHeroCard = function(heroes) {
    // TODO: Implement this function

    // TODO: Should return html elements representing the hero's card
};



/**
 * Given a message object, this function generates a <form> which allows the
 *     user to edit the fields of the animal. The form inputs should be
 *     pre-populated with the initial values of the animal.
 * @param  message  A single message object (see data.js)
 * @param  heroes  A list of all hero objects (see data.js)
 */
const renderAnimalEditForm = function(message, heroes) {
    // TODO: Implement this function

    // TODO: Should return html elements including a <form> element
};



/**
 * Given a message object, this function generates a <form> which allows the
 *     user to edit the fields of the animal. The form inputs should be
 *     pre-populated with the initial values of the animal.
 * @param  message  A single message object (see data.js)
 * @param  heroes  A list of all hero objects (see data.js)
 */
const renderAnimalEditForm = function(message, heroes) {
    // TODO: Implement this function

    // TODO: Should return html elements including a <form> element
};



/**
 * This function gets executed after the HTML finishes loading
 */
$(function() {
    // Grab a jQuery reference to the root HTML element
    const $root = $('#root');

    // Render the hero table
    // TODO: Call renderHeroTable() and add the result to $root

    // Pick an animal from the list at random
    const randomAnimal = animalData[Math.floor(Math.random() * animalData.length)];

    // Render the edit animal form for randomAnimal
    // TODO: Call renderAnimalEditForm() and add the result to $root
});
