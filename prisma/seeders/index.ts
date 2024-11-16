import seedNutrients from './nutrient'
import seedFndds from './fndds'
// import seedFdcFood from './food'
async function seed() {
    await seedNutrients()
    await seedFndds()
    // await seedFdcFood()
}

seed()
