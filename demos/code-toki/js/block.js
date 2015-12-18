// Knocuout part


      viewModel.actions = [];

      viewModel.isCursorValid = function(cursor){
        return cursor.x >= 0 && cursor.y >= 0 && cursor.x < viewModel.columnCount() && cursor.y < viewModel.rowCount();
      }

      viewModel.isObstacle = function(cursor){
        return viewModel.rows()[cursor.y]()[cursor.x].isObstacle.peek();
      }
      
      viewModel.tryMove = function(newCursor){
        // regular block move
        if(viewModel.isCursorValid(newCursor) && !viewModel.changeStage && !viewModel.isObstacle(newCursor) ){
          viewModel.cursor(newCursor);
        }
        // block move for change stage
        else if(viewModel.isCursorValid(newCursor) && viewModel.changeStage){
          viewModel.cursor(newCursor);
        }else{
              alert("Not a Road : Try Again");
        }
      }
      
      viewModel.run = function(actions){
        viewModel.actions = viewModel.actions.concat(actions);
      }
      
      viewModel.moveUp = function(){
        viewModel.tryMove({x: viewModel.cursor().x, y: viewModel.cursor().y - 1});
      }

      viewModel.moveRight = function(){
        viewModel.tryMove({x: viewModel.cursor().x + 1, y: viewModel.cursor().y});
      }

      viewModel.moveLeft = function(){
        viewModel.tryMove({x: viewModel.cursor().x - 1, y: viewModel.cursor().y});
      }

      viewModel.moveDown = function(){
        viewModel.tryMove({x: viewModel.cursor().x, y: viewModel.cursor().y + 1});
      }
      
      viewModel.draw = function(){
        viewModel.rows()[viewModel.cursor().y]()[viewModel.cursor().x].isFilled(true);
      }
		  
      // check the answer is correct or not
	    viewModel.isGoal = function(){
        if( viewModel.goal().x == viewModel.cursor().x && viewModel.goal().y == viewModel.cursor().y)
          alert(Blockly.JavaScript.workspaceToCode());
      }

      // reset the current stage
      viewModel.reset = function(){
        viewModel.setStageData(viewModel.currentStage);
      }

      viewModel.clickStage = function( item, event){
          viewModel.rows()[viewModel.goal().y]()[viewModel.goal().x].isGoal(false);
          viewModel.currentStage = $(event.target).parent().attr('id');
          viewModel.changeStage = true;
          viewModel.setStageData(viewModel.currentStage);
      }
      
      viewModel.setRoad = function(){

        // set all cells as obstacle
        for(var i = 0; i < viewModel.rowCount(); i++){
            for(var j = 0; j < viewModel.columnCount(); j++){
              viewModel.rows()[i]()[j].isObstacle(true);
            }
        }

        // set the road x
        if( viewModel.cursor().x <= viewModel.goal().x){
          for( var i=viewModel.cursor().x; i <= viewModel.goal().x; i++ ){
              viewModel.rows()[viewModel.goal().y]()[i].isObstacle(false);
          }
        }else{
          for( var i=viewModel.goal().x; i <= viewModel.cursor().x; i++ ){
              viewModel.rows()[viewModel.goal().y]()[i].isObstacle(false);
          }
        }

        // set the road y
        if( viewModel.cursor().y <= viewModel.goal().y){
          for( var i=viewModel.cursor().y; i <= viewModel.goal().y; i++ ){
            viewModel.rows()[i]()[viewModel.cursor().x].isObstacle(false);
          }
        }else{
          for( var i=viewModel.goal().y; i <= viewModel.cursor().y; i++ ){
            viewModel.rows()[i]()[viewModel.cursor().x].isObstacle(false);
          }
        }
       
      }



      
      // parsing blockly block to javascript in order to run the script user made
      viewModel.evaluate = function(){
         
          $.each(viewModel.rows(), function(){
            $.each(this(), function(){
              this.isFilled(false);
            });
          });
         // viewModel.cursor({x: 0, y: 0});
        

        //Running JavaScript Code
          Blockly.JavaScript.addReservedWords('code', 'viewModel');
          var code = Blockly.JavaScript.workspaceToCode();
          // code returns  "viewModel.run(['moveDown'])"
          //$("#output").html(code);
          try {
            eval(code);
          } catch (e) {
            alert(e);
          }
      }



    
    // Play animation with interval 100
    setInterval(function(){
      if(viewModel.actions.length > 0){
        var action = viewModel.actions.shift();
        viewModel[action]();
		    viewModel.isGoal();
      }
    }, 100);

    // Knockout run
    $(function () {
      ko.applyBindings(viewModel); 
    });

    


	// load Blocks with XML
	function blocklyLoaded(blockly) {
      // Called once Blockly is fully loaded.
      window.Blockly = blockly;
      
      Blockly.Xml.domToWorkspace(Blockly.mainWorkspace,$("#hiBlocks")[0]);

      Blockly.addChangeListener(function(){
        // do nothing
      });
    }



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
        
		// Block Load with Pre defined block scripts
       //blocklyLoaded(Blockly);
  }
