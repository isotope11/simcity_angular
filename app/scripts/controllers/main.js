'use strict';

angularSimcityApp.controller('MainCtrl', function($scope, $rootScope) {
  $scope.tools = {
  };
  $scope.addObject = function(x, y){
    var data = {
      action: 'add-object',
      type: $rootScope.selectedObject().name,
      x: x,
      y: y
    };
    console.log(data);
    $rootScope.websocket.send(angular.toJson(data));
  };
});
