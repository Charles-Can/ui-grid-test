import { AssetService } from './asset.service.js';

class GridController {
  constructor(assetService) {
    this.$inject = ['assetService']
    this.gridOptions = {
      data: [],
      enableColumnMenus: false,
      enableSorting: false,
      gridMenuShowHidColumns: false,
      columnDefs: [],
      enablePinnning: true,
      rowHeight: 45,

      //virtualized scrolling attrs
      excessColumns: 45,
      excessRows: 20
    };
    this.service = assetService;
  }

  $onInit() {
    this.service.generateAssets(this.assets, this.days)
      .then( data => {
        this.gridOptions.data = data; 
        let columnDefs = [];
        let record = data[0];

        for(let key in record) {
          let isDate = !(['assetId', 'make', 'serialNumber'].indexOf(key) >= 0 );
          let def = {
            field: key,
            width:  isDate ? 42 : 180,
            enablePinning: false
          };

          if(!isDate) {
            def.pinnedLeft = true;
            def.enablePinning = true;
          }
          if(isDate) {
            def.cellTemplate = `
              <div class="runtime">{{COL_FIELD.runningDurationSeconds}}</div>
              <div class="ratio">
                <div class="idle-ratio" ng-style="{'width' : COL_FIELD.runningDurationSeconds + '%' }"></div>
              </div>
            `;
          }
          columnDefs.push(def);
        }
        this.gridOptions.columnDefs = columnDefs;
      });
  }
}


angular.module('gridTest')
  .service('assetService', AssetService)
  .component('myGrid', {
    template: `
      <div id="grid" ui-grid="$ctrl.gridOptions" ui-grid-pinning></div>
    `,
    controller: GridController,
    bindings: {
      assets: '<',
      days: '<'
    }
  });
