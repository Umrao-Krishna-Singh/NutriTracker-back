// Imports the Google Cloud client library
import { v3 } from '@google-cloud/translate'

const { TranslationServiceClient } = v3
const contents = [
    'chocolate milk',
    'no',
    'mcdouble (mcdonalds)',
    `what's up`,
    'Fudgesicle',
]
import { appendFileSync } from 'fs'
import { join } from 'path'

/**
 *  Optional. The format of the source text, for example, "text/html",
 *   "text/plain". If left blank, the MIME type defaults to "text/html".
 */
//   const mimeType = 'abc123'
//   const sourceLanguageCode = 'abc123'
const targetLanguageCode = 'hi'
const parent = 'projects/nutritracker-translate'

/**
 *  Optional. Glossary to be applied. The glossary must be
 *  within the same region (have the same location-id) as the model, otherwise
 *  an INVALID_ARGUMENT (400) error is returned.
 */
// const glossaryConfig = {}
/**
 *  Optional. Transliteration to be applied.
 */
// const transliterationConfig = {}

const translationClient = new TranslationServiceClient()

async function callTranslateText() {
    // Construct request
    const request = {
        contents,
        targetLanguageCode,
        parent,
    }

    // Run request
    const [{ translations }] = await translationClient.translateText(request)
    const translatedText: string[] | undefined = translations
        ?.filter((item) => !!item.translatedText)
        ?.map((item) => item.translatedText!)

    if (!translatedText?.length) console.error('translated text empty')
    else appendFileSync(join(__dirname, 'tlt.txt'), `\n` + JSON.stringify(translatedText))
}

callTranslateText()
