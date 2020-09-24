var player;
var track,car1 , car2 , car3,playerImg,fireImg,blastImg;
var canvas;
var background2;
var edge1 , edge2;
var car;
var cars;
var cars1 , cars2 , cars3;
var carsGroup , carGroup;
var lives = 4;
//var gameState = "WAIT";
var button;
var buttonImg;
var score = 0;
var gameState= "PLAY";
var speed = 60;

function preload(){
  track = loadImage("images/track.jpg");
  car1 = loadImage("images/car1.png");
  car2 = loadImage("images/car2.png");
  car3 = loadImage("images/car3.png");
  playerImg = loadImage("images/car4.png");
  ground = loadImage("images/ground.png");
  cars1 = loadImage("images/cars1.png");
  cars2 = loadImage("images/cars2.png");
  cars3 = loadImage("images/cars3.png");
  buttonImg = loadImage("images/button.png");
  bk = loadImage("images/bk.jpg");
  blastImg = loadImage("images/glass.jpg");
  fireImg = loadImage("images/fire.jpg");
  crushSound = loadSound("sound/crush.mp3");
  hornSoubd = loadSound("sound/horn.mp3")
  //bkSound = loadSound("sound/racing.mp3");
}

function setup() {
  canvas = createCanvas( 770, 800);

  background2 = createSprite(400,400,2000,1500);
  background2.addImage(track);
  background2.velocityY = 14.5;

  edge1 = createSprite(135,400,20,1500);
  edge1.visible = false;

  edge2 = createSprite(675,400,20,1500);
  edge2.visible = false;
 

  player = createSprite(200, 705,20,20);
    player.addImage(playerImg);
  
    blast  = createSprite(50,50,770,800);
    blast.addImage(blastImg);
    blast.scale=10;
    blast.visible=false;

  carGroup = createGroup();
  carsGroup = createGroup();
  fire = createSprite(player.x+50,700,20,30);
  fire.addImage(fireImg);
  fire.scale=0.3;
  fire.visible=false;

  button = createSprite(400,400,40,40);
  
  button.addImage(buttonImg);
  button.visible = false;
}

function draw() {
  background("black");
  start();
 if(gameState === "PLAY"){ 
 
   background2.velocityY = 14.5;
  if(player<700 ){
    fire.visible=true;
  }
    if(World.frameCount%5 === 0){
      speed=speed--;
    }

  
player.collide(carGroup);
player.collide(edge1);
player.collide(edge2);
spawnCars();
spawnCars2();

if(keyDown(LEFT_ARROW)){
    changePosition(-10);
}
else if(keyDown(RIGHT_ARROW)){
    changePosition(10);
}
else if(keyDown(DOWN_ARROW)){
  speed = speed-1;
  background2.velocityY=5;
}
else if(keyDown(UP_ARROW)){
  speed = speed+1;
  background2.velocityY=20;
}

if(background2.y>=1500){
  background2.y = 400;
}

if(carGroup.isTouching(player)){
  //blast.visible=true;
  crushSound.play();
  carGroup.setVelocityYEach(0);
  carsGroup.setVelocityYEach(0);
  background2.velocityY = 0;
  carGroup.setLifetimeEach(-1);
  carsGroup.setLifetimeEach(-1);
  gameState = "END";
}
if(carsGroup.isTouching(player)){
 // blast.visible=true;
 //fire.visible=true;
 carsGroup.destroyEach();
  crushSound.play();
  carsGroup.setVelocityYEach(0);
  carGroup.setVelocityYEach(0);
  background2.velocityY = 0;
  carsGroup.setLifetimeEach(-1);
  carGroup.setLifetimeEach(-1);
  gameState = "END";
}
if(player.y>685){
  player.y = 685;
  gamestate ="END";
}
if(score === 10){ 
  fill("black");
  strokeWeight(6);
  textSize(20);
  text("Level2",50,300);
//  background2.velocityY=0;
 }}
 
 
 if(gameState === "END"){
  
  carsGroup.setVelocityYEach(0);
 
  carGroup.setVelocityYEach(0);
  background2.velocityY = 0;
  player.velocityY = 0;
  carsGroup.setLifetimeEach(-1);
  carGroup.setLifetimeEach(-1);
  
}
if(keyIsDown(UP_ARROW) && gameState === "END"){
  reset();
  
  score = score;
  speed = speed;
  blast.visible=false;
  fire.visible=false;

}  
//button.mousePressed(reset());

  
drawSprites();

if(lives === 0){
  
   carsGroup.destroyEach();
   carGroup.destroyEach();
  blast.visible=true;
  speed = 0;
  score = 0;
  fill("red");
strokeWeight(6);
textSize(72);
  text("CRASH" ,300,400);
   player.destroy();
  carsGroup.setVelocityYEach(0);
  carGroup.setVelocityYEach(0);
  background2.velocityY = 0;
  player.velocityY = 0;
  carsGroup.setLifetimeEach(-1);
  carGroup.setLifetimeEach(-1);
    textSize(50);
text("GAME OVER",450,500);
 
}

fill("black");
strokeWeight(6);
textSize(20);
text("speed :"+ speed , player.x-40,player.y+60);
text("Lives left:" + lives , 650 , 250);
text("Score :" + score , 50,250);

}

function changePosition(x){
  player.x = player.x + x;
}
function spawnCars(){
  if(World.frameCount%50 === 0){
    car = createSprite(random(400,650),-200,5,5);
    car.setCollider("rectangle",0,0,60,110);
    car.scale=0.7;
    score++;
    //car.debug = true;
    car.velocityY = random(7.5 , 10);
     car.lifetime = 135;
    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: car.addImage(car1);
              break;
      case 2: car.addImage(car2);
              break;
      case 3: car.addImage(car3);
              break;
     
      default: break;
    }
     carGroup.add(car);
  }
}
function spawnCars2(){
  if(World.frameCount%50===0){
    cars = createSprite(random(140,360),-200,5,5);
    cars.setCollider("rectangle",0,0,60,110);
    //cars.debug = true;
    car.scale=0.9;
    score++;
    speed++;
    cars.velocityY = random(7.5 , 10);
    cars.lifetime = 135;
    var rand1 = Math.round(random(1,3));
    switch(rand1) {
      case 1: cars.addImage(cars1);
              break;
      case 2: cars.addImage(cars2);
              break;
      case 3: cars.addImage(cars3);
              break;
     
      default: break;
    }
    carsGroup.add(cars);
  }
}
function reset()
{
  carGroup.destroyEach();
  carsGroup.destroyEach();
gameState = "PLAY";
button.visible = false;
lives--;
}

function start(){
  if(gameState === "WAIT"){
   background(bk);
   button=createButton("Start");
   button.position(750,750);
  this.button.mousePressed(function(){
    gameState="PLAY";
  })    
  }
}