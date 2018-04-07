/*
-Make sure music repeats
-Update fonts
-Add 'Power/Reset' button feature
-Add cackle if opponent wins
-Fade to black and add 'you died' with only the power/reset button showing 
-Add fucked up screen at game start (perhaps at select an attacker) with 'blow on game cartridge and re-insert' via 50/50 coin flip.  
*/

$(document).ready(function () {

    /////////////////////////////
    //Global Vars
    /////////////////////////////

    //1. Game Status Booleans

    //Tests if player character has been chosen
    var playerSelected = false;
    var opponentSelected = false;

    //Tracks characters selected
    var currentPlayerCharacter;
    var currentOpposingCharacter;

    //Tracks number of opponents faced
    var OpponentCount = 0;

    //Replaces 'This' to identify and store current selection in jquery events
    var currentSelection;

    //Container Targets
    var playerTarget = $("#player-container");
    var opponentTarget = $("#opponent-container");
    var vsTarget = $("#vs-container");

    var newButton = $("button");

    var playerHealthTarget = $('.health', '#player-container');
    var opponentHealthTarget = $('.health', '#opponent-container');

    var playerAttackTarget = $('.attack', '#player-container');
    var blueTextTarget = $("#blue-text");
    //Audio

    var prelude = new Audio('assets/music/prelude.mp3');
    var fight1 = new Audio('assets/music/fight.mp3');
    var fight2 = new Audio('assets/music/finalFight.mp3');
    var winSound = new Audio('assets/music/winSound.mp3');
    var loseSound = new Audio('assets/music/deathSound.mp3');

    var ting = new Audio('assets/music/tingSound.mp3');

    //Start background music at 'document-ready'
    prelude.play();

    $("#action-container").hide();

    ////////////////////////////
    //Character Object
    /////////////////////////////

    var gameCharacters = {
        1: {
            "name": "sonic",
            "about": "Archer/Ranged Type",
            "startingAttack": 10,
            "currentAttack": 10,
            "startingHP": 190,
            "currentHP": 190,
            "sound": 'assets/music/sonicSound.mp3',
            "gameWin": "YOU WIN. No one knows more bands and battlefields than you!"
        },
        2: {
            "name": "cyclo",
            "about": "Beefy Physical Attack Type",
            "startingAttack": 15,
            "currentAttack": 15,
            "startingHP": 180,
            "currentHP": 180,
            "sound": 'assets/music/cycloSound.mp3',
            "gameWin": "YOU WIN.  You dominate the streets AND the battlefield!"

        },
        3: {
            "name": "wiz",
            "about": "Wizard/Magic Type",
            "startingAttack": 20,
            "currentAttack": 20,
            "startingHP": 160,
            "currentHP": 160,
            "sound": 'assets/music/wizSound.mp3',
            "gameWin": "You WIN.  You can make ANYTHING happen."

        },
        4: {
            "name": "psychic",
            "about": "Psycho Energy Type",
            "startingAttack": 25,
            "currentAttack": 25,
            "startingHP": 150,
            "currentHP": 150,
            "sound": 'assets/music/psychoSound.mp3',
            "gameWin": "You...KNEW this win was coming."
        }
    };

    function gamePlay(input) {
        switch (input) {

            //Pre-Game/Reset
            case (0):

                playerSelected = false;
                break;

            //Player Selection
            case (1):
                console.log("case 1");
                $("#action-container").show();


                //Identify player character selection
                currentPlayerCharacter = parseInt(currentSelection.attr("id"));
                console.log(currentPlayerCharacter);

                //HTML Update
                playerTarget.empty();
                currentSelection.contents().appendTo($("#player-container"));
                currentSelection.hide();
                $(".character").removeClass('bg-dark text-light').addClass('bg-danger text-dark');
                $('#enemies-container').addClass("col-md-4");
                $('#character-dugout').contents().appendTo('#enemies-container');

                blueTextTarget.text("Now Choose an Opponent");
                playerSelected = true;


                break;

            //Opponent Selection
            case (2):
                console.log("case 2");

                //Identify Current Opponent
                currentOpposingCharacter = parseInt(currentSelection.attr("id"));

                //Stop prelude, start fight music
                prelude.pause();

                OpponentCount++;
                if (OpponentCount == 3) {
                    //Play final boss music
                    fight1.pause();
                    fight2.play();
                } else {
                    fight1.play();
                }

                //start fight music
                //clear contents of 'opponent box' and hide/place new opponent from dugout into opponent box
                opponentTarget.empty();
                currentSelection.contents().appendTo(opponentTarget);
                currentSelection.hide();

                //Clear and replace 'Vs' with 'ATTACK' Button
                vsTarget.addClass("btn btn-success attack-button");
                $("#vs-text").text("ATTACK");

                blueTextTarget.text("Press the ATTACK button to Attack your opponent!");

                opponentSelected = true;

                break;

            //Attack mode
            case (3):

                if (opponentSelected) {
                    //find health container 
                    console.log("case 3");
                    console.log(gameCharacters[1].currentHP);

                    var attackSound = new Audio(gameCharacters[currentPlayerCharacter].sound);
                    attackSound.play();

                    
                    //Calculate and update opponent HP 
                    gameCharacters[currentOpposingCharacter].currentHP -= gameCharacters[currentPlayerCharacter].currentAttack;
                    $('.health', '#opponent-container').text("HP: " + gameCharacters[currentOpposingCharacter].currentHP);
                    $('.attack', '#opponent-container').text("ATK: " + gameCharacters[currentOpposingCharacter].currentAttack);


                    //Win/Lose Check before Counter Attack
                    if (gameCharacters[currentOpposingCharacter].currentHP <= 0) {
                        if (OpponentCount !== 3) {
                            opponentTarget.empty();
                            opponentSelected = false;
                        } else {
                            //game won
                            gamePlay(4);
                        }
                    }

                    //Calculate and update player HP
                    gameCharacters[currentPlayerCharacter].currentHP -= gameCharacters[currentOpposingCharacter].currentAttack;
                    var text = "HP " + gameCharacters[currentPlayerCharacter].currentHP;
                    playerHealthTarget.text(text);
                    $('.health', '#player-container').text("HP: " + gameCharacters[currentPlayerCharacter].currentHP);


                    //Player Death Check
                    if (gameCharacters[currentPlayerCharacter].currentHP <= 0) {
                        playerTarget.empty();
                        gamePlay(5);
                    }

                    //Increase attack of player character
                    gameCharacters[currentPlayerCharacter].currentAttack += gameCharacters[currentPlayerCharacter].startingAttack;
                    playerAttackTarget.text("ATK: " + gameCharacters[currentPlayerCharacter].currentAttack);
                    $('.attack', '#player-container').text("ATK: " + gameCharacters[currentPlayerCharacter].currentAttack);
                }
                break;

            //Player Wins
            case (4):
                opponentSelected = false;
                blueTextTarget.text(gameCharacters[currentPlayerCharacter].gameWin);
                opponentTarget.empty();
                fight1.pause();
                fight2.pause();
                winSound.play();
                break;

            //Opponent Wins
            case (5):
                opponentSelected = false;
                blueTextTarget.text("You died... Press Reset to try again.");
                playerTarget.empty();
                fight1.pause();
                fight2.pause();
                loseSound.play();
                break;

            case (6):

                break;

        }
    };
    $(".character").on("click", function () {
        ting.play();

        console.log("Click Just Happened");

        //set current selection === this so it can be used in other scopes
        currentSelection = $(this);

        console.log(currentSelection);
        if (!playerSelected) {

            gamePlay(1);
        } else if (playerSelected) {
            if (!opponentSelected) {
                gamePlay(2);
            }
        }

    });

    vsTarget.on("click", function () {
        console.log("Attack Button Pressed");
        //Will likely need an if statement
        gamePlay(3);

    });





});


