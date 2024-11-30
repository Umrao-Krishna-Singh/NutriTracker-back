import { sendMail } from './send-mail.util'
import { otpVerEmail } from '@src/templates/otp-verification.email'

export const sendOtpMail = async (to: string, otp: number) => {
    const expiry = 10
    const htmlPath = otpVerEmail(otp, expiry)

    await sendMail(to, 'Verify your email', null, htmlPath, null)
}
