'use strict';

angularSimcityApp.controller('MainCtrl', function($scope, $rootScope) {
  $scope.executeTool = function(x, y){
    switch($rootScope.selectedTool.name){
        case 'build':
            $scope.addObject(x, y);
            break;
        case 'remove':
            $scope.removeObject(x, y);
            break;
    }
  };
  $scope.addObject = function(x, y){
      console.log($rootScope.selectedObject);
    var data = {
      action: 'add-object',
      type: $rootScope.selectedObject.name,
      x: x,
      y: y
    };
    $scope.sendMessage(data);
  };
  $scope.sendMessage = function(data){
      console.log(data);
    $rootScope.websocket.send(angular.toJson(data));
  };
  $scope.removeObject = function(x, y){
    var data = {
      action: 'remove-object',
      x: x,
      y: y
    };
    $scope.sendMessage(data);
  };
});
