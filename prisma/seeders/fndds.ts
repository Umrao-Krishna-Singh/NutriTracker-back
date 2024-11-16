import Excel from 'exceljs'
import { DatabaseService } from './db_connection'
import { FoodOptionalDefaults, FoodNutrientOptionalDefaults } from '../zod/modelSchema'
import fs from 'fs'
import { z } from 'zod'
import { Transaction } from 'kysely'
import { DB } from '@prism/keysley/types'

/**
 *
 * This file assumes that nutrient data has already been seeded - if not, do that first!
 *
 * Hard coding the fdc_nutrient_id for the headers in fndds data:
 * Not fetching this directly from database because there are multiple matches for some of the headers,
 * and I have taken chosen one that looks close enough, which would be hard to code.
 *
 *
 * Energy - 2047
 * Protein - 1003
 * Carbohydrates - 2039
 * Sugars total - 1063
 * Fiber total - 1079
 * total fat - 1085
 * saturated fat - 1326
 * total monosat fat - 1327
 * total unsat fat - 1328
 * cholesterol - 1253
 * retinol - 1105
 * vitamin a - 1106
 * carotene alpha (mcg) - 1108
 * carotene beta (mcg) - 1107
 * Cryptoxanthin, beta (mcg) - 1120
 * lycopene - 1122
 * Lutein + zeaxanthin - 1123
 * Thiamin - 1165
 * Riboflavin - 1166
 * Niacin - 1167
 * Vitamin B-6 - 1175
 * Folic acid - 1186
 * Folate, food  - 1187
 * Folate, DFE - 1190
 * Folate, total - 1177
 * Choline, total - 1180
 * Vitamin B-12 (mcg) - 1178
 * Vitamin B-12, added (mcg) - 1246
 * Vitamin C - 1162
 * Vitamin D (D2 + D3) (mcg)- 1114
 * Vitamin E (alpha-tocopherol) - 1109
 * Vitamin E added - 1242
 * Vitamin K (phylloquinone) - 1185
 * Calcium (Ca) - 1087
 * Phosphorus - 1091
 * Magnesium - 1090
 * Iron - 1089
 * Zn - 1095
 * Cu - 1098
 * Selenium - 1103
 * Potassium - 1092
 * Sodium - 1093
 * Caffeine - 1057
 * Theobromine - 1058
 * Alcohol - 1018
 * SFA 4:0 - 1259
 * SFA 6:0 - 1260
 * SFA 8:0 - 1261
 * SFA 10:0 - 1262
 * SFA 12:0 - 1263
 * SFA 14:0 - 1264
 * SFA 16:0 - 1265
 * SFA 18:0 - 1266
 * MUFA 16:1 - 1275
 * MUFA 18:1 - 1268
 * MUFA 20:1 - 1267
 * MUFA 22:1 - 1279
 * PUFA 18:2 - 1269
 * PUFA 18:3 - 1270
 * PUFA 18:4 - 1276
 * PUFA 20:4 - 1271
 * PUFA 20:5 n-3 - 1278
 * PUFA 22:5 n-3 - 1280
 * PUFA 22:6 n-3 - 1272
 * Water - 1051
 */
const fdcNutrientIdMap = [
    2047, 1003, 2039, 1063, 1079, 1085, 1326, 1327, 1328, 1253, 1105, 1106, 1108, 1107,
    1120, 1122, 1123, 1165, 1166, 1167, 1175, 1186, 1187, 1190, 1177, 1180, 1178, 1246,
    1162, 1114, 1109, 1242, 1185, 1087, 1091, 1090, 1089, 1095, 1098, 1103, 1092, 1093,
    1057, 1058, 1018, 1259, 1260, 1261, 1262, 1263, 1264, 1265, 1266, 1275, 1268, 1267,
    1279, 1269, 1270, 1276, 1271, 1278, 1280, 1272, 1051,
] as const

const client = new DatabaseService()
const errorRows: number[] = []
const filePath = './prisma/data/zipped/FNDDS-Nutrient-Values-2021-2023.xlsx'
const workbookReader = new Excel.stream.xlsx.WorkbookReader(filePath, {})
const nutrientIdMap: number[] = [] // this will contain the id in the database in same order as fdcNutrientIdMap
let nutrientsArr: Omit<FoodNutrientOptionalDefaults, 'food_id'>[][] = []
const zNumNull = z
    .number()
    .optional()
    .transform((v) => (v === undefined ? null : Math.round(v * 1000)))

