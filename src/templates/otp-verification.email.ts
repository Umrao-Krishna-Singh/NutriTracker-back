export const otpVerEmail = (otp: number, expiry: number) => {
    const projectName = 'NutriTracker'
    return `<!doctype html>
    <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <title></title>
            <style>
                body {
                    margin: 0;
                    padding: 0;
                    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
                    color: #333;
                    background-color: #fff;
                }
    
                .container {
                    margin: 0 auto;
                    width: 100%;
                    max-width: 600px;
                    padding: 0 0px;
                    padding-bottom: 10px;
                    border-radius: 5px;
                    line-height: 1.8;
                }
    
                .header {
                    border-bottom: 1px solid #eee;
                }
    
                .header a {
                    font-size: 1.4em;
                    color: #000;
                    text-decoration: none;
                    font-weight: 600;
                }
    
                .content {
                    min-width: 700px;
                    overflow: auto;
                    line-height: 2;
                }
    
                .otp {
                    background-color: #fff;
                    margin: 0 auto;
                    width: fit-content;
                    padding: 5px 10px;
                    color: #000;
                    border: 1px solid #000;
                    border-radius: 4px;
                }
    
                .footer {
                    color: #aaa;
                    font-size: 0.8em;
                    line-height: 1;
                    font-weight: 300;
                }
    
                .email-info {
                    color: #666666;
                    font-weight: 400;
                    font-size: 13px;
                    line-height: 18px;
                    padding-bottom: 6px;
                }
    
                .email-info a {
                    text-decoration: none;
                    color: #00bc69;
                }
            </style>
        </head>
    
        <body>
            <div class="container">
                <div class="header">
                    <a>Welcome to ${projectName}!</a>
                </div>
                <br />
                <strong>Please verify your email</strong>
                <p>
                    Welcome to ${projectName}. For security purposes, please verify your
                    identity by providing the following One-Time
                    Password (OTP).
                    <br />
                    <b>Your One-Time Password (OTP) verification code is:</b>
                </p>
                <h2 class="otp">${otp}</h2>
                <p style="font-size: 0.9em">
                    <strong>One-Time Password (OTP) is valid for ${expiry} minutes.</strong>
                    <br />
                    <br />
                    If you did not initiate this login request, please disregard this message.
                    Please ensure the confidentiality of your OTP and do not share it with
                    anyone.<br />
                    <strong>Do not forward or give this code to anyone.</strong>
                    <br />
                    <br />
                    Stay Healthy!
                    <br />
                    <strong>${projectName}</strong>
                </p>
    
                <hr style="border: none; border-top: 0.5px solid #131111" />
                <div class="footer">
                    <p>This email can't receive replies.</p>
                    <p>
                        For more information about ${projectName} and your account, visit
                        <strong>${projectName}</strong>
                    </p>
                </div>
            </div>
        </body>
    </html>`
}
