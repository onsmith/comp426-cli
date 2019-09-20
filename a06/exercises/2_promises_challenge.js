import {heroData} from "./data";
import {getHeroByIdPromise} from "./2_promises";

const {performance} = require('perf_hooks');


/*
In order to complete this you must have finished the promises section before it.

The function below will be used for reference. When it is called, it
takes 3 (1.5 + 1.5) seconds to return the final answer.

Your job is to fill in getTwoHeroesSolution so that it can finish in
max(call1, call2) = 1.5 seconds.
 */


export function getTwoHeroes(heroData, hero1Id, hero2Id) {
  return new Promise((resolve => {
    getHeroByIdPromise(heroData, hero1Id).then(hero1 => {
      getHeroByIdPromise(heroData, hero2Id).then(hero2 => {
        resolve({hero1, hero2});
      })
    })
  }))
}

/**
 * This should do the same thing as the `getTwoHeroes` but return in half the time (there is no
 * dependency between the two heroes so this is expected behavior).
 *
 * This should return a single object with the following structure:
 *
 * {
 *   hero1: the data,
 *   hero2: the data
 * }
 *
 * @param heroData
 * @param hero1Id
 * @param hero2Id
 * @returns {Promise<object>}
 */
export function getTwoHeroesSolution(heroData, hero1Id, hero2Id) {

}

/*
Below is code to help you solve this problem.

let t0 = performance.now();

getTwoHeroes(heroData, 2, 3).then(heroes => {
    const t1 = performance.now();

    console.log(`slow version finished in ${Math.round(t1 - t0)}ms`); // should be about 3000ms
    console.log(heroes);
});

getTwoHeroesSolution(heroData, 2, 3).then(heroes => {
    const t1 = performance.now();

    console.log(`fast version finished in ${Math.round(t1 - t0)}ms`); // should be about 1500ms
    console.log(heroes);
});

*/
