/*
Remaining To Do's-

-Update Game Name in Github... Week 4 homework is weak.  
-Update fonts/header font
-Fade to black and add 'you died' with only the power/reset button showing 
-Add screwed up tv screen at game start (perhaps at select an attacker) with 'blow on game cartridge and re-insert' via 50/50 coin flip.  
-Make Power button do something

Bugs-
-Bootstrap styling for the cards on md and smaller screens needs to be fixed
-Figure out how to compare strings to objects/utilize objects in a not-hacky way
-Game is really boring :)
-Add a real reset feature (didn't have time for this)
-footer is uggo

Pseudocode-
To see the pseudocode I originally used for this app, please see gamePseudocode.js

Thanks!

*/

$(document).ready(function () {

    /////////////////////////////
    //Global Vars
    /////////////////////////////

    //Game Status Booleans

    //Tests if player character has been chosen
    var playerSelected = false;
    var opponentSelected = false;

    //Tracks characters selected
    var currentPlayerCharacter;
    var currentOpposingCharacter;

    //Game Values 

    //Tracks number of opponents faced
    var OpponentCount = 0;

    //JQuery Trackers 

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

    //On Document Ready Actions 
    //Start background music at 'document-ready'
    prelude.play();

    //Hide the PvP container right away
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
            "gameWin": "You WIN.  You can make ANYTHING happen (With your mind)."

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



    ///////////////////////////////
    //Main Gameplay Function
    ///////////////////////////////

    function gamePlay(input) {
        switch (input) {

            //Pre-Game/Reset- Not really used- I just set reset to reload the page.  If I change this game to track score, I would reset everything to default here.
            case (0):

                playerSelected = false;
                break;

            //Player Selection
            case (1):

                //Reveal hidden PvP Div 
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

                //Update Dialoge box
                blueTextTarget.text("Now Choose an Opponent");

                //Player Container is filled, now attacker container must be filled
                playerSelected = true;

                break;

            //Opponent Selection
            case (2):
                console.log("case 2");

                //Identify Current Opponent
                currentOpposingCharacter = parseInt(currentSelection.attr("id"));

                //Stop prelude, start fight music
                prelude.pause();

                //Counts Opponents remaining on battlefield- changes music and ends game when they are all gone
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

                //Update Dialogue Box
                blueTextTarget.text("Press the ATTACK button to Attack your opponent!");

                opponentSelected = true;
                break;


            //Attack mode
            case (3):
                //Boolean ensures an opponent exists- prevents attacks from happening after game is won, etc.
                if (opponentSelected) {
                    //Play unique character attack sound 
                    var attackSound = new Audio(gameCharacters[currentPlayerCharacter].sound);
                    attackSound.play();


                    //Calculate and update opponent HP 
                    gameCharacters[currentOpposingCharacter].currentHP -= gameCharacters[currentPlayerCharacter].currentAttack;
                    $('.health', '#opponent-container').text("HP: " + gameCharacters[currentOpposingCharacter].currentHP);
                    $('.attack', '#opponent-container').text("ATK: " + gameCharacters[currentOpposingCharacter].currentAttack);

                    var oppPercentage = (gameCharacters[currentOpposingCharacter].currentHP / gameCharacters[currentOpposingCharacter].startingHP) * 100;
                    oppPercentage += "%";

                    //Update Bootstrap HP Progress Bar for Opponent 
                    $('.progress-bar', '#opponent-container').css('width', oppPercentage);


                    //Win/Lose Check before Counter Attack
                    if (gameCharacters[currentOpposingCharacter].currentHP <= 0) {
                        if (OpponentCount !== 3) {
                            opponentTarget.empty();
                            opponentSelected = false;
                        } else {
                            //game won
                            gamePlay(4);
                            break;
                        }
                    }

                    //Calculate and update player HP
                    gameCharacters[currentPlayerCharacter].currentHP -= gameCharacters[currentOpposingCharacter].currentAttack;
                    var text = "HP " + gameCharacters[currentPlayerCharacter].currentHP;
                    playerHealthTarget.text(text);
                    $('.health', '#player-container').text("HP: " + gameCharacters[currentPlayerCharacter].currentHP);

                    //Updates Bootstrap Progress Bar on Individual Character
                    var playerPercentage = (gameCharacters[currentPlayerCharacter].currentHP / gameCharacters[currentPlayerCharacter].startingHP) * 100;
                    playerPercentage += "%";
                    $('.progress-bar', '#player-container').css('width', playerPercentage);


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
                
                //finale music
                fight1.pause();
                fight2.pause();
                winSound.play();
                break;

            //Opponent Wins
            case (5):

                opponentSelected = false;
                blueTextTarget.text("You died... Press Reset to try again.");

                //finale music
                playerTarget.empty();
                fight1.pause();
                fight2.pause();
                loseSound.play();
                break;

            case (6):

                break;

        }
    };

    //Clicking Character Card on Click Event
    $(".character").on("click", function () {
        ting.play();

        //set current selection === this so it can be used in other scopes
        currentSelection = $(this);

        //Sends Card to Player area, and if the player area is already filled, sends card to opponent area, otherwise doesn't do anything
        if (!playerSelected) {

            gamePlay(1);
        } else if (playerSelected) {
            if (!opponentSelected) {
                gamePlay(2);
            }
        }

    });

    //Attack Button on Click 
    vsTarget.on("click", function () {
        console.log("Attack Button Pressed");
        //Will likely need an if statement
        gamePlay(3);

    });

    //Power Button On Click
    $("#power-button").on("click", function () {
        blueTextTarget.text("This doesn't actually do anything.");

    })




});


