function showToast(message, type) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');

    if (!toast || !toastMessage) {
        console.error('Toast elements not found');
        return;
    }

    console.log('Showing toast:', { message, type });

    // Clear previous content
    toastMessage.innerHTML = '';

    // Create icon element
    const icon = document.createElement('i');
    icon.className = 'fas';
    if (type === 'green') {
        icon.classList.add('fa-check-circle');
    } else if (type === 'red') {
        icon.classList.add('fa-times-circle');
    } else if (type === 'yellow') {
        icon.classList.add('fa-exclamation-triangle');
    }

    // Create text element
    const text = document.createElement('p');
    text.textContent = message;

    // Append icon and text to toast
    toastMessage.appendChild(icon);
    toastMessage.appendChild(text);

    // Remove previous classes and apply new ones
    toast.className = 'fixed top-6 right-6 p-4 rounded-lg shadow-lg animate__animated animate__fadeInDown';
    if (type === 'green') {
        toast.classList.add('bg-green-500', 'text-white');
    } else if (type === 'red') {
        toast.classList.add('bg-red-500', 'text-white');
    } else if (type === 'yellow') {
        toast.classList.add('bg-yellow-500', 'text-black');
    }

    // Show toast
    toast.classList.remove('hidden');

    // Hide toast after 3 seconds with fadeOutUp animation
    setTimeout(() => {
        toast.classList.remove('animate__fadeInDown');
        toast.classList.add('animate__fadeOutUp');
        setTimeout(() => {
            toast.classList.add('hidden');
            toast.classList.remove('bg-green-500', 'bg-red-500', 'bg-yellow-500', 'text-white', 'text-black', 'animate__fadeOutUp');
            console.log('Toast hidden');
        }, 400); // Match animation duration
    }, 3000);
}