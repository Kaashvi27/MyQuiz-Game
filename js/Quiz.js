class Quiz {
  constructor(){}

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
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){
    //write code here to hide question elements
    //input1.hide();
    //input2.hide();
    //button.hide();
    question.hide();
    //write code to change the background color here
    background("pink");
    //write code to show a heading for showing the result of Quiz
    fill('black');
    textSize(30);
    text("The Result of The Quiz", 280, 200);
    text("-------------------------------",280,215);
    //call getContestantInfo( ) here
    Contestant.getPlayerInfo();
    
    //write condition to check if contestantInfor is not undefined
    if(allContestant!==undefined){
      var display_answers = 230;
      fill("black");
      textSize(20);
      text("*Note: Contestants who answered correct are highlighted in Green colour!",100,230);
      for(var plr in allContestant){
        var correctAns = '2';
        if(correctAns===allContestant[plr].answer)
        fill("green");
        else
        fill("red");
        display_answers+=30;
        textSize(20);
        text(allContestant[plr].name+":"+allContestant[plr].answer,250,display_answers);
      }
    }

    
  }

}
