var PLAY = 1
var END = 0
var gameState = PLAY

var bg, bgImg
var bottomGround
var topGround
var balloon, balloonImg
var obstacle1, obstacle1Img, obstacle2, obstacle2Img, obstacle3, obstacle3Img, obstacle4
var score = 0
var gameOver, gameOverImg, restart, restartImg

function preload(){
bgImg = loadImage("assets/bg.png")

balloonImg = loadAnimation("assets/balloon1.png","assets/balloon2.png","assets/balloon3.png")


obstacle1Img = loadImage("assets/obsBottom1.png")
obstacle2Img = loadImage("assets/obsBottom2.png")
obstacle3Img = loadImage("assets/obsBottom3.png")
obstacle4Img = loadImage("assets/obsTop1.png")
gameOverImg = loadImage("assets/gameOver.png")
restartImg = loadImage("assets/restart.png")
}
function setup(){
createCanvas(650,400)
//background image
bg = createSprite(465,485,1,1);
bg.addImage(bgImg);
bg.scale = 1.3

//creating top and bottom grounds
bottomGround = createSprite(200,390,800,20);
bottomGround.visible = false;

topGround = createSprite(200,10,800,20);
topGround.visible = false;
      
//creating balloon     
balloon = createSprite(100,200,20,50);
balloon.addAnimation("balloon",balloonImg);
balloon.scale = 0.2;
balloon.debug = true
//balloon.setCollider("rectangle",0,0,20,40,-25)

obstacleBottomGroup = new Group()
obstacleTopGroup = new Group()

gameOver = createSprite(300,150)
gameOver.addImage(gameOverImg)

restart = createSprite(300,200)
restart.addImage(restartImg)

gameOver.scale = 0.5
restart.scale = 0.5

gameOver.visible = false
restart.visible = false


}

function draw() {
  
  background("black");
 // text("Score: "+ score, 570,30);
  if (gameState === PLAY){
          //making the hot air balloon jump
          if(keyDown("space")) {
            balloon.velocityY = -6 ;
            
          }

              //scoring
    score = score + Math.round(getFrameRate()/60);
    if(score>0 && score%100 === 0){
        //increasing speed

    }
    
    

          //adding gravity
           balloon.velocityY = balloon.velocityY + 1;

          bg.velocityX = -4
          if (bg.x < -5){
            bg.x = bg.width/2;
          }
          spawnBottomObstacles()
          spawnTopObstacles()

          if (obstacleTopGroup.isTouching(balloon) || obstacleBottomGroup.isTouching(balloon)){
            console.log("game over")
            gameState = END
          }
        
        }
          else if (gameState === END){
            gameOver.visible = true
            restart.visible = true

            balloon.velocity=0
            balloon.velocity=0
            bg.velocity = 0
            obstacleBottomGroup.setVelocityEach = 0
            obstacleTopGroup.setVelocityEach = 0
          

          if(mousePressedOver(restart)) {
            console.log("mouse pressed over")
            reset()
          }}

          drawSprites();
      }
function spawnBottomObstacles(){
  if (frameCount % 90 === 0){
    var obstacle = createSprite(690,300,10,40);
    obstacle.velocityX = -3;
     //generate random obstacles
     var rand = Math.round(random(1,3));
     switch(rand) {
       case 1: obstacle.addImage(obstacle1Img);
               break;
       case 2: obstacle.addImage(obstacle2Img);
               break;
       case 3: obstacle.addImage(obstacle3Img);
               break;
       default: break;               
     }
     obstacle.scale = 0.1
     obstacle.lifetime = 750
     obstacleBottomGroup.add(obstacle)
}}

function spawnTopObstacles(){
  if (frameCount % 150 === 0){
    var bird = createSprite(690,300,10,40);
    bird.y = Math.round(random(20,100));
    bird.velocityX = -3;
    bird.addImage(obstacle4Img)
     bird.scale = 0.1
     bird.lifetime = 750
    obstacleTopGroup.add(bird)
}}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstacleBottomGroup.destroyEach();
  obstacleTopGroup.destroyEach();
  
}