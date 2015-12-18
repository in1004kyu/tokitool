// // // // // // // // // // // // // // // // // // // // 
// // // // // // // // Knocuout part  // // // // // // // 
// // // // // // // // // // // // // // // // // // // // 
      var viewModel = {};
      viewModel.actions = [];
      viewModel.actions2 = [];

      viewModel.currentStage = 0;
      // set total stage count
      viewModel.stageCount = ko.observable(10);
      // use boolean for changestage in order to check whether the cursor hit the obstacle
      viewModel.changeStage = false;
      // set data for cursor and target point
      viewModel.setStageData = function(stage){

        switch(parseInt(stage)){
          case 0:
                answer =  "SSSSSSSSSS" +
                         "&TOOOOTTTTT" +
                         "&AOOOOOOOOA" +
                         "&VASSSSOOOO" + 
                         "&OOOOCLLGSS" + 
                         "&OOOOAVSOOO" + 
                         "&OOOVASSSSV" + 
                         "&OVAOOOOTOO" + 
                         "&OOOOOOTTOO" + 
                         "&OASSSSSOOO";
            break;
          case 1:
                answer =  "OOOOOOOOOO" +
                         "&OOOOOOOOOO" +
                         "&OOOOOOOOOO" +
                         "&OOOOOOOOOO" + 
                         "&OOOOCLLLOO" + 
                         "&OOOOOOOLOO" + 
                         "&OOOOOOOGOO" + 
                         "&OOOOOOOOOO" + 
                         "&OOOOOOOOOO" + 
                         "&OOOOOOOOOO";
            break;
          case 2:
                answer =  "OOOOOOOOOO" +
                         "&OOOOOOOOOO" +
                         "&OOOOOOOOOO" +
                         "&OOOOOOOOOO" + 
                         "&OOOOCLLLOO" + 
                         "&OOOOOOOLOO" + 
                         "&OOOOOOOLGO" + 
                         "&OOOOOOOOOO" + 
                         "&OOOOOOOOOO" + 
                         "&OOOOOOOOOO";
            break;
          case 3:
                answer =  "OOOOOOOOOO" +
                         "&OOOOOOOOOO" +
                         "&OOOGLLLOOO" +
                         "&OOOOOOLOOO" +
                         "&OOOOOLLOOO" +
                         "&OOOOOOCOOO" +
                         "&OOOOOOOOOO" + 
                         "&OOOOOOOOOO" + 
                         "&OOOOOOOOOO" + 
                         "&OOOOOOOOOO";

            break;
          case 4:
                answer =  "OOOOOOOOOO" +
                         "&OOOOOOOOOO" +
                         "&OOOOGOOOOO" +
                         "&OOOOLLOCOO" +
                         "&OOOOOLLLOO" +
                         "&OOOOOOOOOO" + 
                         "&OOOOOOOOOO" + 
                         "&OOOOOOOOOO" + 
                         "&OOOOOOOOOO" + 
                         "&OOOOOOOOOO";

               nodeData = [
                  {id: 1, label: 'down', title: 'MoveDown', block: 'moveDown' },
                  {id: 2, label: 'loop', title: 'Instant Condition', block: 'loop', image: './img/goalIdle.gif' },
                  {id: 3, label: 'left', title: 'moveLeft', block: 'moveLeft' },
                  {id: 4, label: 'Auto', title: 'Instant Condition', block: 'auto', image: './img/goalIdle.gif' },
                  {id: 5, label: 'up', title: 'MoveUp', block: 'moveUp' },
                  {id: 6, label: 'Auto', title: 'Instant Condition', block: 'auto', image: './img/goalIdle.gif' },
                  {id: 7, label: 'left', title: 'MoveLeft', block: 'moveLeft' }

              ];

               edgeData = [
                  {id: 'eF1T6', from: 1, to: 6, arrows: { to: {enabled: false} }, length:10 },
                  {id: 'eF6T7', from: 6, to: 7 },
                  {id: 'eF7T2', from: 7, to: 2, arrows: { to: {enabled: false} }, length:10 },
                  {id: 'eF2T3', from: 2, to: 3 },
                  {id: 'eF3T4', from: 3, to: 4, arrows: { to: {enabled: false} }, length:10  },
                  {id: 'eF4T5', from: 4, to: 5 },
                  {id: 'eF5T2', from: 5, to: 2 }
              ];

              currentNodeId = 7;
              currentCondId = 6;
              draw();
              break;
        }
        
        if( viewModel.currentStage != 0){
          createjs.Ticker.removeEventListener("tick", tickStart);
          drawBoard();
          startGame();
        }

        viewModel.changeStage = false;
      };

      //init stage number
      var stageNumber = [];
      for(var i = 0; i < viewModel.stageCount(); i++){
        stageNumber.push({});
      }
      viewModel.stageNumber = ko.observableArray(stageNumber);  
      //init data for the first stage
      viewModel.setStageData(viewModel.currentStage);

      viewModel.clickStage = function( item, event){
          viewModel.currentStage = $(event.target).parent().attr('id');
          viewModel.changeStage = true;
          viewModel.setStageData(viewModel.currentStage);
      };

      viewModel.run = function(actions){
        viewModel.actions = viewModel.actions.concat(actions);
      };
      


      // Node Actions
      viewModel.moveUp = function(){
        upKeyDown = true;
      };

      viewModel.moveRight = function(){
        rightKeyDown = true;
      };

      viewModel.moveLeft = function(){
        leftKeyDown = true;
      };

      viewModel.moveDown = function(){
        downKeyDown = true;
      };
      
      viewModel.draw = function(){
       
      };
      // Node Actions


      // Node Conditions
      viewModel.auto = function(){
        //do nothing
        console.log("Node Condition : auto");
      };

      viewModel.instant = function(){
        //do nothing
        console.log("Node Condition : auto");
      };

      viewModel.loop = function(){
        //do nothing
        console.log("Node Condition : loop");
      };

      // parsing blockly block to javascript in order to run the script user made
      viewModel.evaluate = function(){
        //Running JavaScript Code
          Blockly.JavaScript.addReservedWords('code', 'viewModel');
          var code = Blockly.JavaScript.workspaceToCode();


// for vis js version
          viewModel.actions2;
          var firstNodeIndices = network.nodesHandler.body.nodeIndices[0];
          var cursor = network.nodesHandler.body.nodes[firstNodeIndices];
          var cursorStack = [cursor];
          var selfLoop = false;
          var innerNode = true;

          while( cursorStack.length > 0 && !selfLoop && innerNode )
          {
              cursor = cursorStack.pop();
              var nodeDataBlock = cursor.options.block;
              var nodeEdges = cursor.edges;

              // cycle detect by searching node id on the viewModel.actions2 array
              // if exists, it indicated there exists a cycle, so break the while loop
              var result = $.grep(viewModel.actions2, function(e){ return e.id == cursor.id; });

              if( result.length >= 2)
                  break;
              else{
                  viewModel.actions2.push({"id":cursor.id, "block" : nodeDataBlock});
              }



              // cursor change to next node
              for( var i=0; i < nodeEdges.length; i++)
              {
                  console.log( "Cursor : " + cursor.id + " // From : "  + nodeEdges[i].fromId + " // To : " + nodeEdges[i].toId);
                  // has outdegree( possibly innerNode ) guarantee
                  if( nodeEdges[i].fromId == cursor.id && nodeEdges[i].toId != cursor.id ){
                      cursorStack.push(nodeEdges[i].to);
                  }
                  // has indegree( possibly innerNode ) or last node
                  else if( nodeEdges[i].fromId != cursor.id && nodeEdges[i].toId == cursor.id ){
                      console.log("Inner Node Or Last Node");
                      innerNode = false;
                      var connectedEdges = network.getConnectedEdges(cursor.id);
                      for( var j=0; j < connectedEdges.length; j++ ){
                          // check if the outdegree of the cursor exists
                          // each edgeId is composed such 'eF1T2', F indicates from and T indicates to
                          // and if the third character is same as the cursor, then it means outdegree is at least more than one as well as the cursor is an innerNode
                          // the Last Node( lead ) has outdegree as 0
                          if( connectedEdges[j].charAt(2) == cursor.id){
                              innerNode = true;
                          }
                      }
                  }
                  // self loop check
                  else if( nodeEdges[i].fromId == cursor.id && nodeEdges[i].toId == cursor.id ){
                      selfLoop = true;
                      console.log("selfLoop True")
                  }
                  else{
                      console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
                      viewModel.actions2.push({"id":cursor.id, "block" : nodeDataBlock});
                      cursor = null;
                      break;
                  }
              }

              // if there exist at least more than one block on the stack, then set "innerNode" as true
              // in order to read rest of nodes on the stack
              // this possibly indicates there exists a node in which the outdegree is more than 2
              if( cursorStack.length >= 0 )
                    innerNode = true;
          }

          viewModel.actions2.removeAll("auto");
          viewModel.actions2.removeAll("loop");
          console.log(viewModel.actions2);

          try {
            eval(code);
          } catch (e) {
            alert(e);
          }
      };



    viewModel.readBlock = function(){
        rightKeyDown = false;
        leftKeyDown = false;
        upKeyDown = false;
        downKeyDown = false;

        if(viewModel.actions2.length > 0){
          var action = viewModel.actions2.shift();
          console.log("Node Id : " + action.id + " Block : " + action.block);
          if( action.block == "instant"){
              // skip the following block and consume instant as well
              if(viewModel.actions2.length > 0){
                  action = viewModel.actions2.shift();
              }
          }
          else if( action.block == "auto" || action.block == "loop" ){
              // just consume "auto" block
              if(viewModel.actions2.length > 0){
                  action = viewModel.actions2.shift();
                  network.selectNodes([action.id]);
                  viewModel[action.block]();
              }
          }
          else if( action.block == "timeout"){
             // clear Interval event first
             stopInterval();
             // wait 3sec and set Interval again to read rest of the blocks
             window.setTimeout( function(){
                intervalId = setInterval( viewModel.readBlock ,1000)
             },3000)

          }else{
              network.selectNodes([action.id]);
              viewModel[action.block]();
          }

        }
    }

    var intervalId = setInterval( viewModel.readBlock ,1000);
    // Play animation with interval 100
    function stopInterval() {
      clearInterval(intervalId);
    }

    // Knockout run
    $(function () {
      ko.applyBindings(viewModel); 
    });

    

