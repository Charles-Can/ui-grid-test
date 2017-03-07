var angular = require('angular');

angular.module('gridTest', [
  require('angular-ui-grid'),
  'ui.grid.pinning'
])
  .component('myApp', {
    template: `
      <div class="row">
        <div class="col-sm-6">
          <h1>Grid Test </h1>
        </div>
        <div class="col-sm-3 col-md-offset-3">
          <span class="label label-primary count pull-right">Assets {{vm.assets}} | Days {{vm.days}}</span>
        </div>
      </div> 
      <my-grid assets="vm.assets" days="vm.days"></my-grid>
    `,
    controller: function() {
      this.assets = 125;
      this.days = 90;
    },
    controllerAs: 'vm'
  });

require('./grid/grid.comp.js');