var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;

const database = firebase.database();

var form, player, game;
var car1,car2,car3,car4,grupoDeCarros;
var imgCar1,imgCar2,imgCar3,imgCar4,imgGround,imgTrack;

function preload(){
  imgCar1 = loadImage("images/car1.png");
  imgCar2 = loadImage("images/car2.png");
  imgCar3 = loadImage("images/car3.png");
  imgCar4 = loadImage("images/car4.png");
  imgGround = loadImage("images/ground.png");
  imgTrack = loadImage("images/track.jpg");
}

function setup(){
  canvas = createCanvas(displayWidth-20,displayHeight-20);
  
  game = new Game();
  game.getState();
  game.start();
}


function draw(){
  if (playerCount === 4){
    game.uptade(1);
  }
  if (gameState === 1){
    game.play();
  //adicionar clear
  }
}