// // // // // // // // // // // // // // // // // // // //
// // // // // // // // BLOCKLY part  // // // // // // //
// // // // // // // // // // // // // // // // // // // //

	function getInit(imageSuffix){
        return function() {
          this.setColour(65);
          this.appendValueInput("NEXTACTIONS")
              .setCheck("ACTIONS")
              .setAlign(Blockly.ALIGN_CENTRE)
              .appendField(new Blockly.FieldImage("./img/GraphProgramming" + imageSuffix + ".png", 25, 35, "*"));
          this.setOutput(true, "ACTIONS");
		 }
   }

	function getCode(block, name){

		var value_nextactions = Blockly.JavaScript.valueToCode(block, 'NEXTACTIONS', Blockly.JavaScript.ORDER_NONE);
		if(value_nextactions === ""){
			var code = "viewModel.run(['" + name + "'])";
        } else {
			var code = "viewModel.run(['" + name + "', " + value_nextactions.substring(15);
        }
        return [code, Blockly.JavaScript.ORDER_ATOMIC];
    }


    // Block Generation Part
    function init() {

		    // Block Definition and Load
		    Blockly.Blocks.gpp_move_up = {
			       init: getInit("Up")
        };

        Blockly.Blocks.gpp_move_right = {
			       init: getInit("Right")
        };

        Blockly.Blocks.gpp_move_left = {
            init: getInit("Left")
        };

        Blockly.Blocks.gpp_move_down = {
            init: getInit("Down")
        };

        Blockly.Blocks.gpp_draw = {
            init: getInit("Draw")
        };

		    // Block Generator to JS( JS Interpreter )
        Blockly.JavaScript.gpp_move_up = function(block) {
			   return getCode(block, "moveUp");
        };

        Blockly.JavaScript.gpp_move_down = function(block) {
			   return getCode(block, "moveDown");
        };

        Blockly.JavaScript.gpp_move_right = function(block) {
			   return getCode(block, "moveRight");
        };

        Blockly.JavaScript.gpp_move_left = function(block) {
			   return getCode(block, "moveLeft");
        };

        Blockly.JavaScript.gpp_draw = function(block) {
			   return getCode(block, "draw");
        };

		    // Blocktool Inject to Target Div
        Blockly.inject(document.getElementById("custom_block"), {trashcan:true,  toolbox: document.getElementById('toolbox')});

        stage = new createjs.Stage("canvas");
        drawBoard();
        startGame();
  }


      
