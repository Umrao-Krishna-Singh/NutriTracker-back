// import fndds from './fndds_data'
import seedFdcFood from './food'
async function seed() {
    await seedFdcFood()
    // await fndds()
}

seed()
