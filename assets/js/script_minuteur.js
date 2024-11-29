// 
const timeDisplay = document.getElementById('time-display');
const decreaseTimeButton = document.getElementById('decrease-time');
const increaseTimeButton = document.getElementById('increase-time');
const timeInput = document.getElementById('time-input');
const startStopButton = document.getElementById('start-stop-btn');

// Variables globales
let timerInterval = null; // Stocke l'intervalle du minuteur
let remainingTime = 0; // Temps restant en secondes
let isRunning = false; // Indique si le minuteur est en cours d'exécution

// Fonction pour formater les secondes en mm:ss
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

// updateTimeDisplay transforme le temps en "mm:ss" et l’écrit sur l'écran
function updateTimeDisplay() {
    timeDisplay.textContent = formatTime(remainingTime);
}

// Ajout de temps
increaseTimeButton.addEventListener('click', () => {
    //On vérifie si le minuteur n'est pas en train de fonctionner
    if (!isRunning) {
        //Ajoute 60 secondes au temps restant 
        remainingTime += 60;
        updateTimeDisplay();
        timeInput.value = Math.floor(remainingTime / 60); // Change la valeur de l'input MAJ
    }
});

// Réduction du temps
decreaseTimeButton.addEventListener('click', () => {
    // Le minuteur n'est pas en marche. On ne peut pas modifier le temps s’il est en train de décompter.
    if (!isRunning && remainingTime >= 60) { //Il reste au moins 60 secondes. On ne veut pas aller en dessous de 0, car le minuteur ne peut pas être négatif.
        remainingTime -= 60; // Retire 1 minute (60 secondes)
        updateTimeDisplay();
        timeInput.value = Math.floor(remainingTime / 60); // Met à jour l'input
    }
});

// Saisie manuelle du temps
timeInput.addEventListener('input', () => {
    if (!isRunning) {
        const inputMinutes = Math.max(0, parseInt(timeInput.value) || 0); // Pas de valeurs négatives
        remainingTime = inputMinutes * 60; // Convertit en secondes
        updateTimeDisplay();
    }
});

// Démarrer ou arrêter le minuteur
startStopButton.addEventListener('click', () => {
    if (isRunning) {
        // Arrêter le minuteur
        clearInterval(timerInterval);
        isRunning = false;
        startStopButton.textContent = 'Démarrer';
    } else {
        // Démarrer le minuteur
        if (remainingTime > 0) {
            isRunning = true;
            startStopButton.textContent = 'Arrêter';
            timerInterval = setInterval(() => {
                remainingTime--;
                updateTimeDisplay();

                // Vérifier si le temps est écoulé
                if (remainingTime <= 0) {
                    clearInterval(timerInterval);
                    isRunning = false;
                    startStopButton.textContent = 'Démarrer';
                    alert('Temps écoulé !');
                }
            }, 1000); // Mettre à jour chaque seconde
        } else {
            alert('Veuillez régler le temps avant de démarrer.');
        }
    }
});

// Initialisation
updateTimeDisplay();
