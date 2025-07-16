document.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('loader');
    const userName = document.getElementById('user-name');
    const userDni = document.getElementById('user-dni');
    const userSex = document.getElementById('user-sex');
    const userBirthdate = document.getElementById('user-birthdate');
    const userEmail = document.getElementById('user-email');
    const logoutButton = document.getElementById('logout');
    const sections = {
        'panel-principal': document.getElementById('panel-principal-section'),
        'mis-citas': document.getElementById('mis-citas-section'),
        'reservar-cita': document.getElementById('reservar-cita-section'),
        'resultados-medicos': document.getElementById('resultados-medicos-section'),
        'centros-salud': document.getElementById('centros-salud-section'),
        'historial': document.getElementById('historial-section'),
        'soporte': document.getElementById('soporte-section')
    };
    const editInfoModal = document.getElementById('edit-info-modal');
    const statsModal = document.getElementById('stats-modal');
    const notificationsModal = document.getElementById('notifications-modal');
    const summaryModal = document.getElementById('summary-modal');
    const insuranceModal = document.getElementById('insurance-modal');
    const appointmentModal1 = document.getElementById('appointment-modal-1');
    const newCitaModal = document.getElementById('new-cita-modal');
    const filterCitasModal = document.getElementById('filter-citas-modal');
    const cancellationsModal = document.getElementById('cancellations-modal');
    const reminderModal = document.getElementById('reminder-modal');
    const specialistsModal = document.getElementById('specialists-modal');
    const availabilityModal = document.getElementById('availability-modal');
    const docsModal = document.getElementById('docs-modal');
    const confirmModal = document.getElementById('confirm-modal');
    const resultModal1 = document.getElementById('result-modal-1');
    const addResultModal = document.getElementById('add-result-modal');
    const filterResultsModal = document.getElementById('filter-results-modal');
    const interpretationsModal = document.getElementById('interpretations-modal');
    const alertsModal = document.getElementById('alerts-modal');
    const centerModal1 = document.getElementById('center-modal-1');
    const servicesModal = document.getElementById('services-modal');
    const reviewsModal = document.getElementById('reviews-modal');
    const clinicalModal = document.getElementById('clinical-modal');
    const paymentsModal = document.getElementById('payments-modal');
    const vaccinesModal = document.getElementById('vaccines-modal');
    const chatModal = document.getElementById('chat-modal');
    const callbackModal = document.getElementById('callback-modal');
    const ticketsModal = document.getElementById('tickets-modal');
    const chatbot = document.getElementById('chatbot');
    const openChatbot = document.getElementById('openChatbot');
    const closeChatbot = document.getElementById('closeChatbot');
    const chatbotMessages = document.getElementById('chatbotMessages');
    const chatbotInput = document.getElementById('chatbotInput');
    const sendChatbot = document.getElementById('sendChatbot');
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');

    // Hide loader after page load
    setTimeout(() => {
        loader.classList.add('hidden');
    }, 500);

    // Check if user is authenticated
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const loggedInUser = localStorage.getItem('loggedInUser');
    const user = users.find(u => u.email === loggedInUser);

    if (!user) {
        showToast('No has iniciado sesión', 'red');
        setTimeout(() => {
            window.location.href = 'acceso.html';
        }, 3000);
        return;
    }

    // Display user info
    userName.textContent = user.name || 'No disponible';
    userDni.textContent = user.dni || 'No disponible';
    userSex.textContent = user.sex || 'No disponible';
    userBirthdate.textContent = user.birthdate || 'No disponible';
    userEmail.textContent = user.email || 'No disponible';

    // Handle logout
    logoutButton.addEventListener('click', () => {
        localStorage.removeItem('loggedInUser');
        showToast('Sesión cerrada', 'yellow');
        setTimeout(() => {
            window.location.href = 'acceso.html';
        }, 3000);
    });

    // Handle section navigation
    Object.keys(sections).forEach(id => {
        const button = document.getElementById(id);
        button.addEventListener('click', () => {
            const message = `Accediendo a ${id.replace('-', ' ').replace(/(^\w|\s\w)/g, m => m.toUpperCase())}`;
            showToast(message, 'green');

            Object.values(sections).forEach(section => section.classList.add('hidden'));
            sections[id].classList.remove('hidden');
            sections[id].classList.add('active');
        });
    });

    // Panel Principal Modals
    document.getElementById('edit-info').addEventListener('click', () => {
        editInfoModal.classList.remove('hidden');
    });
    document.getElementById('save-info').addEventListener('click', () => {
        const name = document.getElementById('edit-name').value;
        if (name) {
            user.name = name;
            localStorage.setItem('users', JSON.stringify(users));
            showToast('Información actualizada', 'green');
            editInfoModal.classList.add('hidden');
            userName.textContent = name;
        } else {
            showToast('Ingresa un nombre válido', 'red');
        }
    });
    document.getElementById('cancel-info').addEventListener('click', () => {
        editInfoModal.classList.add('hidden');
    });

    document.getElementById('view-stats').addEventListener('click', () => {
        statsModal.classList.remove('hidden');
    });
    document.getElementById('close-stats').addEventListener('click', () => {
        statsModal.classList.add('hidden');
    });

    document.getElementById('view-notifications').addEventListener('click', () => {
        notificationsModal.classList.remove('hidden');
    });
    document.getElementById('close-notifications').addEventListener('click', () => {
        notificationsModal.classList.add('hidden');
    });

    document.getElementById('view-summary').addEventListener('click', () => {
        summaryModal.classList.remove('hidden');
    });
    document.getElementById('close-summary').addEventListener('click', () => {
        summaryModal.classList.add('hidden');
    });

    document.getElementById('manage-insurance').addEventListener('click', () => {
        insuranceModal.classList.remove('hidden');
    });
    document.getElementById('close-insurance').addEventListener('click', () => {
        insuranceModal.classList.add('hidden');
    });
    document.getElementById('pay-now').addEventListener('click', () => {
        showToast('Pago procesado', 'green');
        insuranceModal.classList.add('hidden');
    });

    document.getElementById('view-calendar').addEventListener('click', () => {
        calendarModal.classList.remove('hidden');
    });
    document.getElementById('close-calendar').addEventListener('click', () => {
        calendarModal.classList.add('hidden');
    });

    // Mis Citas Modals
    document.getElementById('view-appointment-1').addEventListener('click', () => {
        appointmentModal1.classList.remove('hidden');
    });
    document.getElementById('close-appointment-1').addEventListener('click', () => {
        appointmentModal1.classList.add('hidden');
    });

    document.getElementById('new-cita').addEventListener('click', () => {
        newCitaModal.classList.remove('hidden');
    });
    document.getElementById('save-new-cita').addEventListener('click', () => {
        const specialty = document.getElementById('new-specialty').value;
        const date = document.getElementById('new-date').value;
        if (specialty && date) {
            showToast('Cita creada con éxito', 'green');
            newCitaModal.classList.add('hidden');
        } else {
            showToast('Completa todos los campos', 'red');
        }
    });
    document.getElementById('cancel-new-cita').addEventListener('click', () => {
        newCitaModal.classList.add('hidden');
    });

    document.getElementById('filter-citas').addEventListener('click', () => {
        filterCitasModal.classList.remove('hidden');
    });
    document.getElementById('apply-filter').addEventListener('click', () => {
        const status = document.getElementById('filter-status').value;
        const date = document.getElementById('filter-date').value;
        showToast(`Filtrando por ${status} en ${date || 'todas las fechas'}`, 'green');
        filterCitasModal.classList.add('hidden');
    });
    document.getElementById('cancel-filter').addEventListener('click', () => {
        filterCitasModal.classList.add('hidden');
    });

    document.getElementById('view-cancellations').addEventListener('click', () => {
        cancellationsModal.classList.remove('hidden');
    });
    document.getElementById('close-cancellations').addEventListener('click', () => {
        cancellationsModal.classList.add('hidden');
    });

    document.getElementById('set-reminder').addEventListener('click', () => {
        reminderModal.classList.remove('hidden');
    });
    document.getElementById('save-reminder').addEventListener('click', () => {
        const time = document.getElementById('reminder-time').value;
        if (time) {
            showToast('Recordatorio configurado', 'green');
            reminderModal.classList.add('hidden');
        } else {
            showToast('Selecciona una hora', 'red');
        }
    });
    document.getElementById('cancel-reminder').addEventListener('click', () => {
        reminderModal.classList.add('hidden');
    });

    // Reservar Cita Modals
    document.getElementById('search-specialists').addEventListener('click', () => {
        specialistsModal.classList.remove('hidden');
    });
    document.getElementById('close-specialists').addEventListener('click', () => {
        specialistsModal.classList.add('hidden');
    });

    document.getElementById('check-availability').addEventListener('click', () => {
        availabilityModal.classList.remove('hidden');
    });
    document.getElementById('close-availability').addEventListener('click', () => {
        availabilityModal.classList.add('hidden');
    });

    document.getElementById('upload-docs').addEventListener('click', () => {
        docsModal.classList.remove('hidden');
    });
    document.getElementById('upload-doc').addEventListener('click', () => {
        showToast('Documento subido', 'green');
        docsModal.classList.add('hidden');
    });
    document.getElementById('cancel-doc').addEventListener('click', () => {
        docsModal.classList.add('hidden');
    });

    document.getElementById('confirm-booking').addEventListener('click', () => {
        confirmModal.classList.remove('hidden');
    });
    document.getElementById('confirm-yes').addEventListener('click', () => {
        showToast('Cita reservada con éxito', 'green');
        confirmModal.classList.add('hidden');
    });
    document.getElementById('confirm-no').addEventListener('click', () => {
        confirmModal.classList.add('hidden');
    });

    // Resultados Médicos Modals
    document.getElementById('view-result-1').addEventListener('click', () => {
        resultModal1.classList.remove('hidden');
    });
    document.getElementById('close-result-1').addEventListener('click', () => {
        resultModal1.classList.add('hidden');
    });

    document.getElementById('add-result').addEventListener('click', () => {
        addResultModal.classList.remove('hidden');
    });
    document.getElementById('save-result').addEventListener('click', () => {
        const name = document.getElementById('result-name').value;
        const date = document.getElementById('result-date').value;
        const status = document.getElementById('result-status').value;
        if (name && date && status) {
            showToast('Resultado agregado', 'green');
            addResultModal.classList.add('hidden');
        } else {
            showToast('Completa todos los campos', 'red');
        }
    });
    document.getElementById('cancel-result').addEventListener('click', () => {
        addResultModal.classList.add('hidden');
    });

    document.getElementById('filter-results').addEventListener('click', () => {
        filterResultsModal.classList.remove('hidden');
    });
    document.getElementById('apply-filter-result').addEventListener('click', () => {
        const status = document.getElementById('filter-result-status').value;
        const date = document.getElementById('filter-result-date').value;
        showToast(`Filtrando por ${status} en ${date || 'todas las fechas'}`, 'green');
        filterResultsModal.classList.add('hidden');
    });
    document.getElementById('cancel-filter-result').addEventListener('click', () => {
        filterResultsModal.classList.add('hidden');
    });

    document.getElementById('view-interpretations').addEventListener('click', () => {
        interpretationsModal.classList.remove('hidden');
    });
    document.getElementById('close-interpretations').addEventListener('click', () => {
        interpretationsModal.classList.add('hidden');
    });

    document.getElementById('manage-alerts').addEventListener('click', () => {
        alertsModal.classList.remove('hidden');
    });
    document.getElementById('acknowledge-alert').addEventListener('click', () => {
        showToast('Alerta aceptada', 'green');
        alertsModal.classList.add('hidden');
    });
    document.getElementById('close-alerts').addEventListener('click', () => {
        alertsModal.classList.add('hidden');
    });

    // Centros de Salud Modals
    document.getElementById('view-center-1').addEventListener('click', () => {
        centerModal1.classList.remove('hidden');
    });
    document.getElementById('close-center-1').addEventListener('click', () => {
        centerModal1.classList.add('hidden');
    });

    document.getElementById('view-services').addEventListener('click', () => {
        servicesModal.classList.remove('hidden');
    });
    document.getElementById('close-services').addEventListener('click', () => {
        servicesModal.classList.add('hidden');
    });

    document.getElementById('view-reviews').addEventListener('click', () => {
        reviewsModal.classList.remove('hidden');
    });
    document.getElementById('close-reviews').addEventListener('click', () => {
        reviewsModal.classList.add('hidden');
    });

    // Historial Modals
    document.getElementById('view-clinical').addEventListener('click', () => {
        clinicalModal.classList.remove('hidden');
    });
    document.getElementById('close-clinical').addEventListener('click', () => {
        clinicalModal.classList.add('hidden');
    });

    document.getElementById('view-payments').addEventListener('click', () => {
        paymentsModal.classList.remove('hidden');
    });
    document.getElementById('close-payments').addEventListener('click', () => {
        paymentsModal.classList.add('hidden');
    });

    document.getElementById('view-vaccines').addEventListener('click', () => {
        vaccinesModal.classList.remove('hidden');
    });
    document.getElementById('close-vaccines').addEventListener('click', () => {
        vaccinesModal.classList.add('hidden');
    });

    document.getElementById('apply-filter-history').addEventListener('click', () => {
        const type = document.getElementById('filter-history-type').value;
        const date = document.getElementById('filter-history-date').value;
        showToast(`Filtrando por ${type} en ${date || 'todas las fechas'}`, 'green');
    });

    // Soporte Modals
    document.getElementById('call-support').addEventListener('click', () => {
        showToast('Llamada iniciada', 'green');
    });

    document.getElementById('start-chat').addEventListener('click', () => {
        chatModal.classList.remove('hidden');
    });
    document.getElementById('send-chat').addEventListener('click', () => {
        const message = chatbotInput.value;
        if (message) {
            addChatbotMessage('Tú: ' + message);
            chatbotInput.value = '';
            setTimeout(() => addChatbotMessage('Asistente: Gracias por tu mensaje, te ayudaré pronto.'), 1000);
        }
    });
    document.getElementById('close-chat').addEventListener('click', () => {
        chatModal.classList.add('hidden');
    });

    document.getElementById('request-callback').addEventListener('click', () => {
        callbackModal.classList.remove('hidden');
    });
    document.getElementById('confirm-callback').addEventListener('click', () => {
        const phone = document.getElementById('callback-number').value;
        const time = document.getElementById('callback-time').value;
        if (phone && time) {
            showToast('Retrollamada solicitada', 'green');
            callbackModal.classList.add('hidden');
        } else {
            showToast('Ingresa teléfono y hora', 'red');
        }
    });
    document.getElementById('cancel-callback').addEventListener('click', () => {
        callbackModal.classList.add('hidden');
    });

    document.getElementById('view-tickets').addEventListener('click', () => {
        ticketsModal.classList.remove('hidden');
    });
    document.getElementById('close-tickets').addEventListener('click', () => {
        ticketsModal.classList.add('hidden');
    });

    // Chatbot
    openChatbot.addEventListener('click', () => {
        chatbot.classList.remove('hidden');
    });
    closeChatbot.addEventListener('click', () => {
        chatbot.classList.add('hidden');
    });
    sendChatbot.addEventListener('click', () => {
        const message = chatbotInput.value;
        if (message) {
            addChatbotMessage('Tú: ' + message);
            chatbotInput.value = '';
            setTimeout(() => addChatbotMessage('Asistente: Gracias por tu mensaje, te ayudaré pronto.'), 1000);
        }
    });

    // Utility Functions
    function showToast(message, color) {
        toastMessage.textContent = message;
        toast.classList.remove('bg-red-500', 'bg-yellow-500', 'bg-green-500');
        toast.classList.add(`bg-${color}-500`);
        toast.classList.remove('hidden');
        setTimeout(() => toast.classList.add('hidden'), 3000);
    }

    function addChatbotMessage(message) {
        const p = document.createElement('p');
        p.textContent = message;
        p.classList.add('mb-2', 'text-gray-800');
        chatbotMessages.appendChild(p);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    // Show Panel Principal by default
    sections['panel-principal'].classList.remove('hidden');
    sections['panel-principal'].classList.add('active');
    
    // Inicializar el calendario
    const calendarEl = document.getElementById('calendar');
    if (calendarEl) {
        const calendar = new FullCalendar.Calendar(calendarEl, {
            initialView: 'dayGridMonth',
            contentHeight: '10px', 
            aspectRatio: 1.5, 
            height: '1',
            dayMaxEvents: true, 
        });
        calendar.render();
    }
    // Inicializar el calendario detallado en el modal
    const calendarModal = document.getElementById('calendar-modal');
    const calendarDetailEl = document.getElementById('calendar-detail');
    let detailCalendar;

    if (calendarDetailEl) {
        detailCalendar = new FullCalendar.Calendar(calendarDetailEl, {
            initialView: 'timeGridWeek', // Vista semanal detallada
            contentHeight: '150px', // Altura ajustada para más detalles
            aspectRatio: 1.8, // Ancho relativo más amplio
            height: '2',
            dayMaxEvents: true, // Limita eventos visibles
            events: [
                { title: 'Cita - Dr. Pérez', start: '2025-07-16T10:00:00', end: '2025-07-16T11:00:00' },
                { title: 'Cita - Dra. Gómez', start: '2025-07-18T14:00:00', end: '2025-07-18T15:00:00' }
            ], // Ejemplo con horarios detallados
            headerToolbar: {
                left: 'prev,next today',
                center: 'title',
                right: 'timeGridWeek,timeGridDay'
            },
            buttonText: {
                today: 'Hoy',
                week: 'Semana',
                day: 'Día'
            }
        });
        detailCalendar.render();
    }

    // Mostrar el modal con el calendario detallado
    document.getElementById('view-calendar').addEventListener('click', () => {
        calendarModal.classList.remove('hidden');
        if (detailCalendar) {
            detailCalendar.render();
        }
    });
    // Inicializar el mapa con Leaflet
    const mapEl = document.getElementById('mapid');
    if (mapEl) {
        const map = L.map(mapEl).setView([-12.0464, -77.0428], 6); // Centrado en Perú con zoom 6
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 18,
        }).addTo(map);

        // Marcadores para hospitales en Perú
        const hospitals = [
            { name: 'Hospital EsSalud Edgardo Rebagliati Martins', coords: [-12.0807, -77.0506], popup: 'Lima - Especialidades múltiples' },
            { name: 'Hospital EsSalud Honorio Delgado Espinoza', coords: [-16.3989, -71.5369], popup: 'Arequipa - Atención regional' },
            { name: 'Hospital EsSalud Víctor Lazarte Echegaray', coords: [-8.1135, -79.0326], popup: 'Trujillo - Emergencias' },
            { name: 'Hospital EsSalud Regional de Cusco', coords: [-13.5225, -71.9675], popup: 'Cusco - Servicios generales' },
            { name: 'Hospital EsSalud Arzobispo Loayza', coords: [-12.0571, -77.0398], popup: 'Lima - Atención primaria' },
        ];

        // Agregar marcadores al mapa
        hospitals.forEach(hospital => {
            L.marker(hospital.coords)
                .addTo(map)
                .bindPopup(hospital.name + '<br>' + hospital.popup)
                .openPopup();
        });

        // Actualizar mapa
        document.getElementById('refresh-map').addEventListener('click', () => {
            map.invalidateSize(); // Reajusta el tamaño del mapa
            showToast('Mapa actualizado', 'blue');
        });
    }

    // Función de notificación (asegúrate de que esté definida)
    function showToast(message, color) {
        const toast = document.getElementById('toast');
        const toastMessage = document.getElementById('toast-message');
        toastMessage.textContent = message;
        toast.classList.remove('bg-red-500', 'bg-yellow-500', 'bg-green-500', 'bg-purple-500', 'bg-lime-500', 'bg-teal-500', 'bg-blue-500');
        toast.classList.add(`bg-${color}-500`);
        toast.classList.remove('hidden');
        setTimeout(() => toast.classList.add('hidden'), 3000);
    }
});