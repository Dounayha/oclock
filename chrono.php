<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/x-icon" href="./assets/img/favicon.ico.png">
    <title>Chronomètre</title>
    <link rel="stylesheet" href="./assets/css/chrono.css?<?php echo time(); ?>">
</head>
<body>
<main>
    <div class="stopwatch-container">
        <h1>
            Chronomètre
        </h1>
        <div id="time-display">00:00:00</div>
        <div class="stopwatch-controls">
            <button id="start-stop-btn">Démarrer</button>
            <button id="lap-btn" disabled>Tour</button>
            <button id="reset-btn" disabled>Réinitialiser</button>
        </div>
        <div class="lap-times">
            <h3>
                Temps des tours
            </h3>
            <ul id="laps-list"></ul>
        </div>
    </div>
</main>   
<script src="./assets/js/script_chrono.js"></script>
</body>
</html>