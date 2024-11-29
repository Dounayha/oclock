const timeDisplay = document.getElementById('time-display');
const startStopButton = document.getElementById('start-stop-btn');
const lapButton = document.getElementById('lap-btn');
const resetButton = document.getElementById('reset-btn');
const lapsList = document.getElementById('laps-list');

// Variables globales pour gérer le chronomètre
let timerInterval = null; // Intervalle du chronomètre
let elapsedTime = 0; // Temps écoulé en secondes
let isRunning = false; // Indicateur si le chronomètre est en marche

// Fonction pour formater le temps (heures:minutes:secondes)
function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

// Mise à jour de l'affichage du temps
function updateTimeDisplay() {
    timeDisplay.textContent = formatTime(elapsedTime);
}

// Démarrer ou arrêter le chronomètre
startStopButton.addEventListener('click', () => {
    if (isRunning) {
        // Arrêter le chronomètre
        clearInterval(timerInterval);
        isRunning = false;
        startStopButton.textContent = 'Démarrer';
        lapButton.disabled = true; // Désactiver le bouton "Tour"
        resetButton.disabled = false; // Activer le bouton "Réinitialiser"
    } else {
        // Démarrer le chronomètre
        isRunning = true;
        startStopButton.textContent = 'Arrêter';
        lapButton.disabled = false; // Activer le bouton "Tour"
        resetButton.disabled = true; // Désactiver le bouton "Réinitialiser"
        
        // Lancer l'intervalle pour compter chaque seconde
        timerInterval = setInterval(() => {
            elapsedTime++;
            updateTimeDisplay();
        }, 1000); // Met à jour chaque seconde
    }
});

// Ajouter un tour (lap)
lapButton.addEventListener('click', () => {
    const lapTime = formatTime(elapsedTime); // Formater le temps du tour
    const lapItem = document.createElement('li');
    lapItem.textContent = `Tour: ${lapTime}`;
    lapsList.appendChild(lapItem); // Ajouter le tour à la liste
});

// Réinitialiser le chronomètre
resetButton.addEventListener('click', () => {
    clearInterval(timerInterval); // Arrêter le chronomètre
    isRunning = false;
    elapsedTime = 0; // Remettre le temps à zéro
    updateTimeDisplay(); // Mettre à jour l'affichage à 00:00:00
    startStopButton.textContent = 'Démarrer'; // Remettre le texte du bouton à "Démarrer"
    lapButton.disabled = true; // Désactiver le bouton "Tour"
    resetButton.disabled = true; // Désactiver le bouton "Réinitialiser"
    lapsList.innerHTML = ''; // Vider la liste des tours
});

// Initialiser l'affichage du chronomètre
updateTimeDisplay();
