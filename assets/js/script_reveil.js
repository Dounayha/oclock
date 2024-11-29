// Récupération des éléments de la page HTML
const setAlarmButton = document.getElementById('set-alarm-btn');
const alarmTimeInput = document.getElementById('alarm-time');
const alarmMessageInput = document.getElementById('alarm-message');
const alarmsList = document.getElementById('alarms-list');

// Liste pour stocker les alarmes programmées
let alarms = [];

// Fonction pour afficher les alarmes programmées
function displayAlarms() {
    alarmsList.innerHTML = ''; // Vider la liste avant de la remplir

    alarms.forEach((alarm, index) => {
        const alarmItem = document.createElement('li');
        const alarmTime = new Date(alarm.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        // Calculer le temps restant ou si l'alarme est passée
        const timeRemaining = getTimeRemaining(alarm.time);
        
        // Mettre à jour l'état de l'alarme
        let status = "";
        if (timeRemaining <= 0) {
            status = "Passée";
        } else {
            status = `Dans ${timeRemaining} minutes`;
        }

        alarmItem.textContent = `Alarme à ${alarmTime} - ${alarm.message} - ${status}`;
        alarmsList.appendChild(alarmItem);
    });
}

// Fonction pour calculer le temps restant jusqu'à l'alarme en minutes
function getTimeRemaining(alarmTime) {
    const now = new Date();
    const alarmDate = new Date(alarmTime);

    // Si l'alarme est dans le passé aujourd'hui, on la considère pour demain
    if (alarmDate <= now) {
        alarmDate.setDate(alarmDate.getDate() + 1);
    }

    const remainingTime = alarmDate - now;
    return Math.max(Math.floor(remainingTime / 60000), 0);  // Retourne le temps restant en minutes (minimum 0)
}

// Fonction pour vérifier si l'heure actuelle correspond à une alarme programmée
function checkAlarms() {
    const now = new Date();
    alarms.forEach((alarm, index) => {
        if (new Date(alarm.time).getHours() === now.getHours() && new Date(alarm.time).getMinutes() === now.getMinutes()) {
            // Alerte avec le message de l'alarme
            showAlert(alarm.message);
            alarms.splice(index, 1); // Supprimer l'alarme après qu'elle ait sonné
            displayAlarms(); // Mettre à jour la liste des alarmes
        }
    });
}

// Fonction pour afficher l'alerte
function showAlert(message) {
    const alertBox = document.createElement('div');
    alertBox.classList.add('alert-box');
    alertBox.textContent = `ALERTE : ${message}`;
    document.body.appendChild(alertBox);

    // Fermer l'alerte après quelques secondes
    setTimeout(() => {
        alertBox.remove();
    }, 5000);  // L'alerte disparaît après 5 secondes
}

// Ajouter une alarme à la liste
setAlarmButton.addEventListener('click', () => {
    const alarmTime = alarmTimeInput.value;
    const alarmMessage = alarmMessageInput.value;

    if (alarmTime && alarmMessage) {
        // Ajouter l'alarme à la liste
        alarms.push({ time: `1970-01-01T${alarmTime}:00`, message: alarmMessage });

        // Réinitialiser les champs de saisie
        alarmTimeInput.value = '';
        alarmMessageInput.value = '';

        // Mettre à jour l'affichage des alarmes
        displayAlarms();
    } else {
        alert('Veuillez entrer une heure et un message pour l\'alarme');
    }
});

// Vérifier les alarmes toutes les minutes
setInterval(checkAlarms, 60000);  // Toutes les 60 secondes

// Mettre à jour la liste des alarmes immédiatement
displayAlarms();
