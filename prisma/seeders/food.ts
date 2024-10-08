import { DatabaseService } from './db_connection'
import { FoodOptionalDefaults } from '../zod/modelSchema'
import fs from 'fs'
import { z } from 'zod'
import { Transaction } from 'kysely'
import { DB } from '@prism/keysley/types'
// import { join } from 'path'

const schema = z.object({
    fdc_id: z.coerce.number().int(),
    data_type: z.string(),
    description: z.string(),
    food_category_id: z.string(),
    publication_date: z.string(),
})

type fdc_food =
    | 'fdc_id'
    | 'data_type'
    | 'description'
    | 'food_category_id'
    | 'publication_date'

let results: FoodOptionalDefaults[] = []
const descSet: Set<string> = new Set()
const fdcIdSet: Set<number> = new Set()
const client = new DatabaseService()
const errors: Record<string, any>[] = []
const dupFoodItems: Record<string, number[]> = {}
const dupFdcIds: Record<string, number[]> = {}
const dupRow: number[] = []
let chunkCount = 0
let lastRow: string | undefined
let lastChunkLength: number | undefined
let isLastRowComplete = true
const filePath = './prisma/data/zipped/food.csv'

export default async function seedFdcFood() {
    if (!fs.existsSync(filePath)) throw new Error(`file: ${filePath} does not exist`)
    console.log('-------- seeding food.csv in database --------')
    const dbClient = await client.db()

    for await (const chunk of fs.createReadStream(filePath) as AsyncIterable<Buffer>) {
        chunkCount++
        const chunkData: string[] = chunk.toString().split('\n')
        const firstRow: string = chunkData[0]

        if (chunkCount > 1 && lastChunkLength) {
            if (!isLastRowComplete && lastRow)
                parseData(lastRow + firstRow, lastChunkLength)
            else if (isLastRowComplete) parseData(firstRow, lastChunkLength)
        }

        lastRow = chunkData[chunkData.length - 1]
        if (lastRow.split(',').length !== 5) isLastRowComplete = false
        lastChunkLength = chunkData.length - 1

        for (let i = 1; i < chunkData.length - 1; i++) {
            parseData(chunkData[i], chunkCount + i)
        }

        await dbClient
            .transaction()
            .execute(async (trx) => await insertToDb(trx, results))

        results = []
        throw new Error('stop')
    }

    /**
     * write all duplicate and error values into different files
     */

    console.log('Finished reading the file.')
}

const parseData = (row: string, rowNumber: number) => {
    const values = row.split(',')
    const fdc_id = Number(values[0].slice(1, -2))
    const description = values[2].slice(1, -2).trim().toLowerCase()
    results.push({ fdc_id, description })

    // if (!descSet.has(description) && !fdcIdSet.has(fdc_id)) {
    //     descSet.add(description)
    //     fdcIdSet.add(fdc_id)
    //     results.push({ fdc_id, description })
    // } else if (descSet.has(description) && fdcIdSet.has(fdc_id)) {
    //     dupRow.push(rowNumber)
    // } else if (descSet.has(description)) {
    //     dupFoodItems[description] = (dupFoodItems[description] || []).concat(fdc_id)
    // } else if (fdcIdSet.has(fdc_id)) {
    //     dupFdcIds[fdc_id] = (dupFdcIds[fdc_id] || []).concat(rowNumber)
    // }
}

const writeErrors = (params: string) => {
    console.log(params)
}

const writeDupDescriptions = (params: string) => {
    console.log(params)
}
const writeDupFDCIds = (params: string) => {
    console.log(params)
}

const insertToDb = async (trx: Transaction<DB>, food: FoodOptionalDefaults[]) => {
    console.log('--------inserting data--------------')

    const result = await trx.insertInto('Food').values(food).executeTakeFirstOrThrow()

    const firstId = Number(result.insertId)
    const affectedRows = result.numInsertedOrUpdatedRows
        ? Number(result.numInsertedOrUpdatedRows)
        : 0

    if (!firstId || !affectedRows) throw new Error('no insertions')

    console.log('--------insertion done--------------')
}
