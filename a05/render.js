/**
 * Course: COMP 426
 * Assignment: a05
 * Author: <type your name here>
 *
 * This script uses jQuery to build an HTML page with content taken from the
 * data defined in data.js.
 */



/**
 * Given a hero object (see data.js), this function generates a "card" showing
 *     the hero's name, information, and colors.
 * @param hero  A hero object (see data.js)
 */
export const renderHeroCard = function(hero) {
    // TODO: Copy your code from a04 to render the hero card
};



/**
 * Given a hero object, this function generates a <form> which allows the
 *     user to edit the fields of the hero. The form inputs should be
 *     pre-populated with the initial values of the hero.
 * @param  hero  The hero object to edit (see data.js)
 */
export const renderHeroEditForm = function(hero) {
    // TODO: Copy your code from a04 to render the hero edit form
};



/**
 * This function gets executed after the HTML finishes loading
 */
$(function() {
    // Grab a jQuery reference to the root HTML element
    const $root = $('#root');

    // TODO: Generate the heroes using renderHeroCard()
    // NOTE: Copy your code from a04 for this part

    // TODO: Append the hero cards to the $root element
    // NOTE: Copy your code from a04 for this part

    // TODO: Use jQuery to add a click handler for the edit button

    // TODO: Use jQuery to add a click handler for the save button

    // TODO: Use jQuery to add a click handler for the cancel button
});