// // // // // // // // // // // // // // // // // // // // 
// // // // // // // // CANVAS part  // // // // // // // 
// // // // // // // // // // // // // // // // // // // // 

const ARROW_KEY_LEFT = 37;
const ARROW_KEY_UP = 38;
const ARROW_KEY_RIGHT = 39;
const ARROW_KEY_DOWN = 40;
const CELL_WIDTH = 40;
const CELL_HEIGHT = 40;
var goal, character, stage, gameOverTxt, win;
var leftKeyDown, rightKeyDown, upKeyDown, downKeyDown = false;
var roadPosX = [];
var roadPosY = [];
var obstaclePos = [];
var answer;


function drawBoard() {
    // the next line is for change stage so remove all children in order to re render
    stage.removeAllChildren();

    var backgroundImage = './img/background.png';
    background = new createjs.Bitmap(backgroundImage);
    stage.addChild(background);

    var tile = new Image();
    tile.src = './img/tiles.png';
    
    var data = {
            images: [tile],
            frames: {width:40, height:40},
            animations: {
                'stoneBlock': [3],
                'triangle': [8],
                'stoneTriangle': [15],
                'woodTriangle': [16],
                'woodBlock': [19]
            }
    }
    var spritesheet = new createjs.SpriteSheet(data);

    roadPosX = [];
    roadPosY = [];
    obstaclePos = [];

    var i, char, box;
    var xPos = 0;
    var yPos = 0;
    for (i = 0; i < answer.length; i++) {
        char = answer[i];
        if (char != ' ' && char != '&') {

            if(char == 'L')
            {
                road = new createjs.Shape();
                road.graphics.drawRect(0, 0, CELL_WIDTH, CELL_HEIGHT);
                road.regX = 0;
                road.regY = 0;
                road.x = xPos;
                road.y = yPos;
                roadPosX.push(road.x);
                roadPosY.push(road.y);
                road.name = 'road';
                road.key = char;
                stage.addChild(road);

            }else if(char == 'G'){
                var goalImage = './img/goalIdle2.gif';
                goal = new createjs.Bitmap(goalImage);
                goal.regX = 0;
                goal.regY = 0;
                goal.x = xPos;
                goal.y = yPos;
                goal.name = 'goal';
                goal.key = char;
                stage.addChild(goal);

            }else if(char == 'C'){

                var characterImage = './img/small_static_avatar.png';
                character = new createjs.Bitmap(characterImage);
                character.regX = 0;
                character.regY = 0;
                character.x = character.nextX = xPos;
                character.y = character.nextY = yPos;
                character.width = CELL_WIDTH;
                character.height = CELL_HEIGHT;
                character.name = 'character';
                character.key = char;
                stage.addChild(character);

                //handle keys
                window.onkeydown = moveCharacter;
                window.onkeyup = stopCharacter;

            }else if(char == 'S'){
                 var box = new createjs.Sprite(spritesheet, 'stoneBlock');
                 box.x = xPos;
                 box.y = yPos;
                 obstaclePos.push(box.x+"_"+box.y);
                 stage.addChild(box);
            }else if(char == 'T'){
                 var box = new createjs.Sprite(spritesheet, 'triangle');
                 box.x = xPos;
                 box.y = yPos;
                 obstaclePos.push(box.x+"_"+box.y);
                 stage.addChild(box);
            }else if(char == 'A'){
                 var box = new createjs.Sprite(spritesheet, 'stoneTriangle');
                 box.x = xPos;
                 box.y = yPos;
                 obstaclePos.push(box.x+"_"+box.y);
                 stage.addChild(box);
            }else if(char == 'V'){
                 var box = new createjs.Sprite(spritesheet, 'woodTriangle');
                 box.x = xPos;
                 box.y = yPos;
                 obstaclePos.push(box.x+"_"+box.y);
                 stage.addChild(box);
            }
            else{
                var box = new createjs.Sprite(spritesheet, 'woodBlock');
                 box.x = xPos;
                 box.y = yPos;
                 obstaclePos.push(box.x+"_"+box.y);
                 stage.addChild(box);
            }        
        }
        xPos += CELL_WIDTH;
        if (char == '&') {
            yPos += CELL_HEIGHT;
            xPos = 0;
        }
    }
}


