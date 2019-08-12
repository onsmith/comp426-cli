import {heroData} from "./data";


/**
 * Does the same thing as parts 1 and 2.
 *
 * Hint: async await is just user-friendly syntax for promises, so behind the scenes
 * nothing changes.
 *
 * @param heroData
 * @param id
 * @returns {Promise<object>}
 */
export function getHeroByIdAsync(heroData, id) {

}



/*
Below is code to help you get the right solution.

async function run() {
    const hero2 = await getHeroByIdAsync(heroData, 2);
    console.log(`Because we are async/awaiting this will run after hero2 is done ${JSON.stringify(hero2, null, 2)}`);

    try{
        const heroError = await getHeroByIdAsync(heroData, 20);
    }catch (error) {
        console.log(error);
    }
}
run();

 */







