document.addEventListener('DOMContentLoaded', () => {
    const chatbot = document.getElementById('chatbot');
    const openChatbot = document.getElementById('openChatbot');
    const closeChatbot = document.getElementById('closeChatbot');
    const sendChatbot = document.getElementById('sendChatbot');
    const chatbotInput = document.getElementById('chatbotInput');
    const chatbotMessages = document.getElementById('chatbotMessages');

    // Show initial message when chatbot opens
    openChatbot.addEventListener('click', () => {
        chatbot.classList.toggle('hidden');
        openChatbot.classList.toggle('hidden');
        if (!chatbot.classList.contains('hidden') && !chatbotMessages.innerHTML) {
            const initialMessage = document.createElement('div');
            initialMessage.className = 'text-left mb-2';
            initialMessage.innerHTML = `<p class="bg-gray-200 p-2 rounded-lg inline-block max-w-[80%]">Hola, soy MedicaIA, tu asistente virtual. ¿Cuál es tu consulta?</p>`;
            chatbotMessages.appendChild(initialMessage);
        }
    });

    closeChatbot.addEventListener('click', () => {
        chatbot.classList.add('hidden');
        openChatbot.classList.remove('hidden');
    });

    // Chatbot responses
    const responses = {
        'iniciar sesion': 'Para iniciar sesión, haz clic en "Iniciar Sesión" en la parte superior derecha, ingresa tu DNI y fecha de nacimiento, y presiona "Ingresar al Sistema".',
        'como me registro': 'Para Registrarse, haz clic en "Registrarte en la parte inferior de "Iniciar Sesión" y completa los campos de tu cuenta.',
        'que puedo hacer': 'En Acceso Salud puedes reservar citas médicas, consultar resultados, encontrar centros de salud cercanos, ver tu historial médico y obtener soporte. ¡Explora las opciones en el menú principal después de iniciar sesión!',
        'reservar cita': 'Para reservar una cita, inicia sesión y selecciona "Reservar Cita" en el menú. Elige la especialidad, tipo de consulta (presencial o teleconsulta), centro de salud y fecha preferida, luego busca horarios disponibles.',
        'resultados medicos': 'Puedes consultar tus resultados médicos iniciando sesión y navegando a la sección "Resultados Médicos". Los resultados estarán disponibles 24-48 horas después de tus exámenes.',
        'centros de salud': 'En la sección "Centros de Salud" puedes encontrar centros cercanos filtrando por tipo (hospitales, clínicas, etc.) y ver detalles como dirección, teléfono y horarios.',
        'soporte': 'Para soporte, visita la sección "Soporte" en el menú o contáctanos en la línea de ayuda 113 o vía <a href="https://api.whatsapp.com/send?phone=+51992637770&text=Hola%20*Tengo%20la%20siguiente%20duda...*" target="_blank" class="text-blue-500 underline">WhatsApp</a>.',
        'que es acceso salud': 'Acceso Salud es una plataforma del Estado Peruano que permite gestionar citas médicas, consultar resultados, encontrar centros de salud y acceder a servicios de EsSalud de forma rápida y segura.',
        'plataforma': 'Para usar la plataforma de Acceso Salud Inicia Sesión.',
        default: 'Lo siento, no entendí tu pregunta. Por favor, intenta de nuevo o contacta a un asistente humano en <a href="https://api.whatsapp.com/send?phone=+51992637770&text=Hola%20*Tengo%20la%20siguiente%20duda...*" target="_blank" class="text-blue-500 underline">WhatsApp</a>.'
    };

    // Chatbot message handling
    sendChatbot.addEventListener('click', () => {
        const message = chatbotInput.value.trim().toLowerCase();
        if (message) {
            const userMessage = document.createElement('div');
            userMessage.className = 'text-right mb-2';
            userMessage.innerHTML = `<p class="bg-blue-100 p-2 rounded-lg inline-block max-w-[80%]">${message}</p>`;
            chatbotMessages.appendChild(userMessage);

            // Bot response
            const botMessage = document.createElement('div');
            botMessage.className = 'text-left mb-2';
            let response = responses.default;
            if (message.includes('iniciar sesion') || message.includes('login')) {
                response = responses['iniciar sesion'];
            } else if (message.includes('registro') || message.includes('funciones')) {
                response = responses['como me registro'];
            } else if (message.includes('plataforma') || message.includes('funciones')) {
                response = responses['plataforma'];
            } else if (message.includes('que puedo hacer') || message.includes('funciones')) {
                response = responses['que puedo hacer'];
            } else if (message.includes('reservar cita') || message.includes('nueva cita')) {
                response = responses['reservar cita'];
            } else if (message.includes('resultados medicos') || message.includes('examenes')) {
                response = responses['resultados medicos'];
            } else if (message.includes('centros de salud') || message.includes('hospitales')) {
                response = responses['centros de salud'];
            } else if (message.includes('soporte') || message.includes('ayuda')) {
                response = responses['soporte'];
            } else if (message.includes('que es acceso salud') || message.includes('acerca de')) {
                response = responses['que es acceso salud'];
            }
            botMessage.innerHTML = `<p class="bg-gray-200 p-2 rounded-lg inline-block max-w-[80%]">${response}</p>`;
            chatbotMessages.appendChild(botMessage);

            chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
            chatbotInput.value = '';
        }
    });

    // Allow sending message with Enter key
    chatbotInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendChatbot.click();
        }
    });
});