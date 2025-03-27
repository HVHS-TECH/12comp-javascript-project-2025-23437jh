/*******************************************************/
// Create a game
/// Written by Joseph
/*******************************************************/
	
/*******************************************************/
// setup()
/*******************************************************/
const Numberofplatforms = 8
//for Game height 
const GameHeight = 800;
// for the Canvas width
const GameWidth = 800;
// for the timer 
var GameTime = 1000000;
// for the score
var Score = 0;
// surfaces you can jump on
var Gamestate = 'start';

//var imgBG,imgFace;
var Coinimage;
var PlatformGrass;
var Background;
function preload() {
    Coinimage = loadImage('Images/Goldcoin.png')
    PlatformGrass = loadImage('Images/GrassPlatform.png')
    Background = loadImage('Images/GameScreenBackground.png')
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

}

function platforms(){
    for (i = 1; i < Numberofplatforms; i++) {

        var platformX = GameWidth * Math.random();
        var platfromY = i * (GameHeight /(Numberofplatforms));
		platform = new Sprite(platformX, platfromY, 100, 8, 'k');
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
        text("Score:"+Score ,GameWidth/10-50, GameHeight/10-35);
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
		if(Score <= 8 ){
			background('red');
			text("GAME OVER!!!!!!",GameWidth/2,GameHeight/2)
            text("Your Score:"+Score,GameWidth/2-100,GameHeight/2+200)
			fill('black');
        }
    }
    //KeyBoard controls   
    Player.colliding(Jumpsurfaces, Jump);
    function Jump() {     
        console.log("Jump");  
        if (kb.pressing('w')) {
            // Set sprite's velocity upwards
            Player.vel.y = -12;
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