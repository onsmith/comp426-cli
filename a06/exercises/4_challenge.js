import { heroData } from "./data";
import { getHeroByIdAsync } from "./3_async_await";
const { performance } = require('perf_hooks');


/*
 * In order to complete this section, you must have already finished the
 *   previous section (3_async_await.js).
 *
 * The function below uses your getHeroByIdAsync() function from section 3 to
 *   find two different heroes by id. However, when it is called, it takes 3
 *   seconds (1.5s + 1.5s) to return the final answer. This is not optimal,
 *   because looking up the two heroes can be done in parallel!
 *
 * Your job in getTwoHeroesSolution() is to parallelize this operation so that
 *   it completes in max(call1, call2) = 1.5 seconds.
 */
export async function getTwoHeroes(heroData, hero1Id, hero2Id) {
  let hero1 = await getHeroByIdAsync(heroData, hero1Id);
  let hero2 = await getHeroByIdAsync(heroData, hero2Id);
  return { hero1, hero2 };
}


/**
 * This function should do the same thing as the `getTwoHeroes` but return in
 *   half the time. Since there is no dependency between hero lookup operations,
 *   they can be parallelized.
 *
 * This function should return a single object with the following structure:
 *   {
 *     hero1: { ... hero data ... },
 *     hero2: { ... hero data ... }
 *   }
 *
 * @param heroData
 * @param hero1Id
 * @param hero2Id
 * @returns {Promise<object>}
 */
export async function getTwoHeroesSolution(heroData, hero1Id, hero2Id) {

}


// Uncomment this code to locally run your getTwoHeroesSolution() function
/*
async function run() {
  const t0 = performance.now();
  const result = await getTwoHeroes(heroData, 2, 3);
  const t1 = performance.now();

  console.log(`slow version finished in ${Math.round(t1 - t0)}ms`); // should be about 3000ms
  console.log(result);
}

run();

async function runSolution() {
  const t0 = performance.now();
  let result = await getTwoHeroesSolution(heroData, 2, 3);
  const t1 = performance.now();

  console.log(`fast version finished in ${Math.round(t1 - t0)}ms`); // should be about 1500ms
  console.log(result);
}

runSolution();
*/

