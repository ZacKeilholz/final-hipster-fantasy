/*

//////////////////////////
Hipster Fantasy RPG
//////////////////////////


The following are requirements for the class assignment, followed by some game theme ideation and pseudocode of what needs to happen and when.

//////////////////////////
Class Req's:
//////////////////////////

1. Game starts, you choose one of 4 characters by clicking on image of fighter.
2. Player fights as that character for the rest of hte game.  Enemies should be moved to a different area of the screen.
3. After selecting opponent, enemy is moved ot defender area.
4. Player is now able to click 'attack' button
5. When player clicks attack, the character damages the defender.  Opponent loses HP-displayed at bottom of defender's picture.  
6. Oponent instantly hits back whenever attack is clicked.
7. Player keeps pressing attack to defeat opponent.  
8. When defender HP is at zero or below, the enemy is removed from defender area and player must choose a new opponent.  
9. Player wins by defeating all enemy characters.  If player loses (hp <=0) game is lost.  
10. All characters have HP, Attack Power and Counter Attack Power attributes 
11. Every time player attacks, their AP increases by its base attack power.
12. Enemy char only has counter attack power that never changes.
13. HP, AP and CAP of each character must be different. 
14. No characters can heal or recover health points (?)
15.  Win by first fighting enemies with low CAP.  
16. You should be able to win and lose no matter which character you choose.

17.  Add a readme.  
18. Add to portfolio.  

//////////////////////////
Gameplay.
///////////////////////////

1. Players: 1. bike hipster (high attack). 2. music hipster (archer type).  3. web dev hipster (wizard)

2. Player object attributes: Starting HP, Current HP, base attack power, current attack power, counter attack power, custom sound, custom image, custom attack name, isEnemy (bool), isCurrentEnemy(bool);

3.Background image ideas- coffee shop, alleycat race, 

4.Game 'modes':  

aa.  (reaches )- have an initial screen that says 'hipster fantasy rpg' that covers everything with 'New Game' in pulsating red letters similar to a nintendo game. 
               - Have 'Reset' button that is actually image from nintendo console as jquery clickable buttons to reset the game.   

a. Pre-game/reset - attack player instance in the attacking-container and defender defending-container are cleared. all player cards are created in 'dugout', attributes are all zero-ed out to their original number, any alerts to the player (you win, lose, etc) are made invisible.  See reset for calculator.

b.Fighter Selection. Player clicks on a fighter- fighter is cleared from dugout-container and created in attacking-container- perhaps given a blue background?  All other fighter objects are toggled isEnemy and given red background (perhaps that is part of the object);  attackerSelected = true; 

c.Pick Defender.  (similar to pick operator in calc ) if enemy is clicked, and attackerSelected = true, the enemy chosen is cleared from the dugout and recreated in the defending-container. final fantasy attack music begins playing. defenderSelected = true;... 

d. Attack Mode. If defenderSelected = true, When player presses attack attackMode is initialized. HP is deducted from opponent- death is checked and opp removed if true (and defender Selected goes to false) otherwise their hp is updated, attack power of the player goes up, and enemy counter attacks... player death is checked, and hp is updated.  (reach: it would be awesome if the attacker image shifted slightly to the right when attacking and same for defender.. to imitate attacking movment, and then shifted back.)

e. Opponent dies- if opponent dies, we go back to 'pick defender mode'.  defenderSelected goes back to false, attackMode goes to false... Music stops.  

f. Game Won-  opponents are all dead.  if there are no more opponents, game is won (not sure what happens at this point..... maybe a sound).  we then go to pre-game reset.  

*/