var PLAY = 1;
var FIM = 0;
var estadodojogo = PLAY;
var trex, trex_running,trex_collided;
var ground, groundImage;
var cloud, cloudsGroup, cloudImage; 
var score = 0;
var gameOver, restart;
var obstacle, obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
//function setup: cria as coisas na tela
function preload() 
{
    trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
    trex_collided = loadAnimation("trex_collided.png");
    groundImage = loadImage ("ground2.png");
    cloudImage = loadImage ("cloud.png");

    obstacle1 = loadImage ("obstacle1.png");
    obstacle2 = loadImage ("obstacle2.png");
    obstacle3 = loadImage ("obstacle3.png");
    obstacle4 = loadImage ("obstacle4.png");
    obstacle5 = loadImage ("obstacle5.png");
    obstacle6 = loadImage ("obstacle6.png");

    gameOverImg = loadImage ("gameOver.png");
    restartImg = loadImage ("restart.png");
}




function setup () 
 { 
    createCanvas (400,300);
    trex = createSprite (50,160,20,50);
    trex.addAnimation ("running",trex_running);
    trex.addAnimation("collided", trex_collided);
    trex.scale = 0.5;
    ground = createSprite (200,280,400,10);
    ground.addImage ("ground",groundImage);
   // ground.velocityX = -2;
    //ground.x = ground.width/2;
    ground.velocityX = -(6 + 3*score/100);
    gameOver = createSprite (300,100,10,10);
    gameOver.addImage (gameOverImg);
    restart = createSprite (300,100,10,10);
    restart.addImage (restartImg);
    gameOver.visible = false;
    restart.visible = false;
    cloudsGroup = new Group ();
    obstaclesGroup = new Group ();
 }
 function draw () {
    background("#C0C0C0");
    if (estadodojogo === PLAY) {
      ground.velocityX = -(6 + 3*score/100);
      trex.changeAnimation ("running",trex_running);  
    if (keyDown("space") && trex.y >= 200) 
    {
       trex.velocityY= -12;
    }
    
    trex.velocityY=trex.velocityY+0.8;

    if (ground.x < 0) 
    {
      ground.x = ground.width/2;
    }

    trex.collide (ground) 
    spawnClouds();
    spawnObstacles();
    
    if (obstaclesGroup.isTouching (trex) ) {
    estadodojogo = FIM;
    }
   }
   else if (estadodojogo === FIM) {
     gameOver.visible = true;
     restart.visible = true;
     
     //defina a velocidade de cada objeto do jogo para 0
     ground.velocityX = 0;
     trex.velocityY = 0;
     obstaclesGroup.setVelocityXEach(0);
     cloudsGroup.setVelocityXEach(0);
      //mude a animação de trex 
    trex.changeAnimation("collided",trex_collided);
    
    //defina o tempo de vida dos objetos do jogo para que eles não sejam destruídos
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    
    }
    drawSprites();
    } 

   
    
//function preload: carrega todos os arquivos

function spawnClouds() 
{ 
   if (frameCount% 60 === 0) 
   {
      var cloud = createSprite (600,100,40,10);
      cloud.addImage (cloudImage)
      cloud.y = Math.round (random (10,100));
      cloud.scale = 1;
      cloud.velocityX = -3; 
   }
}
function spawnObstacles () 
{
   if (frameCount% 60 === 0) 
   {
      var obstacle = createSprite (600,260,10,40);
      obstacle.velocityX =- (6+3*score/100);
      var randomm = Math.round (random (1,6));
      switch (randomm) 
      {
         case 1: obstacle.addImage (obstacle1);
         break;
         case 2: obstacle.addImage (obstacle2);
         break;
         case 3: obstacle.addImage (obstacle3);
         break;
         case 4: obstacle.addImage (obstacle4);
         break;
         case 5: obstacle.addImage (obstacle5);
         break;
         case 6: obstacle.addImage (obstacle6);
         break;
         default:
         break; 
      }
         obstacle.scale = 0.5;
         obstaclesGroup.add (obstacle);
       } 
   }
