import { heroData } from "./data";


/**
 * Again, this function does the same thing as getHeroByIdCallback() and
 *   getHeroByIdPromise(). However, this time it supports async/await.
 *
 * Hint: Any function that returns a Promise object already has built-in support
 *   for async/await. You already wrote a function that returns a Promise
 *   object, which means you can just copy that code in here! You don't have to
 *   write any new code for this function.
 *
 * @param {Array} heroData  The array of hero data to search. For us, this will
 *                          simply be the imported `heroData` from above.
 * @param {Number} id  The id of the hero to find
 * @returns {Promise<object>}  A new Promise object that either resolves after
 *                             1.5 seconds with the correct hero or rejects
 *                             after 1.5 seconds if no hero could be found
 */
export function getHeroByIdAsync(heroData, id) {
  // Copy-and-paste code here
}


// Uncomment this code to locally run your getHeroByIdCallback() function
/*
async function run() {
  const hero2 = await getHeroByIdAsync(heroData, 2);
  console.log(`Because we are awaiting, this will run after the hero2 promise finishes: ${JSON.stringify(hero2, null, 2)}`);

  try {
    const heroError = await getHeroByIdAsync(heroData, 20);
  } catch (error) {
    console.log(error);
  }
}
run();
*/







