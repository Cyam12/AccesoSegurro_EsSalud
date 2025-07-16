document.addEventListener('DOMContentLoaded', () => {
    const notification = document.getElementById('notification');
    const notificationMessage = document.getElementById('notificationMessage');
    const loader = document.getElementById('loader');

    // Hide loader after page load
    setTimeout(() => {
        loader.classList.add('hidden');
    }, 500);

    // Notification function
    function showNotification(message) {
        notificationMessage.textContent = message;
        notification.classList.remove('hidden');
        setTimeout(() => {
            notification.classList.add('hidden');
        }, 3000);
    }

    // Check if user is logged in
    const user = localStorage.getItem('user');
    if (user) {
        showNotification(`¡Bienvenido de nuevo, ${user}!`);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const notification = document.getElementById('notification');
    const notificationMessage = document.getElementById('notificationMessage');
    const loader = document.getElementById('loader');
    const contactForm = document.getElementById('contact-form');
    const successModal = document.getElementById('success-modal');

    // Hide loader after page load
    setTimeout(() => {
        loader.classList.add('hidden');
    }, 500);

    // Notification function
    function showNotification(message) {
        notificationMessage.textContent = message;
        notification.classList.remove('hidden');
        setTimeout(() => {
            notification.classList.add('hidden');
        }, 3000);
    }

    // Handle form submission
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            successModal.classList.remove('hidden');
            setTimeout(() => {
                successModal.classList.add('hidden');
                contactForm.reset();
            }, 3000);
        });
    }
});