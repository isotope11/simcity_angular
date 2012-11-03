'use strict';

angularSimcityApp.controller('MainCtrl', function($scope, $rootScope) {
  $scope.addObject = function(x, y){
    var data = {
      action: 'add-object',
      type: 'power-plant',
      x: x,
      y: y
    };
    console.log(data);
    $rootScope.websocket.send(JSON.stringify(data));
  };
});
