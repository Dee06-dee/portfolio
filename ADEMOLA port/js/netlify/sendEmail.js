const fetch = require("node-fetch");

exports.handler = async (event) => {
    try {
        // Parse form data from the request body
        const { fullname, email, message } = JSON.parse(event.body);

        // 🔹 Replace these with your actual Mailgun credentials
        const MAILGUN_API_KEY = "your-mailgun-api-key"; 
        const MAILGUN_DOMAIN = "your-mailgun-domain"; // Example: sandbox123.mailgun.org
        const SENDER_EMAIL = `noreply@${MAILGUN_DOMAIN}`; // Example: noreply@sandbox123.mailgun.org

        // Prepare the data to send to Mailgun
        const formData = new URLSearchParams();
        formData.append("from", SENDER_EMAIL);
        formData.append("to", email);
        formData.append("subject", "Thank You for Contacting Us");
        formData.append("text", `Hi ${fullname},\n\nWe received your message:\n"${message}"\n\nWe'll get back to you soon.`);

        // 🔹 Send the email via Mailgun API
        const response = await fetch(`https://api.mailgun.net/v3/${MAILGUN_DOMAIN}/messages`, {
            method: "POST",
            headers: {
                Authorization: "Basic " + Buffer.from("api:" + MAILGUN_API_KEY).toString("base64"),
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: formData
        });

        // 🔹 Handle response from Mailgun
        if (!response.ok) throw new Error("Failed to send email");

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Email sent successfully!" })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message || "Internal Server Error" })
        };
    }
};
