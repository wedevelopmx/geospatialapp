angular.module('maps')
  .controller('MapController', 
  	['$scope', '$log', 'MapService', function($scope, $log, MapService) {
        
        MapService.addMarkerWindow('entity', {
          options: { disableAutoPan: true },
          templateUrl: 'assets/partials/markers/info.html' 
        });

        //Pulling out all entities
        $scope.Entity.query({}, 
          function(data, headers) {
            $scope.entities = data;

            //Adding entities
            for(var i = 0; i < data.length; i ++) {
              var marker = angular.extend(data[i], {
                options: { label: String.fromCharCode(65 + i)},
                window: { show: false, name: 'entity'}
              });

              MapService.addMarker(marker);
            }

          }, function(data) {
            console.log('error');
          }
        );


        MapService.addEvent('click', function (map, eventName, originalEventArgs) {
          var e = originalEventArgs[0];
          var lat = e.latLng.lat(),lon = e.latLng.lng();
          //console.log('coo: [' + lat + ', ' + lon + ']');

          $scope.mapService.map.clickedMarker = {
            id: 6,
            options: { 
              icon: 'assets/images/blue_marker.png',
              label: { text: ' ', color: '#FFFFFF'}
            },
            coords: { 'latitude': lat, 'longitude': lon }
          };

          $scope.$evalAsync();
        });

      // navigator.geolocation.getCurrentPosition(function(pos) {
      //   $scope.$apply(function () {
      //     $scope.mapService.map.center.latitude = pos.coords.latitude;
      //     $scope.mapService.map.center.longitude = pos.coords.longitude;
      //   });
      // }, function(error) {                    
      //   alert('Unable to get location: ' + error.message);
      //   }, {
      //       enableHighAccuracy: true
      // });

  	}]
  );
