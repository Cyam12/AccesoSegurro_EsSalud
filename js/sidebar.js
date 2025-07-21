document.addEventListener('DOMContentLoaded', () => {
    // Mapa de IDs de secciones a IDs de botones
    const sectionMap = {
        'panel-principal-section': 'panel-principal',
        'mis-citas-section': 'mis-citas',
        'reservar-cita-section': 'reservar-cita',
        'resultados-medicos-section': 'resultados-medicos',
        'centros-salud-section': 'centros-salud',
        'historial-section': 'historial',
        'soporte-section': 'soporte'
    };

    // Obtener todos los botones del sidebar
    const buttons = document.querySelectorAll('aside button');

    // Función para sincronizar la clase active en los botones
    const syncActiveButton = () => {
        // Remover la clase active de todos los botones
        buttons.forEach(button => button.classList.remove('active'));

        // Encontrar la sección activa (con clase 'active' y sin 'hidden')
        const activeSection = document.querySelector('.active:not(.hidden)');
        if (activeSection && sectionMap[activeSection.id]) {
            const activeButton = document.getElementById(sectionMap[activeSection.id]);
            if (activeButton) {
                activeButton.classList.add('active');
            }
        } else {
            // Fallback: resaltar "panel-principal" si no hay sección activa
            const defaultButton = document.getElementById('panel-principal');
            if (defaultButton) {
                defaultButton.classList.add('active');
            }
        }
    };

    // Retrasar la sincronización inicial para evitar recalculos del layout
    setTimeout(syncActiveButton, 0);

    // Observar cambios en las clases de las secciones
    const observer = new MutationObserver(syncActiveButton);
    Object.keys(sectionMap).forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section) {
            observer.observe(section, { 
                attributes: true, 
                attributeFilter: ['class'],
                subtree: false // Optimizar para no observar nodos hijos
            });
        }
    });
});