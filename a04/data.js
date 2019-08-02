/**
 * Course: COMP 426
 * Assignment: a04
 *
 * This file defines data to be rendered to the page.
 */


/**
 * Represents a list of heroic users
 */
const heroData = [{
    id: 1,
    first: "Tony",
    last: "Stark",
    hero: "Iron Man",
    link: "icons/tonystark.png",
    background: "#f39c11",
}, {
    id: 2,
    first: "Scott",
    last: "Lang",
    hero: "Ant-Man",
    link: "icons/antman.png",
    background: "#f1c40d",
}, {
    id: 3,
    first: "Natasha",
    last: "Romanova",
    hero: "Black Widow",
    link: "icons/blackwidow.png",
    background: "#323232",
}, {
    id: 4,
    first: "Steve",
    last: "Rogers",
    hero: "Captain America",
    link: "icons/captainamerica.png",
    background: "#c1382b",
}, {
    id: 5,
    first: "Bruce",
    last: "Banner",
    hero: "The Hulk",
    link: "icons/hulk.png",
    background: "#55a148",
}, {
    id: 6,
    first: "Thor",
    last: "Odinson",
    hero: "Thor",
    link: "icons/thor.png",
    background: "#505050",
}, {
    id: 7,
    first: "Nick",
    last: "Fury",
    hero: "Nick Fury",
    link: "icons/nickfury.png",
    background: "#e67e22",
}, {
    id: 8,
    first: "Clint",
    last: "Barton",
    hero: "Hawkeye",
    link: "icons/hawkeye.png",
    background: "#8d43ac",
}];


/**
 * Represents a list of heroic messages
 */
const messageData = [{
    id: 1,
    author: 5,
    text: "HULK SMASH!",
    postedAt: new Date(2019, 3, 5),
}, {
    id: 2,
    author: 7,
    text: "I don't think I'd do that if I were you.",
    postedAt: new Date(2019, 6, 12),
}, {
    id: 2,
    author: 6,
    text: "My hammer is big.",
    postedAt: new Date(2019, 4, 12),
}, {
    id: 2,
    author: 4,
    text: "Come on guys, let's work together as a team!",
    postedAt: new Date(2019, 8, 31),
}, {
    id: 1,
    author: 4,
    text: "I work alone.",
    postedAt: new Date(2019, 9, 1),
}];
