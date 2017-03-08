var angular = require('angular');

angular.module('gridTest', [
  require('angular-ui-grid'),
  require('angular-route'),
  'ui.grid.pinning'
])
  .component('myApp', {
    template: `
      <div class="row">
        <ul class="list-unstyled list-inline">
          <li>
            <a href="/" class="btn btn-md" ng-class="{'btn-default': !vm.isActive('/'), 'btn-primary': vm.isActive('/')}">Home</a>
            <a href="ui-grid" class="btn btn-md" ng-class="{'btn-default': !vm.isActive('ui-grid'), 'btn-primary': vm.isActive('ui-grid')}">UI Grid</a>
          </li>
        </ul>
      </div>
      <div ng-view></div>
    `,
    controller: function($route, $rootScope) {
      this.activeRoute = '/';
      $rootScope.$on('$routeChangeSuccess', ($event, cur) => {
       this.activeRoute = cur.$$route.name;
      });

      this.isActive = function(route) {
        return this.activeRoute === route;
      }
    },
    controllerAs: 'vm'
  });
require('./routes.js');
require('./grid/grid.comp.js');