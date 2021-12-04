var trex, trex_running, edges;
var groundImage;
var ground;
var invisibleGround;
var cloud, cloudsGroup, cloudImage;
var obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6
var PLAY =1;
var END = 0;
var gameState = PLAY;
var obstaclesGroup;
var gameOver,gameOverImg;
var restart,restartImg;
var jumpSound,checpointSound,dieSound;
var score = 0;
var bg;
function preload(){
  trex_running = loadAnimation("nyan cat.png","nyan cat.png","nyan cat.png");
  groundImage = loadImage("ground2.png");
  cloudImage = loadImage("Nubesita.png");
  obstacle1 = loadImage ("cactus1.png");
  obstacle2 = loadImage ("cactus2.png");
  obstacle3 = loadImage ("cactus2.png");
  obstacle4 = loadImage ("cactus2.png");
  obstacle5 = loadImage ("cactus1.png");
  obstacle6 = loadImage ("cactus1.png");
 jumpSound = loadSound ("jump.mp3")
 dieSound = loadSound ("die.mp3")
 bg = loadImage ("fondo de espace.jpg")
 checkpointSound = loadSound ("checkpoint.mp3")
restartImg = loadImage ("Restartpro.png");
gameOverImg = loadImage ("gameOver.png");
}

function setup(){
              createCanvas(windowWidth,windowHeight);

              //crear sprite de Trex
              trex = createSprite(50,height-70,20,50);
              trex.addAnimation("running", trex_running);
            //para poner los bordes
              edges = createEdgeSprites();
            //para poner el fondo y piso
              ground = createSprite(width/2,height-60,width,125);
              ground.addImage("ground", groundImage);
             
             //piso invisible
             invisibleGround = createSprite (width/2,height,width,125);
             invisibleGround.visible = false;
              //agregar tamaño y posición al Trex
              trex.scale = 0.3;
              trex.x = 50;  
             cloudsGroup = new Group();
            obstaclesGroup = new Group();
             gameOver = createSprite(width/2,height/4);
             gameOver.addImage("gameOver", gameOverImg);
             restart = createSprite(width/2,height/2);
             restart.scale = 0.3
             restart.addImage("Restartpro", restartImg);
             trex.setCollider("circle",60,0,50);
             trex.debug = true
             gameOver.visible=false;
             restart.visible=false;
            }


function draw(){
             //establecer color de fondo.
            background(bg);
             if (gameState == PLAY){
              
              
              score = score + Math.round(getFrameRate()/60);
              text(score,500,100);
              if (score>0&&score%100==0){
                checkpointSound.play();
              }
              ground.velocityX = -2;
              //hacer que el Trex salte   al presionar la barra espaciadora
              if(touches.length>0||keyDown("space")&& trex.y>height/5*4){
                trex.velocityY = -20;
                jumpSound.play();
               touches = []

              }
              trex.velocityY = trex.velocityY + 0.5;
              //pra que se repita el piso
              if(ground.x<0){
              
                ground.x = 200;
              }
              spawnClouds();
              spawnObstacles();
             if (obstaclesGroup.isTouching(trex)){
                dieSound.play();
              gameState = END

             }
            }
             else if(gameState == END){
               ground.velocityX = 0;
             obstaclesGroup.setVelocityXEach(0);
              cloudsGroup.setVelocityXEach(0);
              cloudsGroup.setLifetimeEach(-1);
              obstaclesGroup.setLifetimeEach(-1);
             
              restart.x = width/2;
              gameOver.visible = true;
              restart.visible = true;
            
            }
             
             //cargar la posición Y del Trex
            //console.log(trex.y)
  
           if (touches.length>0||mousePressedOver (restart)){
             console.log("Reinicia el Juego");
           gameOver.visible = false;
           restart.visible = false;
           reset();
            touches = []
          }
            
            
            //evitar que el Trex caiga
            trex.collide(invisibleGround);
            
            drawSprites();
          }
function spawnClouds(){

if(frameCount%60 == 0){
var cloud = createSprite(width,height/4,40,10);
cloud.addImage("clouds", cloudImage);
cloud.y = Math.round(random(10,60))
cloud.velocityX = -3;
cloud.depth = trex.depth;
trex.depth = trex.depth+1;
cloud.lifetime = width;
cloudsGroup.add(cloud);
}
}

function spawnObstacles(){
  if(frameCount%80 == 0){
var obstacle = createSprite (width,height-70,10,40);
obstacle.scale = 0.5;
obstacle.velocityX = -4;
var rand = Math.round(random(1,6));
switch (rand){

  case 1: obstacle.addImage(obstacle1);
break;

case 2: obstacle.addImage(obstacle2);
break;

case 3: obstacle.addImage(obstacle3);
break;

case 4: obstacle.addImage(obstacle4);
break;

case 5: obstacle.addImage(obstacle5);
break;

case 6: obstacle.addImage(obstacle6);
break;

}
obstaclesGroup.add(obstacle);
}
}
function reset(){
gameState = PLAY
obstaclesGroup.destroyEach();
cloudsGroup.destroyEach();
score = 0
restart.x = width+200;

}