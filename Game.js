class Game {
  constructor(){
    this.resetTitle = createElement("h2");
    this.resetButton = createButton("");

    this.board = createElement("h2");
    this.leader1 = createElement("h2");
    this.leader2 = createElement("h2");
  }
  
  handleElements(){
    form.hide();
    form.titleImg.position(50,50);
    form.titleImg.class("gameTitleAfterEffect");

    this.resetTitle.html("Reiniciar jogo");
    this.resetTitle.class("resetTitle");
    this.resetTitle.position(width/2,50);

    this.resetButton.class("resetButton");
    this.resetButton.position(width/2,80);

    this.board.html("Placar");
    this.board.class("resetTitle");
    this.board.position(width/2,120);

    this.leader1.class("leadersText");
    this.leader1.position(width/2,140);

    this.leader2.class("leadersText");
    this.leader2.position(width/2,150);
  }
  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })
   
  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      //coleta dados do banco de dados
      var valorPlayerRef = await database.ref('playerCount').once("value");
      if (valorPlayerRef.exists()){
        playerCount = valorPlayerRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

     car1 = createSprite(100,200);
     car1.addImage("car1",imgCar1);
     car2 = createSprite(300,200);
     car2.addImage("car2",imgCar2);
     car3 = createSprite(500,200);
     car3.addImage("car3",imgCar3);
     car4 = createSprite(700,200);
     car4.addImage("car4",imgCar4);
     grupoDeCarros = [car1,car2,car3,car4];
  }
  
    play(){
      form.hide();
      
      Player.getPlayerInfo();
      
      if(allPlayers !== undefined){
        background(rgb(198,135,103));
        image(track, 0,-displayHeight*4,displayWidth, displayHeight*5);
        
        //var display_position = 100;
        
        //index of the array
        var index = 0;
  
        //x and y position of the cars
        var x = 175 ;
        var y;
  
        for(var plr in allPlayers){
          //add 1 to the index for every loop
          index = index + 1 ;
  
          //position the cars a little away from each other in x direction
          x = x + 200;
          //use data form the database to display the cars in y direction
          y = displayHeight - allPlayers[plr].distance;
          cars[index-1].x = x;
          cars[index-1].y = y;
  
          if (index === player.index){
            cars[index - 1].shapeColor = "red";
            camera.position.x = displayWidth/2;
            camera.position.y = cars[index-1].y;
          }
         
          //textSize(15);
          //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
        }
  
      }
  
      if(keyIsDown(UP_ARROW) && player.index !== null){
        player.distance +=10
        player.update();
      }
  
      if(player.distance > 3860){
        gameState = 2;
      }
     
      drawSprites();
    }
  
    end(){
      console.log("Game Ended");
    }
}
