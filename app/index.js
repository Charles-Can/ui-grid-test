var angular = require('angular');
require('./app.scss');

angular.module('gridTest', [
  require('angular-ui-grid'),
  require('angular-route'),
  'ui.grid.pinning'
])
  .component('myApp', {
    template: require('./index.html'),
    controller: function($route, $rootScope, countService) {
      this.activeRoute = '/';
      this.dayCount = '7';
      this.assetCount = '5';
      this.days=[];
      this.assets=[];
      $rootScope.$on('$routeChangeSuccess', ($event, cur) => {
       this.activeRoute = cur.$$route.name;
      });

      this.$onInit = function() {
        countService.setCount(parseInt(this.assetCount), parseInt(this.dayCount));
        for(let i=1; i <= 70; i++) {
          this.assets.push(i * 5);
          this.days.push(i * 7);
        }
      }

      this.isActive = function(route) {
        return this.activeRoute === route;
      }

      this.optionChange = function() {
        countService.setCount(parseInt(this.assetCount), parseInt(this.dayCount));
      }
    },
    controllerAs: 'vm'
  });
require('./count.service.js');
require('./routes.js');
require('./grid/grid.comp.js');
require('./home-brew/home-brew.comp');