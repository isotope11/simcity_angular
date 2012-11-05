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
      $rootScope.structures = [];
      $rootScope.mapCells = [];
      (20).times(function(x){
        (20).times(function(y){
          $rootScope.mapCells.push({ x: x, y: y });
        });
      });

      // *** TOOLBOX ***
      $rootScope.objectTypes = [
        { name: 'road', selected: true },
        { name: 'powerplant', selected: false },
        { name: 'house', selected: false },
        { name: 'garbagedump', selected: false },
        { name: 'waterpump', selected: false }
      ];
      $rootScope.selectedObject = $rootScope.objectTypes[0];
      $rootScope.setObjectType = function(o){
        $rootScope.objectTypes.each(function(ot){ ot.selected = false; });
        $rootScope.selectedObject = o;
        o.selected = true;
      };

      $rootScope.tools = [
        { name: 'build',  selected: true },
        { name: 'remove', selected: false }
      ];
      $rootScope.selectedTool = $rootScope.tools[0];
      $rootScope.setTool = function(tool){
        $rootScope.tools.each(function(tool){ tool.selected = false; });
        $rootScope.selectedTool = tool;
        tool.selected = true;
      };
      // *** END TOOLBOX ***

      // Handle incoming map messages....
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
      $rootScope.websocket = new WebSocket(wsUri);
      $rootScope.websocket.onopen    = function(evt) { console.log('open'); console.log(evt);  };
      $rootScope.websocket.onclose   = function(evt) { console.log('close'); console.log(evt); };
      $rootScope.websocket.onmessage = function(evt) { updateMap(angular.fromJson(evt.data));     };
      $rootScope.websocket.onerror   = function(evt) { console.log('error'); console.log(evt); };
  });
