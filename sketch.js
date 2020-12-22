var gameState = "play";
var towerImage,tower;
var door,doorImage,doorsGroup;
var climber,climberImage,climbersGroup;
var ghost,ghostImage;
var ig,igg;
function preload(){
  
towerImage = loadImage("tower.png");

doorImage = loadImage("door.png");
  
climberImage = loadImage("climber.png");
  
ghostImage = loadImage("ghost-standing.png");
}

function setup(){
createCanvas(600,600);


tower = createSprite(300,450,400,400);
tower.addImage(towerImage);
tower.velocityY = 1;
  
ghost = createSprite(200,200,20,20);
ghost.addImage(ghostImage);
ghost.scale = 0.3;


doorsGroup = createGroup();
climbersGroup = createGroup();
igg = createGroup();
}

function draw(){
background("black");
 
if (gameState === "play"){
 if(keyDown("space")){
   ghost.velocityY = -8;
 }

  if(keyDown("LEFT_ARROW")){
    ghost.x = ghost.x-5;
  }
  
   if(keyDown("RIGHT_ARROW")){
    ghost.x = ghost.x+5;
  }
  
ghost.velocityY = ghost.velocityY + 0.8;

if(tower.y > 400){
  tower.y = 300;
}
  spawndoors();
  
  if(ghost.y> 600 || igg.isTouching(ghost)){
    gameState = "end";
    ghost.destroy();
   tower.destroy();
    
  }
  if(climbersGroup.isTouching(ghost)){
    ghost.velocityY = 0;
  }
}
  
  drawSprites();
  if(gameState === "end"){
    textSize(30);
    fill("yellow");
    text("gameover :", 230,250);
   doorsGroup.destroyEach();
    climbersGroup.destroyEach();
  }
}

function spawndoors(){
  if(World.frameCount % 240 === 0){
    door = createSprite(300,-50);
    door.addImage(doorImage);
    door.velocityY = 1;
    door.x = Math.round(random(200,400));
    door.lifetime = 800; 
    doorsGroup.add(door);
    door.depth = ghost.depth;
    ghost.depth+= 1;
    
    
    climber = createSprite(300,20)
    climber.addImage(climberImage);
    climber.velocityY = 1;
    climber.x = door.x;
    climber.lifetime = 800;
    climbersGroup.add(climber);
    
    ig = createSprite(200,30,20,5)
    ig.width = climber.width;
    ig.x = climber.x;
    ig.lifetime = 800;
    ig.velocityY = 1;
    ig.visible = false;
    igg.add(ig);
  }
}

