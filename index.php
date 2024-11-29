<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/x-icon" href="./assets/img/favicon.ico.png">
    <title>Horloge</title>
    <link rel="stylesheet" href="./assets/css/nav.css?<?php echo time(); ?>">
    <link rel="stylesheet" href="./assets/css/style_horloge.css?<?php echo time(); ?>">
</head>
<body>
    <?php include('./Nav/nav.php'); ?>
    <main>
        <section class="hero">
            <div class="container">
                <h1>Horloge</h1>
                <div class="clock">
                    <span id="hours">00</span>
                    <span>:</span>
                    <span id="minutes">00</span>
                    <span>:</span>
                    <span id="seconds">00</span>
                </div>
            </div>
        </section> 
    </main>    
    <script src="./assets/js/recupe_heur.js"></script>
</body>
</html>