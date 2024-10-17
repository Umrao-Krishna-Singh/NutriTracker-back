import { DatabaseService } from './db_connection'
import fs from 'fs'
import { SqlBool, Transaction, sql } from 'kysely'
import { DB } from '@prism/keysley/types'

type foodItems = {
    fdc_id: number
    description: string
}

type dupFoodItems = {
    type: number
    fdc_id: number
    description: string
}

const client = new DatabaseService()
let errors: unknown[] = []
let chunkCount = 0
let results: foodItems[] = []
const filePath = './prisma/data/zipped/food.csv'
const errorFilePath = './prisma/seeders/seed_errors.txt'
let descSet: Set<string> = new Set()
let fdcIdSet: Set<number> = new Set()
let dupFood: dupFoodItems[] = []

if (!fs.existsSync(errorFilePath)) fs.writeFileSync(errorFilePath, '')

export default async function seedFdcFood() {
    if (!fs.existsSync(filePath)) throw new Error(`file: ${filePath} does not exist`)
    console.log('-------- seeding food.csv in database --------')

    const dbClient = await client.db()
    let lastRow: string | undefined
    let isLastRowComplete = true

    for await (const chunk of fs.createReadStream(filePath) as AsyncIterable<Buffer>) {
        chunkCount++
        const chunkData: string[] = chunk.toString().split('\n')
        const firstRow: string = chunkData[0]
        if (chunkCount > 1) {
            if (!isLastRowComplete && lastRow) parseData(lastRow + firstRow)
            else if (isLastRowComplete) parseData(firstRow)
        }

        lastRow = chunkData[chunkData.length - 1]
        if (lastRow.split(',').length !== 5) isLastRowComplete = false

        for (let i = 1; i < chunkData.length - 1; i++) {
            parseData(chunkData[i])
        }

        try {
            await dbClient
                .transaction()
                .execute(
                    async (trx) =>
                        await insertToDb(trx, results, descSet, fdcIdSet, dupFood),
                )

            await dbClient
                .transaction()
                .execute(async (trx) => await insertDuplicates(trx, dupFood))
        } catch (error) {
            errors.push({ error, chunkCount })
        }

        writeErrors(errors, chunkCount)

        results = []
        descSet = new Set()
        fdcIdSet = new Set()
        dupFood = []
        errors = []
    }

    try {
        await dbClient.transaction().execute(async (trx) => await syncRecords(trx))
        await client.closeConnection()

        console.log('Finished reading the file.')
    } catch (error) {
        await client.closeConnection()
        console.error(error)
    }
}

const parseData = (row: string) => {
    const values = row.split('",')
    const fdc_id = values[0] ? Number(values[0].slice(1)) : undefined
    const description = values[2] ? values[2].slice(1).trim().toLowerCase() : undefined

    if (!fdc_id || !description) {
        errors.push({ fdc_id, description, reason: 'Empty fdc_id or description' })
        return
    }

    if (description.length > 500) return

    const dupDesc = descSet.has(description)
    const dupFdc = fdcIdSet.has(fdc_id)

    if (!dupDesc && !dupFdc) {
        descSet.add(description)
        fdcIdSet.add(fdc_id)
        results.push({ fdc_id, description })
    } else if (dupDesc && dupFdc) dupFood.push({ description, fdc_id, type: 3 })
    else if (dupDesc) dupFood.push({ description, fdc_id, type: 2 })
    else if (dupFdc) dupFood.push({ description, fdc_id, type: 1 })
}

const insertToDb = async (
    trx: Transaction<DB>,
    food: foodItems[],
    descSet: Set<string> = new Set(),
    fdcIdSet: Set<number> = new Set(),
    dupFood: dupFoodItems[],
) => {
    console.log('--------inserting data--------------')

    const descArr = Array.from(descSet)
    const fdcArr = Array.from(fdcIdSet)

    const duplicates = await trx
        .selectFrom('Food')
        .select(['Food.description', 'Food.fdc_id'])
        .where((eb) =>
            eb.or([
                eb('Food.description', 'in', descArr),
                eb('Food.fdc_id', 'in', fdcArr),
            ]),
        )
        .execute()

    const dbDuplicateDesc: Set<string> = new Set()
    const dbDuplicateFdc: Set<number> = new Set()

    duplicates.map((item) => {
        dbDuplicateDesc.add(item.description)
        if (item.fdc_id) dbDuplicateFdc.add(item.fdc_id)
    })

    const insertData: foodItems[] = []
    for (let i = 0; i < food.length; i++) {
        const item = food[i]
        const dupDesc = dbDuplicateDesc.has(item.description)
        const dupFdc = dbDuplicateFdc.has(item.fdc_id)

        if (!(dupDesc || dupFdc))
            insertData.push({ fdc_id: item.fdc_id, description: item.description })
        if (dupDesc && dupFdc)
            dupFood.push({ type: 3, fdc_id: item.fdc_id, description: item.description })
        if (dupDesc)
            dupFood.push({ type: 2, fdc_id: item.fdc_id, description: item.description })
        if (dupFdc)
            dupFood.push({ type: 1, fdc_id: item.fdc_id, description: item.description })
    }

    if (!insertData?.length) return
    await trx.insertInto('Food').values(insertData).execute()
    console.log('--------insertion done--------------')
}

const insertDuplicates = async (trx: Transaction<DB>, dupFood: dupFoodItems[]) => {
    console.log('--------inserting duplicate rows--------------')
    if (!dupFood.length)
        return console.log('--------nothing duplicate to insert--------------')

    await trx.insertInto('DuplicateFood').values(dupFood).execute()

    console.log('--------insertion done--------------')
}

const syncRecords = async (trx: Transaction<DB>) => {
    const ids = await trx
        .selectFrom('DuplicateFood')
        .select('DuplicateFood.id')
        .where((eb) =>
            eb(
                'DuplicateFood.id',
                'in',
                trx
                    .selectFrom('DuplicateFood')
                    .innerJoin(
                        (eb) =>
                            eb
                                .selectFrom('DuplicateFood as Dup')
                                .select(['Dup.description', 'Dup.fdc_id'])
                                .groupBy(['Dup.description', 'Dup.fdc_id'])
                                .having(
                                    sql<SqlBool>`COUNT(Dup.description) > 1 AND COUNT(Dup.fdc_id) > 1`,
                                )
                                .as('DuplicateDescs'),
                        (join) =>
                            join
                                .onRef(
                                    'DuplicateFood.description',
                                    '=',
                                    'DuplicateDescs.description',
                                )
                                .on('DuplicateFood.type', '=', 2),
                    )
                    .select(['DuplicateFood.id']),
            ),
        )
        .execute()

    const idArr = ids.map((item) => item.id)

    if (idArr.length)
        await trx
            .updateTable('DuplicateFood')
            .set({ type: 3 })
            .where('DuplicateFood.id', 'in', idArr)
            .execute()
}

const writeErrors = (errors: unknown[] | string, chunkCount: number) => {
    try {
        if (!errors.length) return
        errors = '\n' + JSON.stringify(errors)
        fs.appendFileSync(errorFilePath, errors)
    } catch (error) {
        console.error(
            `---------error while writing errors for chunk:${chunkCount} ----------`,
            error,
        )

        fs.appendFileSync(
            errorFilePath,
            `\nFailed to write to the errors. Chunk: ${chunkCount}`,
        )
    }
}
