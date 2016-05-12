angular.module('maps')
  .service('MapService', ['uiGmapGoogleMapApi', function(uiGmapGoogleMapApi) {
    this.map = {
      options: { streetViewControl: false, panControl: false, maxZoom: 18, minZoom: 3 },
      center: { latitude: 22.133192430654887, longitude: -100.97379684448242 },
      zoom: 13,
      clickedMarker: { id: 6, options: { label: '0'} },
      markers: [],
      markerWindows: {},
      events: {}
    };

    this.clean = function() {
      this.map.markers = [];
    };

    this.addMarker = function(marker) {
      this.map.markers.push(marker);
    };

    this.addClickedMarker = function(marker) {
      this.map.clickedMarker = marker;
    };


    this.addMarkerWindow = function(windowName, markerWindow) {
      this.map.markerWindows[windowName] = markerWindow;
    };

    this.addEvent = function(eventName, eventFnc) {
      this.map.events[eventName] = eventFnc;
    }

    this.setCenter = function(center) {
      this.map.center = center;
    }
     
  }]);
