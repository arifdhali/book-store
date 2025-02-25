const ForgotPassword = (token, email, time,userRole) => {
    return `
    
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Password Link</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f9;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
        }
        .reset-container {
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            padding: 20px;
            text-align: center;
            width: 100%;
            max-width: 400px;
        }
        .reset-container h2 {
            color: #333;
        }
        .reset-container p {
            color: #555;
        }
        .reset-container .btn {
            padding: 10px 20px;
            background-color: #ff4757;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
            margin-top: 20px;
        }
        .reset-container .btn:hover {
            background-color: #e84141;
        }
    </style>
</head>
<body>
    <div class="reset-container">
        <h2>Reset Your Password</h2>
        <p>Open your email: <strong>${email}</strong> and check your inbox. This link will expire in 10 minutes.</p>        
        <a class="btn" href="${process.env.CLIENT_URL}/${userRole}/reset-password?token=${token}">Click to Reset Password</a>
    </div>    
</body>
</html>
    
    `;
}

module.exports = ForgotPassword;