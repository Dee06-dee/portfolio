document.getElementById("contactform").addEventListener("submit", async function(event) {
    event.preventDefault(); // Prevent default form submission

    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());

    try {
        const response = await fetch("/.netlify/functions/sendEmail", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        alert(result.message || "Something went wrong!");
    } catch (error) {
        console.error("Error:", error);
        alert("Failed to send message. Please try again later.");
    }
});
