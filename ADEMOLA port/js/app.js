import emailjs from '@emailjs/browser';

const form = document.getElementById('contactform');
const toast = document.getElementById('toast');

function showToast(message, type) {
    toast.textContent = message;
    toast.className = `toast ${type}`;
    setTimeout(() => {
        toast.className = 'toast';
    }, 3000);
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const fullname = form.fullname.value;
    const email = form.email.value;
    const message = form.message.value;
    
    emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
            from_name: fullname,
            from_email: email,
            message: message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    )
    .then(() => {
        showToast('Message sent successfully!', 'success');
        form.reset();
    })
    .catch(() => {
        showToast('Something went wrong. Please try again.', 'error');
    });
});

// Initialize wow.js if it's being used in your project
if (typeof WOW !== 'undefined') {
    new WOW}