function update() {
   var nextX = character.x;
   var nextY = character.y;
   if (leftKeyDown) {
      nextX = character.x - 1;
      
      if( obstaclePos.indexOf((nextX-CELL_WIDTH+1)+"_"+nextY) >= 0 ){ 
        leftKeyDown = false;
        nextX = character.x;
      }
      if( roadPosX.indexOf(nextX) >= 0 ){
        leftKeyDown = false;
      }
      if(nextX < 0){
          nextX = 0; 
      }
   }
   else if (rightKeyDown) {
      nextX = character.x + 1;

      if( obstaclePos.indexOf((nextX+CELL_WIDTH-1)+"_"+nextY) >= 0 ){ 
        rightKeyDown = false;
        nextX = character.x;
      }
      if( roadPosX.indexOf(nextX) >= 0 ){
        rightKeyDown = false;
      }
      if(nextX > stage.canvas.width - character.width){
         nextX = stage.canvas.width - character.width;
      } 

   }
   else if (upKeyDown) {
      nextY = character.y - 1;
      
      if( obstaclePos.indexOf(nextX+"_"+(nextY-CELL_WIDTH+1)) >= 0 ){ 
        upKeyDown = false;
        nextY = character.y;
      }
      if( roadPosY.indexOf(nextY) >= 0 ){
        upKeyDown = false;
      }
      if(nextY < 0){
          nextY = 0; 
      }
   }
   else if (downKeyDown) {
      nextY = character.y + 1;
      
      if( obstaclePos.indexOf(nextX+"_"+(nextY+CELL_WIDTH-1)) >= 0 ){ 
        downKeyDown = false;
        nextY = character.y;
      }
      if( roadPosY.indexOf(nextY) >= 0 ){
        downKeyDown = false;
      }
      if(nextY > stage.canvas.height - character.height){
         nextY = stage.canvas.height - character.height;
      }
   }
   character.nextX = nextX;
   character.nextY = nextY;
}

