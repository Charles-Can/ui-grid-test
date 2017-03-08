angular.module('gridTest')
  .config(function($routeProvider, $locationProvider) {
    $routeProvider.when('/ui-grid', {
      name: 'ui-grid',
      controller: function() {},
      template: '<my-grid></my-grid>' 
    });

    $routeProvider.when('/', {
      name: '/',
      controller: function() {},
      template: ``
    });
    $routeProvider.otherwise('/');
    $locationProvider.html5Mode(true);
  });