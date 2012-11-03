'use strict';

// Declare app level module which depends on filters, and services
var angularSimcityApp = angular.module('angularSimcityApp', [])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }])
  .run(function($rootScope){
      $rootScope.structures = [
        //{ id: 1, x: 10, y: 20 },
        //{ id: 2, x: 30, y: 40 }
      ];
      var updateMap = function(map){
        // Update existing objects and add new ones
        map.each(function(object){
          addStructure(object);
        });
        // Remove any objects that aren't in the map any longer
        $rootScope.structures.remove(function(structure){
          return map.findIndex(function(o){ return o.id == structure.id; }) == -1;
        });

        // Notify the scope of the changes
        $rootScope.$apply();
      };
      var addStructure = function(data){
        // Map the x and y to 20x, so they're more obviously visible...
        data.x = data.x * 20;
        data.y = data.y * 20;
        var existingStructure = $rootScope.structures.find(function(s){ return s.id == data.id; });
        // First, see if this structure already exists in the structures
        if(existingStructure){
          // If he does, then merge the replacement object's properties
          Object.merge(existingStructure, data);
        } else {
          // If not, push him in.
          $rootScope.structures.push(data);
        }
      }
      //set up a websocket listener to push into this array
      var wsUri = 'ws://127.0.0.1:1234/structures';
      var websocket = new WebSocket(wsUri);
      websocket.onopen    = function(evt) { console.log('open'); console.log(evt);  };
      websocket.onclose   = function(evt) { console.log('close'); console.log(evt); };
      websocket.onmessage = function(evt) { updateMap(JSON.parse(evt.data));     };
      websocket.onerror   = function(evt) { console.log('error'); console.log(evt); };
  });
