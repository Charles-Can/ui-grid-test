angular.module('gridTest')
  .config(function($routeProvider, $locationProvider) {
    $routeProvider.when('/ui-grid', {
      name: 'ui-grid',
      controller: function() {},
      template: '<my-grid></my-grid>' 
    });

    $routeProvider.when('/home-brew', {
      name: 'home-brew',
      controller: function() {},
      template: `<home-brew-grid></home-brew-grid>`
    });
    $routeProvider.otherwise('/ui-grid');
    $locationProvider.html5Mode(true);
  });