import { DatabaseService } from './db_connection'
import fs from 'fs'
import { Nutrient } from '@prism/keysley/types'
import { Units } from '@prism/keysley/enums'
import { z } from 'zod'

const client = new DatabaseService()
const errors: unknown[] = []
const filePath = './prisma/data/zipped/nutrient.csv'
const errorDir = './storage/seeders/'
const errorFilePath = errorDir + 'nutrient_seed_errors.txt'
const nutrients: Omit<Nutrient, 'id' | 'created_at' | 'updated_at'>[] = []

if (!fs.existsSync(errorDir)) {
    fs.mkdirSync(errorDir)
    fs.writeFileSync(errorFilePath, '')
}

if (!fs.existsSync(filePath)) throw new Error(`file: ${filePath} does not exist`)

export default async function seedNutrient() {
    console.log('-------- seeding nutrient.csv in database --------')

    const dbClient = await client.db()
    const nutrientData: string[] = fs.readFileSync(filePath).toString().split('\n')
    nutrientData.map((item) => parseData(item))

    try {
        if (nutrients?.length) {
            await dbClient
                .transaction()
                .execute(
                    async (trx) =>
                        await trx.insertInto('Nutrient').values(nutrients).execute(),
                )
        }
    } catch (error) {
        errors.push({ error })
    }

    writeErrors(errors)

    await client.closeConnection()
}

const parseData = (row: string) => {
    const values = modifiedSplit(row)
    const fdc_nutrient_id = values[0] ? Number(values[0]) : null
    const name = values[1] ? values[1].trim() : null
    const unit_name = values[2] ? values[2].trim() : null
    const nutrient_nbr = values[3] ? Number(values[3]) * 100 : null
    const rank = values[4] ? Number(values[4]) : null

    if (!fdc_nutrient_id && !name && !unit_name && !nutrient_nbr && !rank) return

    if (!fdc_nutrient_id || !name || !unit_name || name.length > 200) {
        errors.push({
            fdc_nutrient_id,
            name,
            unit_name,
            reason: 'Empty fdc_nutrient_id, name or unit_name or name too long',
        })
        return
    }

    const unit_name_schema = z.nativeEnum(Units)
    const { success, data } = unit_name_schema.safeParse(unit_name)
    if (!success) {
        errors.push({ unit_name, reason: 'Invalid unit_name' })
        return
    }

    nutrients.push({ fdc_nutrient_id, name, unit_name: data, nutrient_nbr, rank })
}

/**
 * Treats values inside quotes as one unit
 */
const modifiedSplit = (row: string): string[] => {
    let parts: string[] = []
    if (row.includes('"')) {
        let isAUnit: boolean = false

        for (let i = 0, j = 0; i < row.length; i++) {
            const item = row[i]

            if (item === ',' && !isAUnit) {
                if (i !== j) parts.push(row.slice(j, i))
                else parts.push('')
                j = i + 1
            } else if (!isAUnit && item === '"') {
                isAUnit = true
                j = i + 1
            } else if (isAUnit && item === '"') {
                isAUnit = false
                parts.push(row.slice(j, i))
                i++
                j = i + 1
            }

            if (i === row.length - 1 && j <= i) parts.push(row.slice(j, i))
        }
    } else parts = row.split(',')

    return parts
}

const writeErrors = (errors: unknown[] | string) => {
    try {
        if (!errors.length) return
        errors = '\n' + JSON.stringify(errors)
        fs.appendFileSync(errorFilePath, errors)
    } catch (error) {
        console.error(`---------error while writing errors ----------`, error)
        fs.appendFileSync(errorFilePath, `\nFailed to write to the errors.`)
    }
}
