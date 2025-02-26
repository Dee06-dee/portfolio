
from flask import Flask, request, jsonify
from flask_mail import Mail, Message
from flask_cors import CORS  # Import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Flask-Mail Configuration
app.config["MAIL_SERVER"] = "smtp.gmail.com"
app.config["MAIL_PORT"] = 587
app.config["MAIL_USE_TLS"] = True
app.config["MAIL_USE_SSL"] = False 
app.config["MAIL_USERNAME"] = "ademolafrancis45@gmail.com"
app.config["MAIL_PASSWORD"] = "hiebwyflmoximvxg"
app.config["MAIL_DEFAULT_SENDER"] = "ademolafrancis45@gmail.com"

mail = Mail(app)

@app.route("/send-email", methods=["POST"])
def send_email():
    try:
        data = request.json
        if not data:
            return jsonify({"error": "Invalid request, no data received"}), 400
        print("Received Data:", data)

        msg = Message(
            "New Contact Form Submission",
            recipients=["ademolafrancis45@gmail.com"],
            body=f"Name: {data.get('name')}\nEmail: {data.get('email')}\nMessage: {data.get('message')}"
        )
        mail.send(msg)
        print("Email sent successfully!") 

        return jsonify({"message": "Email sent successfully!"})  # ✅ Always return JSON

    except Exception as e:
        print("Error:", e)
        return jsonify({"error": str(e)}), 500  # Return JSON even on errors

if __name__ == "__main__":
    app.run(debug=True)
