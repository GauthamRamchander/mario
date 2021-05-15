var mario,marioimg
var obstacleimg,bgimg,bg,brick
var brickimg,obstacle,invisibleGround
var marioimage,gameoverimg,gameover
var restartimg,restart
var gameState=1
var PLAY=1
var END=0
var score=0
function preload(){
  marioimg=loadAnimation("Jack00.png","Jack02.png","Jack03.png","Jack01.png")
  marioimage=loadAnimation("JackCollided.png")
  bgimg=loadImage("bg.png")
  brickimg=loadImage("brick.png")
  obstacleimg=loadAnimation("obstacle1.png","obstacle2.png","obstacle3.png","obstacle4.png")
  gameoverimg=loadImage("gameOver.png")
  restartimg=loadImage("restart.png")
}
function setup(){
    createCanvas(800,400)
  bg=createSprite(300,200,400,100)
  bg.addImage(bgimg)
  bgimg.resize(1600,400)
  bg.velocityX=-3

  mario=createSprite(25,300,100,100)
  mario.addAnimation("running",marioimg)
  mario.addAnimation("collided",marioimage)
  mario.scale=2.0

  gameover=createSprite(400,200,100,100)
  gameover.addImage(gameoverimg)
  gameover.visible=false

  restart=createSprite(400,250,100,100)
  restart.scale=0.5
restart.addImage(restartimg)
restart.visible=false

invisibleGround=createSprite(25,350,100,10)
invisibleGround.visible=false    

  brickGroup=new Group ()
  obstacleGroup=new Group()
  mario.debug=false
  mario.setCollider("rectangle",0,0,20,mario.height)
  score=0
}
function draw(){
  if(gameState===PLAY){
    score=score+Math.round(getFrameRate()/60)
    if(keyDown("SPACE")&&mario.y>300){
      mario.velocityY=-13
  }
  mario.velocityY+=0.5
      if(bg.x<0){
      bg.x=width/2
  }
  
  bricks()
  obstacles()
  
  if(mario.isTouching(obstacleGroup)){
      gameState=END
  }
  
}
if(mousePressedOver(restart)){
  reset()
}
mario.collide(invisibleGround)
  if(gameState===END){
      bg.velocityX=0
      brickGroup.setVelocityXEach(0)
      obstacleGroup.setVelocityXEach(0)
      gameover.visible=true
      restart.visible=true
brickGroup.setLifetimeEach(-1)
obstacleGroup.setLifetimeEach(-1)
mario.changeAnimation("collided",marioimage)

  }
  
  background("white")
      drawSprites()
      fill ("white")
      textSize(20)
      text ("Score : "+score,600,100)
}
function bricks(){
    if(frameCount%250===0){
        brick=createSprite(800,Math.round(random(150,250)))
        brick.addImage(brickimg)
        brick.lifetime=400
        brick.velocityX=-3
        brickGroup.add(brick)
    }
    }
function obstacles(){
if(frameCount%200===0){
obstacle=createSprite(800,320)
obstacle.addAnimation("biting",obstacleimg)
obstacle.lifetime=400
obstacle.velocityX=-3
obstacleGroup.add(obstacle)
}
}
function reset(){
gameState=PLAY
gameover.visible=false
restart.visible=false
mario.changeAnimation("running",marioimg)
obstacleGroup.destroyEach()
brickGroup.destroyEach()
bg.velocityX=-3
score=0
}