/*******************************************************/
// Create a game
/// Written by Joseph
/*******************************************************/
	
/*******************************************************/
// setup()
/*******************************************************/
//for Game height 
const GameHeight = 1000;
// for the Canvas width
const GameWidth = 1000;
// for the timer 
var GameTime = 15;
// for the score
var Score = 0;
// surfaces you can jump on
function setup() {
	console.log("setup: ");
    hide();
	cnv = new Canvas (GameWidth,GameHeight);
    // surfaces you can jump on
    Jumpsurfaces = new Group();
    // all the sprites 
    Sprites = new Group();
    Sprite.add(Platform1);
    Sprite.add(Platform2);
    Sprite.add(Platform3);
    Sprite.add(Platform4);
    Sprite.add(Platform5);
	wallLH
	wallRH
	wallTop
    wallBot
    Player
    //code for Player sprite 
	Player = new Sprite( 250,250,25, 'd' );
	Player.color = 'cyan';
    // code for Platforms
    Platform1 = new Sprite(100,250, 300,8, 'k');
    Platform2 = new Sprite(200,800, 300,8, 'k');
    Platform3 = new Sprite(500,900, 300,8, 'k');
    Platform4 = new Sprite(500,700, 300,8, 'k');
    Platform5 = new Sprite(400,300, 300,8, 'k');
    //Colour for Platforms 
    Platform1.color = 'green';
    Platform2.color = 'white';
    Platform3.color = 'blue';
    Platform4.color = 'black';
    Platform5.color = 'red';
    //code for wall sprites
    wallLH  = new Sprite(0, 1000, 8, 2000, 'k');
	wallLH.color = 'black';
    wallLH.bounciness = 1;
	wallRH  = new Sprite(1000, 0, 8, 2000, 'k');
	wallRH.color = 'black';
    wallRH.bounciness = 1;
	wallTop = new Sprite(0, 1, 2000, 8, 'k');
	wallTop.color = 'black';
    wallTop.bounciness = 1;
	wallBot = new Sprite(0, 999, 2000, 8, 'k');
	wallBot.color = 'black';
    wallBot.bounciness = 0;
    // contents of Jumpsurfaces group 
    Jumpsurfaces.add(wallBot);
    Jumpsurfaces.add(Platform1);
    Jumpsurfaces.add(Platform2);
    Jumpsurfaces.add(Platform3);
    Jumpsurfaces.add(Platform4);
    Jumpsurfaces.add(Platform5);
    //adding Gravity 
    world.gravity.y = 10;
    Coins();



function hide(){
    Platform1.hide()
    Platform2.hide()
    Platform3.hide()
    Platform4.hide()
    Platform5.hide()
	wallLH.hide()
	wallRH.hide()
	wallTop.hide()
    wallBot.hide()
    Player.hide()
}

function show(){
    Platform1.show()
    Platform2.show()
    Platform3.show()
    Platform4.show()
    Platform5.show()
	wallLH.show()
	wallRH.show()
	wallTop.show()
    wallBot.show()
    Player.show()
}
}
function displayScore(){
    textSize(35);
    text("Score:"+Score ,50, 35);
    // This is the Score
    }
/*******************************************************/
// draw()
/*******************************************************/
function draw() {
	background('gray');
    displayScore();
    //KeyBoard controls   
    Player.colliding(Jumpsurfaces, Jump);
    function Jump() {     
        console.log("Jump");  
        if (kb.pressing('w')) {
            // Set sprite's velocity upwards
            Player.vel.y = -8;
        }    
    }
    if (kb.pressing('a')) {
        // Set sprite's velocity to the left
        Player.vel.x = -5;
    }
    
    else if (kb.pressing ('d')) {    
        // Set sprite's velocity to the right
        Player.vel.x = 5;
    }
  
    else if (kb.pressing ('s')){
        // Set sprite's velocity downwards
        Player.vel.y = 5;
    }
}

function Coins() {
    coinGroup = new Group();

	for (i = 0; i < 8; i++) {

		coin = new Sprite(900*Math.random(), 900*Math.random(), 20, 'd');
		coin.vel.x = 3;
		coin.vel.y = 4;
		coin.bounciness = 1;
		coin.friction = 0;
        coin.color = 'gold'
		coinGroup.add(coin);
	}

	// if any coin in the coin group colides with the Player call func2call
	coinGroup.collides(Player, func2call);

	function func2call(coin, circle) {
		// Delete the coin that gets hit
		coin.remove();
        Score++;
    }
}
/**************************

/*******************************************************/
//  END OF APP
/*******************************************************/