      var viewModel = {};

      // set stage dimension 5 X 10
      viewModel.rowCount = ko.observable(5);
      viewModel.columnCount = ko.observable(10);
      // set current stage as 0 which is not selectable by user
      viewModel.currentStage = 0;
      // set total stage count
      viewModel.stageCount = ko.observable(10);
      // set default cursor
      viewModel.cursor = ko.observable({x: 0, y: 0});
      // use boolean for changestage in order to check whether the cursor hit the obstacle
      viewModel.changeStage = false;

      //init the stage tabel cell
      var rows = [];
      for(var i = 0; i < viewModel.rowCount(); i++){
        var cells = [];
        for(var j = 0; j < viewModel.columnCount(); j++){
          var cell = {isFilled: ko.observable(false), isGoal: ko.observable(false), isObstacle: ko.observable(true)};
          cells.push(cell);
        }
        rows.push(ko.observableArray(cells));
      }
      viewModel.rows = ko.observableArray(rows);
      
      // set data for cursor and target point
      viewModel.setStageData = function(stage){

        switch(parseInt(stage)){
          case 0:
            viewModel.goal = ko.observable({x: 3, y: 0});
            for( var i=viewModel.cursor().x; i <= viewModel.goal().x; i++ ){
              viewModel.rows()[viewModel.goal().y]()[i].isObstacle(false);
            }
            break;
          case 1:
            viewModel.tryMove({x: 2, y: 1});
            viewModel.goal = ko.observable({x: 7, y: 2});
            break;
          case 2:
            viewModel.tryMove({x: 2, y: 2});
            viewModel.goal = ko.observable({x: 7, y: 4});
            break;
          case 3:
            viewModel.tryMove({x: 4, y: 1});
            viewModel.goal = ko.observable({x: 2, y: 4});
            break;
          case 4:
            viewModel.tryMove({x: 3, y: 3});
            viewModel.goal = ko.observable({x: 1, y: 1});
            break;
        }

        viewModel.rows()[viewModel.goal().y]()[viewModel.goal().x].isGoal(true);
        if( viewModel.currentStage != 0)
            viewModel.setRoad();

        viewModel.changeStage = false;
      }

      //init stage number
      var stageNumber = [];
      for(var i = 0; i < viewModel.stageCount(); i++){
        stageNumber.push({});
      }
      viewModel.stageNumber = ko.observableArray(stageNumber);
      
      //init data for the first stage
      viewModel.setStageData(viewModel.currentStage);
