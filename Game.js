/*******************************************************/
// Create a game
/// Written by Joseph
/*******************************************************/
	
/*******************************************************/
// setup()
/*******************************************************/
//Future Joseph put const in all caps
const Numberofplatforms = 8
//for Game height 
const GameHeight = 800;
// for the Canvas width
const GameWidth = 800;
// for the timer 
var GameTime = 30;
// for the score
var Score = 0;
// surfaces you can jump on
var Gamestate = 'start';
// Number of coins
var Coinnumber = 10;
//Images for sprites
var Coinimage;
var PlatformGrass;
//Image for background
var Background;
//Restarts game
var Restart;
function preload() {
    Coinimage = loadImage('Images/Goldcoin.png')
    PlatformGrass = loadImage('Images/GrassPlatform.png')
    Background = loadImage('Images/GameScreenBackground.jpg')
}

function setup() {
	console.log("setup: ");
	cnv = new Canvas (GameWidth,GameHeight);
    // surfaces you can jump on
    Jumpsurfaces = new Group();
    // all the sprites 
    Sprites = new Group();

    //code for Player sprite 
	Player = new Sprite( 250,250,25,25, 'd' );
	Player.color = 'cyan';
    //code for wall sprites
    wallL  = new Sprite(0, GameHeight, 8, GameHeight*2, 'k');
	wallL.color = 'black';
    wallL.bounciness = 1;
	wallRH  = new Sprite(GameWidth, 0, 8, GameHeight*2, 'k');
	wallRH.color = 'black';
    wallRH.bounciness = 1;
	wallTop = new Sprite(0, 0, GameWidth*2, 8, 'k');
	wallTop.color = 'black';
    wallTop.bounciness = 1;
	wallBot = new Sprite(0, GameHeight, GameWidth*2, 8, 'k');
	wallBot.color = 'black';
    wallBot.bounciness = 0;
    // contents of Jumpsurfaces group 
    Jumpsurfaces.add(wallBot);
    // contents of Sprites group
    Sprites.add(wallBot);
    Sprites.add(wallTop);
    Sprites.add(wallRH);
    Sprites.add(wallL);
    Sprites.add(Player);
   // Sprites.add(platforms);
    //adding Gravity 
    world.gravity.y = 10;
    //Makes sprites disappear
    Sprites.visible = false;
    restart = createButton("Restart");
    restart.position(width / 2 - 50, height / 2 + 75);
    restart.mousePressed(restartGame); // restarts game
    restart.hide(); // hides button

}
//function restartGame(){
   // background(Background);
   // Sprites.visible = true;
   // Coins();
   // platforms();
  //  Gamestate = 'running'
//}
// Function to make the platforms and make them spawn in random places 
function platforms(){
    for (i = 1; i < Numberofplatforms; i++) {

        var platformX = GameWidth * Math.random();
        var platformY = i * (GameHeight /(Numberofplatforms));
		platform = new Sprite(platformX, platformY, 100, 8, 'k');
		platform.bounciness = 0;
		platform.friction = 5;
        platform.color = 'White'
		Sprites.add(platform);
        Jumpsurfaces.add(platform);
        platform.image = (PlatformGrass);
        PlatformGrass.resize(100, 100);
        
	}

}
/*******************************************************/
// draw()
/*******************************************************/
function draw() {
	background(Background);
    if (kb.pressing('q')&& Gamestate != 'running') {
        Sprites.visible = true;
        Coins();
        platforms();
        Gamestate = 'running'
    }
    
    if (Gamestate == 'running'){
        // This is the Score
        textSize(35);
        text("Score:"+Score ,GameWidth/10-65, GameHeight/10-50);
        textSize(35);
		text("Timer:"+( GameTime - Math.floor(millis()/1000 )), GameWidth/10-70, 70);
		fill('Black');
    } else if (Gamestate == 'start') {
        text("Press Q to start",GameWidth/2,GameHeight/2)
        text("Instructions: Jump from platform to platform using WASD collect as many coins as possible before the time limit ends if you get them all good Job",GameWidth/2-GameWidth/2,GameHeight/2+GameHeight/10)
    }
    if(Math.floor(millis()/1000) >= GameTime) {
		// remove ervrything
		coinGroup.remove();
		Sprites.visible = false;
		if(Score <= Coinnumber ){
			background('pink');
			text("End Game",GameWidth/2,GameHeight/2)
            text("Your Score:"+Score,GameWidth/2-100,GameHeight/2+200)
			fill('black');
            restart.show()
        }
    }
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

	for (i = 0; i < Coinnumber; i++) {
		coin = new Sprite(GameWidth*Math.random(), GameHeight*Math.random(), 20, 'd');
		coin.vel.x = 3;
		coin.vel.y = 4;
		coin.bounciness = 1;
		coin.friction = 0;
        coin.color = 'gold'
		coinGroup.add(coin);
        coin.image = (Coinimage);
        Coinimage.resize(50, 50);
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