// Imports the Google Cloud client library
import { v3 } from '@google-cloud/translate'
const { TranslationServiceClient } = v3
const contents = ['me', 'mine', 'what']
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
/**
 *  Optional. The labels with user-defined metadata for the request.
 *  Label keys and values can be no longer than 63 characters
 *  (Unicode codepoints), can only contain lowercase letters, numeric
 *  characters, underscores and dashes. International characters are allowed.
 *  Label values are optional. Label keys must start with a letter.
 *  See https://cloud.google.com/translate/docs/advanced/labels for more
 *  information.
 */
// const labels = [1,2,3,4]

// Imports the Translation library

// Instantiates a client
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
    console.log(translations?.map((item) => item.translatedText))
}

callTranslateText()
