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

export function getRejectionEmailTemplate(name: string) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Highgrand Application Update</title>
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
                <h2 style="margin: 0 0 20px 0; font-size: 24px; color: #FFFFFF; font-weight: normal;">Hello, ${name}.</h2>
                <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 1.6; color: #A0A0A0;">
                  Thank you for your interest in the Highgrand Reseller Program. After a careful review of your application, we regret to inform you that we are unable to approve your account at this time.
                </p>
                <p style="margin: 0 0 30px 0; font-size: 16px; line-height: 1.6; color: #A0A0A0;">
                  Our decisions are based on various factors including current production capacity, geographical distribution, and brand alignment. This decision is not necessarily permanent, and you are welcome to apply again in the future as our network expands.
                </p>
                
                <!-- Divider -->
                <hr style="border: 0; border-top: 1px solid #333333; margin: 30px 0;">
                <p style="margin: 0; font-size: 14px; color: #666666; text-align: center;">
                  If you have any questions, you can reach us at <a href="mailto:info@highgrand.in" style="color: #D4AF37; text-decoration: none;">info@highgrand.in</a>.
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
export function getNewArrivalsEmailTemplate(resellerName: string, products: { name: string, slug: string, image: string, wholesaleLabel: string }[]) {
  const productHtml = products.map(p => `
    <div style="margin-bottom: 30px; border: 1px solid #333333; background-color: #000000; padding: 15px;">
      <img src="${p.image}" alt="${p.name}" style="width: 100%; height: auto; display: block; margin-bottom: 15px;">
      <h3 style="margin: 0 0 5px 0; color: #FFFFFF; font-size: 18px; text-transform: uppercase; font-family: 'Bebas Neue', Helvetica, Arial, sans-serif; letter-spacing: 1px;">${p.name}</h3>
      <p style="margin: 0; color: #D4AF37; font-size: 16px; font-weight: bold;">Wholesale: ${p.wholesaleLabel}</p>
      <a href="https://highgrand.in/products/${p.slug}" style="display: inline-block; margin-top: 15px; color: #FFFFFF; text-decoration: underline; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">View Full Details</a>
    </div>
  `).join('');

  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Arrivals at Highgrand</title>
  </head>
  <body style="margin: 0; padding: 0; background-color: #0A0A0A; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #FFFFFF;">
    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #0A0A0A; padding: 40px 0;">
      <tr>
        <td align="center">
          <table width="600" border="0" cellspacing="0" cellpadding="0" style="background-color: #111111; border: 1px solid #333333; border-radius: 8px; overflow: hidden;">
            <!-- Header -->
            <tr>
              <td align="center" style="padding: 40px 0; background-color: #000000; border-bottom: 1px solid #333333;">
                <p style="margin: 0 0 10px 0; font-size: 12px; color: #D4AF37; letter-spacing: 3px; text-transform: uppercase;">New Arrivals</p>
                <h1 style="margin: 0; font-size: 32px; letter-spacing: 4px; color: #FFFFFF; font-weight: bold; text-transform: uppercase;">HIGHGRAND</h1>
              </td>
            </tr>
            <!-- Content -->
            <tr>
              <td style="padding: 40px 50px;">
                <h2 style="margin: 0 0 20px 0; font-size: 24px; color: #FFFFFF; font-weight: normal;">Expand Your Inventory, ${resellerName}.</h2>
                <p style="margin: 0 0 30px 0; font-size: 16px; line-height: 1.6; color: #A0A0A0;">
                  We've just dropped 5+ new premium blanks this week. Elevate your shop's collection with our latest heavyweight industrial-grade apparel.
                </p>
                
                ${productHtml}

                <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-top: 20px; margin-bottom: 30px;">
                  <tr>
                    <td align="center">
                      <a href="https://highgrand.in/products" style="display: inline-block; background-color: #FFFFFF; color: #000000; font-size: 14px; font-weight: bold; text-transform: uppercase; letter-spacing: 2px; text-decoration: none; padding: 16px 32px; border-radius: 2px;">View All Products</a>
                    </td>
                  </tr>
                </table>

                <!-- Divider -->
                <hr style="border: 0; border-top: 1px solid #333333; margin: 30px 0;">
                <p style="margin: 0; font-size: 14px; color: #666666; text-align: center;">
                  The benchmark of premium wholesale.
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

export function getPasswordResetEmailTemplate(name: string, resetUrl: string) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Your Highgrand Password</title>
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
                <h2 style="margin: 0 0 20px 0; font-size: 24px; color: #FFFFFF; font-weight: normal;">Password Reset Request</h2>
                <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 1.6; color: #A0A0A0;">
                  Hello ${name}, we received a request to reset your password for your Highgrand account.
                </p>
                <p style="margin: 0 0 30px 0; font-size: 16px; line-height: 1.6; color: #A0A0A0;">
                  Click the button below to choose a new password. This link will expire in 1 hour.
                </p>
                
                <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 30px;">
                  <tr>
                    <td align="center">
                      <a href="${resetUrl}" style="display: inline-block; background-color: #FFFFFF; color: #000000; font-size: 14px; font-weight: bold; text-transform: uppercase; letter-spacing: 2px; text-decoration: none; padding: 16px 32px; border-radius: 2px;">Reset Password</a>
                    </td>
                  </tr>
                </table>

                <p style="margin: 0 0 20px 0; font-size: 14px; line-height: 1.6; color: #666666;">
                  If you didn't request this, you can safely ignore this email. Your password will remain unchanged.
                </p>

                <!-- Divider -->
                <hr style="border: 0; border-top: 1px solid #333333; margin: 30px 0;">
                <p style="margin: 0; font-size: 12px; color: #666666; text-align: center;">
                  Having trouble? Copy and paste this link into your browser:<br>
                  <a href="${resetUrl}" style="color: #D4AF37; text-decoration: none; word-break: break-all;">${resetUrl}</a>
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