const repeatNumNull = new Array(64).fill(zNumNull)

//schema for each row from fndds excel file
const schema = z.tuple([
    z.undefined(),
    z.number(),
    z.string().transform((v) => v.trim().toLowerCase()),
    z.number(),
    z.string(),
    z.number().transform((v) => v * 1000),
    ...repeatNumNull,
])

if (!fs.existsSync(filePath)) throw new Error(`${filePath} not found: unzip data first`)

export default async function seedFoodNutrients() {
    console.log('-------- seeding food nutrition in database --------')
    const dbClient = await client.db()

    const nutrients = await dbClient
        .selectFrom('Nutrient')
        .select(['id', 'fdc_nutrient_id'])
        .where('fdc_nutrient_id', 'in', fdcNutrientIdMap)
        .execute()

    //fill data in the nutrientIdMap array
    fdcNutrientIdMap.map((item) => {
        const nutriInfo = nutrients.find((val) => val.fdc_nutrient_id === item)
        if (!nutriInfo) throw new Error(`Some fdc_nutrient_id ${item} not found`)
        nutrientIdMap.push(nutriInfo.id)
    })

    let sheetCount = 0
    for await (const worksheetReader of workbookReader) {
        let rowNumber = 0
        let rowsInBatch = 0
        let food: FoodOptionalDefaults[] = []

        //only first sheet is required to be seeded
        if (sheetCount) continue
        sheetCount++

        for await (const row of worksheetReader) {
            //first two rows are header rows
            if (rowNumber >= 2 && Array.isArray(row.values)) {
                const { success, data } = schema.safeParse(row.values)

                if (!success) {
                    errorRows.push(rowNumber)
                    rowNumber++
                    continue
                }

                rowsInBatch++

                food.push({ description: data[2], fdc_id: null })
                const nutriArr: Omit<FoodNutrientOptionalDefaults, 'food_id'>[] = []

                for (let i = 5; i < data.length; i++) {
                    const nutrient_val = data[i]

                    if (!nutrient_val) continue

                    nutriArr.push({
                        nutrient_id: nutrientIdMap[i - 5],
                        quantity: +nutrient_val, //plus sign because typescript doesn't know nutrient_val will always be number for index 5 and higher
                    })
                }
                nutrientsArr.push(nutriArr)
            }

            if (rowsInBatch === 500) {
                await dbClient
                    .transaction()
                    .execute(async (trx) => await insertToDb(trx, food, nutrientsArr))
                rowsInBatch = 0
                food = []
                nutrientsArr = []
            }

            rowNumber++
        }

        if (rowsInBatch)
            await dbClient
                .transaction()
                .execute(async (trx) => await insertToDb(trx, food, nutrientsArr))
    }

    await client.closeConnection()
    if (errorRows.length) console.error('Rows with errors:- \n', errorRows)
}

const insertToDb = async (
    trx: Transaction<DB>,
    food: FoodOptionalDefaults[],
    nutrientsArr: Omit<FoodNutrientOptionalDefaults, 'food_id'>[][],
) => {
    console.log('--------inserting data--------------')
    const result = await trx.insertInto('Food').values(food).executeTakeFirstOrThrow()

    const firstId = Number(result.insertId)
    const affectedRows = result.numInsertedOrUpdatedRows
        ? Number(result.numInsertedOrUpdatedRows)
        : 0

    if (!firstId || !affectedRows) throw new Error('no insertions')

    let id = firstId
    const FoodNutrients: FoodNutrientOptionalDefaults[] = []

    nutrientsArr.map((fNutrients) => {
        if (id > firstId + affectedRows - 1) throw new Error('id overflow')

        for (let i = 0; i < fNutrients.length; i++) {
            FoodNutrients.push({ ...fNutrients[i], food_id: id })
        }

        id++
    })

    await trx.insertInto('FoodNutrient').values(FoodNutrients).executeTakeFirstOrThrow()
    console.log('--------insertion done--------------')
}
