import { createTransport } from 'nodemailer'
import { ENV } from '@src/app.config'
import { Attachment } from 'nodemailer/lib/mailer'

/** At least `sentText` is provided*/
export async function sendMail(
    to: string,
    subject: string | null,
    sentText: string,
    htmlPath: null,
    sentAttachment: null,
): Promise<void>

/**  At least `htmlPath` is provided*/
export async function sendMail(
    to: string,
    subject: string | null,
    sentText: null,
    htmlPath: string,
    sentAttachment: null,
): Promise<void>

/**  At least `sentAttachment` is provided*/
export async function sendMail(
    to: string,
    subject: string | null,
    sentText: null,
    htmlPath: null,
    sentAttachment: [Attachment, ...Attachment[]],
): Promise<void>

/**  `sentText` and `htmlPath` are provided*/
export async function sendMail(
    to: string,
    subject: string | null,
    sentText: string,
    htmlPath: string,
    sentAttachment: null,
): Promise<void>

/**  `sentText` and `sentAttachment` are provided*/
export async function sendMail(
    to: string,
    subject: string | null,
    sentText: string,
    htmlPath: null,
    sentAttachment: [Attachment, ...Attachment[]],
): Promise<void>

/**  `htmlPath` and `sentAttachment` are provided*/
export async function sendMail(
    to: string,
    subject: string | null,
    sentText: null,
    htmlPath: string,
    sentAttachment: [Attachment, ...Attachment[]],
): Promise<void>

/**  All three are provided*/
export async function sendMail(
    to: string,
    subject: string | null,
    sentText: string,
    htmlPath: string,
    sentAttachment: [Attachment, ...Attachment[]],
): Promise<void>

/**  Implementation*/

export async function sendMail(
    to: string,
    subject: string | null,
    sentText: string | null,
    htmlPath: string | null,
    sentAttachment: [Attachment, ...Attachment[]] | null,
): Promise<void> {
    if (!sentText && !htmlPath && !sentAttachment)
        throw new Error(
            'At least one of sentText, htmlPath, or sentAttachment must be provided.',
        )

    const transporter = createTransport({
        pool: true,
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // use TLS
        auth: {
            user: ENV.SMTP_USER,
            pass: ENV.SMTP_PASS,
        },
    })

    const mailOptions = {
        from: ENV.SMTP_USER,
        to: to,
        subject: subject ? subject : '',
        ...(sentText && { text: sentText }),
        ...(htmlPath && { html: htmlPath }),
        ...(sentAttachment && { attachments: sentAttachment }),
    }

    await transporter.sendMail(mailOptions)
}
