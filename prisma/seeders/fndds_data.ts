import Excel from 'exceljs'
import { DatabaseService } from './db_connection'
import { FoodOptionalDefaults, FoodNutritionOptionalDefaults } from '../zod/modelSchema'
import fs from 'fs'
import { z } from 'zod'
import { Transaction } from 'kysely'
import { DB } from '@prism/keysley/types'

const zNumNull = z
    .number()
    .optional()
    .transform((v) => (v === undefined ? null : v * 1000))

const schema = z.tuple([
    z.undefined(),
    z.number(),
    z.string(),
    z.number(),
    z.string(),
    z.number().transform((v) => v * 1000),
    zNumNull,
    zNumNull,
    zNumNull,
    zNumNull,
    zNumNull,
    zNumNull,
    zNumNull,
    zNumNull,
    zNumNull,
    zNumNull,
    zNumNull,
    zNumNull,
    zNumNull,
    zNumNull,
    zNumNull,
    zNumNull,
    zNumNull,
    zNumNull,
    zNumNull,
    zNumNull,
    zNumNull,
    zNumNull,
    zNumNull,
    zNumNull,
    zNumNull,
    zNumNull,
    zNumNull,
    zNumNull,
    zNumNull,
    zNumNull,
    zNumNull,
    zNumNull,
    zNumNull,
    zNumNull,
    zNumNull,
    zNumNull,
    zNumNull,
    zNumNull,
    zNumNull,
    zNumNull,
    zNumNull,
    zNumNull,
    zNumNull,
    zNumNull,
    zNumNull,
    zNumNull,
    zNumNull,
    zNumNull,
    zNumNull,
    zNumNull,
    zNumNull,
    zNumNull,
    zNumNull,
    zNumNull,
    zNumNull,
    zNumNull,
    zNumNull,
    zNumNull,
    zNumNull,
    zNumNull,
    zNumNull,
    zNumNull,
    zNumNull,
    zNumNull,
])

export default async function seedFoodNutrients() {
    console.log('-------- seeding food nutrition in database --------')

    const filePath = './prisma/data/FNDDS-Nutrient-Values-2021-2023.xlsx'
    if (!fs.existsSync(filePath)) throw new Error(`file: ${filePath} does not exist`)

    const client = new DatabaseService()
    const dbClient = await client.db()
    const errorRows: number[] = []

    const workbookReader = new Excel.stream.xlsx.WorkbookReader(filePath, {})
    for await (const worksheetReader of workbookReader) {
        let rowNumber = 0
        let rowsInBatch = 0
        let food: FoodOptionalDefaults[] = []
        let foodNutrition: Omit<FoodNutritionOptionalDefaults, 'food_id'>[] = []

        for await (const row of worksheetReader) {
            //first two rows are header rows
            if (rowNumber >= 2 && Array.isArray(row.values)) {
                const { success, data } = schema.safeParse(row.values)

                if (!success) {
                    errorRows.push(rowNumber)
                    continue
                }
                rowsInBatch++

                food.push({ description: data[2] })
                foodNutrition.push({
                    energy: data[5],
                    protein: data[6],
                    carbohydrate: data[7],
                    sugars_total: data[8],
                    fiber_total_dietary: data[9],
                    total_fat: data[10],
                    fatty_acids_total_saturated: data[11],
                    fatty_acids_total_monounsaturated: data[12],
                    fatty_acids_total_polyunsaturated: data[13],
                    cholesterol: data[14],
                    retinol: data[15],
                    vitamin_A_RAE: data[16],
                    carotene_alpha: data[17],
                    carotene_beta: data[18],
                    cryptoxanthin_beta: data[19],
                    lycopene: data[20],
                    lutein_zeaxanthin: data[21],
                    thiamin: data[22],
                    riboflavin: data[23],
                    niacin: data[24],
                    vitamin_B_6: data[25],
                    folic_acid: data[26],
                    folate_food: data[27],
                    folate_DFE: data[28],
                    folate_total: data[29],
                    choline_total: data[30],
                    vitamin_B_12: data[31],
                    vitamin_B_12added: data[32],
                    vitamin_C: data[33],
                    vitamin_D_D2_D3: data[34],
                    vitamin_E_alpha_tocopherol: data[35],
                    vitamin_Eadded: data[36],
                    vitamin_K_phylloquinone: data[37],
                    calcium: data[38],
                    phosphorus: data[39],
                    magnesium: data[40],
                    iron: data[41],
                    zinc: data[42],
                    copper: data[43],
                    selenium: data[44],
                    potassium: data[45],
                    sodium: data[46],
                    caffeine: data[47],
                    theobromine: data[48],
                    alcohol: data[49],
                    fa_4_0: data[50],
                    fa_6_0: data[51],
                    fa_8_0: data[52],
                    fa_10_0: data[53],
                    fa_12_0: data[54],
                    fa_14_0: data[55],
                    fa_16_0: data[56],
                    fa_18_0: data[57],
                    fa_16_1: data[58],
                    fa_18_1: data[59],
                    fa_20_1: data[60],
                    fa_22_1: data[61],
                    fa_18_2: data[62],
                    fa_18_3: data[63],
                    fa_18_4: data[64],
                    fa_20_4: data[65],
                    fa_20_5_n_3: data[66],
                    fa_22_5_n_3: data[67],
                    fa_22_6_n_3: data[68],
                    water: data[69],
                })
            }

            if (rowsInBatch === 500) {
                await dbClient
                    .transaction()
                    .execute(async (trx) => await insertToDb(trx, food, foodNutrition))

                rowsInBatch = 0
                food = []
                foodNutrition = []
            }

            rowNumber++
        }

        if (rowsInBatch) {
            await dbClient
                .transaction()
                .execute(async (trx) => await insertToDb(trx, food, foodNutrition))
        }
    }

    await client.closeConnection()
    console.error('Rows with errors:- \n', errorRows)
}

const insertToDb = async (
    trx: Transaction<DB>,
    food: FoodOptionalDefaults[],
    foodNutrition: Omit<FoodNutritionOptionalDefaults, 'food_id'>[],
) => {
    console.log('--------inserting data--------------')
    const result = await trx.insertInto('Food').values(food).executeTakeFirstOrThrow()

    const firstId = Number(result.insertId)
    const affectedRows = result.numInsertedOrUpdatedRows
        ? Number(result.numInsertedOrUpdatedRows)
        : 0

    if (!firstId || !affectedRows) throw new Error('no insertions')

    let id = firstId
    const FoodNutrition: FoodNutritionOptionalDefaults[] = foodNutrition.map((item) => {
        if (id > firstId + affectedRows - 1) throw new Error('id overflow')
        return { ...item, food_id: id++ }
    })

    await trx.insertInto('FoodNutrition').values(FoodNutrition).executeTakeFirstOrThrow()
    console.log('--------insertion done--------------')
}
