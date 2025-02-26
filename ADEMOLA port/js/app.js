document.getElementById("contactform").addEventListener("submit", async function(event)
{
    event.preventDefault(); // Prevent default form submission

    const formData = {
        name: document.getElementById("fullname").value,
        email: document.getElementById("email").value,
        message: document.getElementById("message").value
    };

    try {
        const response = await fetch("http://127.0.0.1:5000/send-email", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        });
        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }

        const data = await response.json();
        alert(data.message); // Show success message
    } catch (error) {
        console.error("Error sending message:", error);
        alert("Failed to send message. Please try again.");
    }
});
