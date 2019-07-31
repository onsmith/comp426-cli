/**
 * Course: COMP 426
 * Assignment: a04
 * Author: <type your name here>
 *
 * This script uses jQuery to render the data stored in the global variable
 *     "animalData" as HTML and insert it into the DOM
 */



/**
 * Given a list of animal objects, this function generates a <table> with
 *     a header row followed by a row for each animal
 * @param animals  An array of animal objects (see data.js)
 */
const renderAnimalTable = function(animals) {
    // TODO: Implement this function

    // TODO: Should return a html elements including a <table> html element
};



/**
 * Given an animal object, this function generates a <form> which allows the
 *     user to edit the fields of the animal. The form inputs should be
 *     pre-populated with the initial values of the animal.
 * @param  animal  A single animal object (see data.js)
 */
const renderAnimalEditForm = function(animal) {
    // TODO: Implement this function

    // TODO: Should return html elements including a <form> element
};



/**
 * This function gets executed after the HTML finishes loading
 */
$(function() {
    // Grab a jQuery reference to the root HTML element
    const $root = $('#root');

    // Render the animal table
    // TODO: Call renderAnimalTable() and add the result to $root

    // Pick an animal from the list at random
    const randomAnimal = animalData[Math.floor(Math.random() * animalData.length)];

    // Render the edit animal form for randomAnimal
    // TODO: Call renderAnimalEditForm() and add the result to $root
});