function render() {
   character.x = character.nextX;
   character.y = character.nextY;
   checkGame();
}

function startGame() {
    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", tickStart);
}

function checkGame() {

    if ( character.x == goal.x && character.y == goal.y ) {
        gameOver();
        win = true;
    }
}

function gameOver() {
    if( win ){
      stage.removeAllChildren();
      var msg = "Good job!";
      gameOverTxt = new createjs.Text(msg, "36px Arial");
      gameOverTxt.color = 'blue';
      gameOverTxt.textAlign = 'center';
      gameOverTxt.textBaseline = 'middle';
      gameOverTxt.x = stage.canvas.width / 2;
      gameOverTxt.y = stage.canvas.height / 2;
      stage.addChild(gameOverTxt);
    }
}

function tickStart(e) {
      if (!e.paused) {
         update();
         render();
         stage.update();
      } 
}







function moveCharacter(e) {
   e = !e ? window.event : e;
   switch (e.keyCode) {
      case ARROW_KEY_LEFT:
         leftKeyDown = true;
         break;
      case ARROW_KEY_RIGHT:
         rightKeyDown = true;
         break;
      case ARROW_KEY_UP:
         upKeyDown = true;
         break;
      case ARROW_KEY_DOWN:
         downKeyDown = true;
         break;
    } 
}

function stopCharacter(e) {
   e = !e ? window.event : e;
   switch (e.keyCode) {
      case 37:
         leftKeyDown = false;
         break;
      case 38:
         upKeyDown = false;
         break;
      case 39:
         rightKeyDown = false;
         break; 
      case 40:
         downKeyDown = false;
         break;
    }
}





