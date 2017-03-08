var angular = require('angular');
require('./app.scss');

angular.module('gridTest', [
  require('angular-ui-grid'),
  require('angular-route'),
  'ui.grid.pinning'
])
  .component('myApp', {
    template: `
      <div class="container">
        <div class="row">
          <div class="col-md-5 ctrl">
            <a href="ui-grid" class="btn btn-md" ng-class="{'btn-default': !vm.isActive('ui-grid'), 'btn-primary': vm.isActive('ui-grid')}">UI Grid</a>
            <a href="home-brew" class="btn btn-md" ng-class="{'btn-default': !vm.isActive('home-brew'), 'btn-primary': vm.isActive('home-brew')}">Home Brewed Grid</a>
          </div>

          <div class="col-md-7 ctrl">
            <div class="pull-right">
              <label>Assets</label>
              <select ng-model="vm.assetCount" ng-change="vm.optionChange()">
                <option ng-repeat="num in vm.assets track by $index" value="{{num}}">{{num}}</option>
              </select>
              <label>Weeks</label>
              <select ng-model="vm.dayCount" ng-change="vm.optionChange()">
                <option ng-repeat="num in vm.days track by $index" value="{{num}}">{{num/7}} | {{num}}</option>
              </select>
            </div>
          </div>
        </div>

        <div class="row">
          <div ng-view></div>
        </div>
      </div>
    `,
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
        for(let i=1; i <= 50; i++) {
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