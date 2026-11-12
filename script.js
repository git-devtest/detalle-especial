// 1. CONFIGURACIÓN PERSONALIZABLE
// Cambia esta fecha por su fecha de aniversario (Año, Mes - 1, Día, Hora, Minuto)
// Nota: En JavaScript los meses van de 0 (Enero) a 11 (Diciembre)
const START_DATE = new Date(2026, 7, 24, 18, 0, 0); 

const REASONS = [
    "Por la forma en que iluminas cualquier lugar al que llegas.",
    "Porque contigo hasta los planes más sencillos se vuelven mis favoritos.",
    "Por tu sonrisa, que literalmente me reinicia el día.",
    "Por cómo me escuchas y me apoyas en cada proyecto que invento.",
    "Porque eres mi lugar seguro y mi mejor compañía.",
	 "Porque tomar chocolate contigo es algo mágico (Café Quindío)",
    "Por cada café, cada charla y cada risa compartida."
];

// 2. ELEMENTOS DEL DOM
const introScreen = document.getElementById('intro-screen');
const mainContent = document.getElementById('main-content');
const btnOpen = document.getElementById('btn-open');
const btnReason = document.getElementById('btn-reason');
const reasonDisplay = document.getElementById('reason-display');
const btnLove = document.getElementById('btn-love');

// 3. TRANSICIÓN DE PANTALLA (CON VIBRACIÓN HÁPTICA EN MÓVIL)
btnOpen.addEventListener('click', () => {
    if (navigator.vibrate) navigator.vibrate(50); // Pequeña vibración en Android
    
    introScreen.style.opacity = '0';
    setTimeout(() => {
        introScreen.classList.add('hidden');
        introScreen.style.display = 'none';
        
        mainContent.classList.remove('hidden');
        mainContent.style.display = 'flex';
        setTimeout(() => {
            mainContent.style.opacity = '1';
            spawnParticles(12); // Lluvia inicial de bienvenida
        }, 50);
    }, 500);
});

// 4. CONTADOR EN TIEMPO REAL
function updateCounter() {
    const now = new Date();
    const diff = now - START_DATE;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
}
setInterval(updateCounter, 1000);
updateCounter();

// 5. CAMBIAR RAZONES INTERACTIVAS
let currentIndex = 0;
btnReason.addEventListener('click', () => {
    if (navigator.vibrate) navigator.vibrate(30);
    reasonDisplay.style.opacity = '0';
    
    setTimeout(() => {
        currentIndex = (currentIndex + 1) % REASONS.length;
        reasonDisplay.textContent = `"${REASONS[currentIndex]}"`;
        reasonDisplay.style.opacity = '1';
    }, 250);
});

// 6. GENERADOR DE PARTÍCULAS (CORAZONES)
function spawnParticles(count = 8) {
    const container = document.getElementById('particles-container');
    const emojis = ['❤️', '✨', '💖', '🌸'];

    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        particle.style.left = Math.random() * 90 + 5 + 'vw';
        particle.style.animationDuration = (Math.random() * 1.5 + 2) + 's';
        
        container.appendChild(particle);
        setTimeout(() => particle.remove(), 3500);
    }
}

btnLove.addEventListener('click', () => {
    if (navigator.vibrate) navigator.vibrate([40, 30, 40]);
    spawnParticles(15);
});
