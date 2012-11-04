'use strict';

angularSimcityApp.controller('MainCtrl', function($scope, $rootScope) {
  $scope.tools = {
  };
  $scope.objectTypes = [
    { name: 'road', selected: true },
    { name: 'powerplant', selected: false },
    { name: 'house', selected: false },
    { name: 'garbagedump', selected: false },
    { name: 'waterpump', selected: false }
  ];
  $scope.selectedObject = function(){ return $scope.objectTypes.find(function(ot){ return ot.selected; });};
  $scope.setObjectType = function(o){
    console.log(o);
    $scope.objectTypes.each(function(ot){ ot.selected = false; });
    o.selected = true;
  };
  $scope.addObject = function(x, y){
    var data = {
      action: 'add-object',
      type: $scope.selectedObject().name,
      x: x,
      y: y
    };
    console.log(data);
    $rootScope.websocket.send(angular.toJson(data));
  };
});
