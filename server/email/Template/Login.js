const LoginTemplate = (email, passord, date) => {
    console.log(email, passord, date)
    return `
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Account Created Successfully</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #f9f9f9;
      font-family: Arial, sans-serif;
      color: #444;
    }

    table {
      border-collapse: collapse;
      margin: 0 auto;
      max-width: 600px;
      width: 100%;
      background-color: #ffffff;
    }

    .header {
      background-color: #4CAF50;
      color: #ffffff;
      text-align: center;
      padding: 20px;
      font-size: 24px;
    }

    .content {
      padding: 20px;
      font-size: 16px;
      line-height: 1.6;
    }

    .content p {
      margin: 10px 0;
    }

    .details {
      width: 100%;
      border: 1px solid #dddddd;
      margin-top: 10px;
    }

    .details td {
      padding: 10px;
      font-size: 14px;
    }

    .details th {
      text-align: left;
      background: #f4f4f4;
      padding: 10px;
      font-size: 14px;
    }

    .footer {
      text-align: center;
      padding: 20px;
      font-size: 12px;
      color: #888888;
    }

    .btn {
      display: inline-block;
      padding: 10px 20px;
      margin: 20px 0;
      background: #4CAF50;
      color: #ffffff;
      text-decoration: none;
      border-radius: 4px;
      font-size: 16px;
    }

    @media only screen and (max-width: 480px) {
      table {
        width: 90%;
      }

      .content {
        font-size: 14px;
      }
    }
  </style>
</head>

<body>
  <table>
    <tr>
      <td class="header">
        Account Created Successfully
      </td>
    </tr>
    <tr>
      <td class="content">
        <p>Hello,</p>
        <p>We are excited to let you know that your account has been created successfully. Below are your account details:</p>
        <table class="details">
          <tr>
            <th>Email:</th>
            <td>${email}</td>
          </tr>
          <tr>
            <th>Password:</th>
            <td>${passord}</td>
          </tr>
          <tr>
            <th>Creation Time:</th>
            <td>${date}</td>
          </tr>
        </table>
        <p>Please make sure to keep this information secure. If you didn’t request this account, please contact us immediately.</p>
        <p style="text-align: center;">
          <a href="https://example.com/login" class="btn">Go to Login</a>
        </p>
      </td>
    </tr>
    <tr>
      <td class="footer">
        &copy; ${new Date().getFullYear()} Your Company. All rights reserved.
      </td>
    </tr>
  </table>
</body>

</html>
`

}

module.exports = LoginTemplate;