import {heroData} from "./data";
import {getHeroByIdAsync} from "./3_async_await";
const {performance} = require('perf_hooks');


export async function getTwoHeroes(heroData, hero1Id, hero2Id) {
    let hero1 = await getHeroByIdAsync(heroData, hero1Id);
    let hero2 = await getHeroByIdAsync(heroData, hero2Id);
    return {hero1, hero2}
}

/**
 * This should do the same thing as the `getTwoHeroes` but return in half the time (there is no
 * dependency between them so this is expected behavior).
 * @param heroData
 * @param hero1Id
 * @param hero2Id
 * @returns {Promise<{hero2: *, hero1: *}>}
 */
export async function getTwoHeroesSolution(heroData, hero1Id, hero2Id) {

}


/*
Below is code to help you solve this problem.

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
