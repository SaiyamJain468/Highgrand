export function getWelcomeEmailTemplate(name: string) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Highgrand</title>
  </head>
  <body style="margin: 0; padding: 0; background-color: #0A0A0A; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #FFFFFF;">
    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #0A0A0A; padding: 40px 0;">
      <tr>
        <td align="center">
          <table width="600" border="0" cellspacing="0" cellpadding="0" style="background-color: #111111; border: 1px solid #333333; border-radius: 8px; overflow: hidden;">
            <!-- Header -->
            <tr>
              <td align="center" style="padding: 40px 0; background-color: #000000; border-bottom: 1px solid #333333;">
                <h1 style="margin: 0; font-size: 32px; letter-spacing: 4px; color: #FFFFFF; font-weight: bold; text-transform: uppercase;">HIGHGRAND</h1>
              </td>
            </tr>
            <!-- Content -->
            <tr>
              <td style="padding: 40px 50px;">
                <h2 style="margin: 0 0 20px 0; font-size: 24px; color: #FFFFFF; font-weight: normal;">Welcome, ${name}.</h2>
                <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 1.6; color: #A0A0A0;">
                  Thank you for applying to become an exclusive Highgrand Reseller. Your application has been successfully submitted and is currently <span style="color: #D4AF37; font-weight: bold;">Under Review</span>.
                </p>
                <p style="margin: 0 0 30px 0; font-size: 16px; line-height: 1.6; color: #A0A0A0;">
                  Our team carefully evaluates each partner to ensure brand alignment. You will receive an update regarding your approval status within the next 24-48 hours.
                </p>
                <!-- Divider -->
                <hr style="border: 0; border-top: 1px solid #333333; margin: 30px 0;">
                <p style="margin: 0; font-size: 14px; color: #666666; text-align: center;">
                  If you have any urgent inquiries, please contact our support team at <a href="mailto:info@highgrand.in" style="color: #D4AF37; text-decoration: none;">info@highgrand.in</a>.
                </p>
              </td>
            </tr>
            <!-- Footer -->
            <tr>
              <td align="center" style="padding: 20px 0; background-color: #050505; border-top: 1px solid #333333;">
                <p style="margin: 0; font-size: 12px; color: #666666; letter-spacing: 1px; text-transform: uppercase;">© 2026 Highgrand Premium Apparel</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `;
}

export function getApprovalEmailTemplate(name: string) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Highgrand Application Approved</title>
  </head>
  <body style="margin: 0; padding: 0; background-color: #0A0A0A; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #FFFFFF;">
    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #0A0A0A; padding: 40px 0;">
      <tr>
        <td align="center">
          <table width="600" border="0" cellspacing="0" cellpadding="0" style="background-color: #111111; border: 1px solid #333333; border-radius: 8px; overflow: hidden;">
            <!-- Header -->
            <tr>
              <td align="center" style="padding: 40px 0; background-color: #000000; border-bottom: 1px solid #333333;">
                <h1 style="margin: 0; font-size: 32px; letter-spacing: 4px; color: #FFFFFF; font-weight: bold; text-transform: uppercase;">HIGHGRAND</h1>
              </td>
            </tr>
            <!-- Content -->
            <tr>
              <td style="padding: 40px 50px;">
                <h2 style="margin: 0 0 20px 0; font-size: 24px; color: #FFFFFF; font-weight: normal;">Congratulations, ${name}.</h2>
                <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 1.6; color: #A0A0A0;">
                  We are pleased to inform you that your application has been <span style="color: #4CAF50; font-weight: bold;">Approved</span>. You are now an official Highgrand Wholesale Partner.
                </p>
                <p style="margin: 0 0 30px 0; font-size: 16px; line-height: 1.6; color: #A0A0A0;">
                  You can now log in to your dashboard to access our exclusive B2B catalog, view wholesale pricing, and place your orders.
                </p>
                
                <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 30px;">
                  <tr>
                    <td align="center">
                      <a href="https://highgrand.in/login" style="display: inline-block; background-color: #FFFFFF; color: #000000; font-size: 14px; font-weight: bold; text-transform: uppercase; letter-spacing: 2px; text-decoration: none; padding: 16px 32px; border-radius: 2px;">Access Dashboard</a>
                    </td>
                  </tr>
                </table>

                <!-- Divider -->
                <hr style="border: 0; border-top: 1px solid #333333; margin: 30px 0;">
                <p style="margin: 0; font-size: 14px; color: #666666; text-align: center;">
                  Welcome to the standard of modern luxury.
                </p>
              </td>
            </tr>
            <!-- Footer -->
            <tr>
              <td align="center" style="padding: 20px 0; background-color: #050505; border-top: 1px solid #333333;">
                <p style="margin: 0; font-size: 12px; color: #666666; letter-spacing: 1px; text-transform: uppercase;">© 2026 Highgrand Premium Apparel</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `;
}
