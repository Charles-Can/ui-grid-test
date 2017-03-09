import { AssetService } from '../asset.service.js';
require('./index.scss');

class GridController {
  constructor(assetService, countService) {
    this.countService = countService;
    this.sub;
    this.days;
    this.assets;
    this.$inject = ['assetService']
    this.gridOptions = {
      data: [],
      enableColumnMenus: false,
      enableSorting: false,
      gridMenuShowHidColumns: false,
      columnDefs: [],
      enablePinnning: true,
      rowHeight: 50,

      //virtualized scrolling attrs
      excessColumns: 10,
      excessRows: 10
    };
    this.service = assetService;
  }

  $onInit() {
    this.sub = this.countService.subscribe( count => {
      this.assets = count.assets;
      this.days = count.days;
      this.getAssets();
    });
  }

  getAssets() {
    this.service.generateAssets(this.assets, this.days)
      .then( data => {
        
        this.gridOptions.data = this.formatData(data); 
        let columnDefs = [];
        let record = this.gridOptions.data[0];

        for(let key in record) {
          let skip = (['assetId', 'make', 'serialNumber'].indexOf(key) >= 0 );
          let isDate = !(['assetId', 'make', 'serialNumber', 'info'].indexOf(key) >= 0 );
          let def = {
            field: key,
            width:  isDate ? 42 : 325,
            enablePinning: false
          };

          if(skip) continue;

          if(!isDate) {
            def.name = '';
            def.pinnedLeft = true;
            def.enablePinning = true;
            def.cellTemplate = `
              <div>
                <img class="icon" ng-src="{{COL_FIELD.icon}}" />
                <ul class="list-unstyled asset-info">
                  <li>{{COL_FIELD.assetId}}</li>
                  <li>{{COL_FIELD.serialNumber}}</li>
                  <li>{{COL_FIELD.make}}</li>
                  <li>Custom State</li>                  
                </ul>
              </div>
            `;
          }
          if(isDate) {
            def.cellTemplate = `
              <a class="runtime" href="#">
                {{COL_FIELD.runningDurationSeconds}}
              </a>
            `;
          }
          console.log(def)
          columnDefs.push(def);
        }
        this.gridOptions.columnDefs = columnDefs;
        console.log(this.gridOptions)
      });
  }

  $onDestroy() {
      this.sub();
  }

  formatData(data=[]) {
    return data.map( item => {
      item.info =  {
        icon: '//placehold.it/35x35',
        assetId: item.assetId,
        make: item.make,
        serialNumber: item.serialNumber
      }
      return item;
    });
  }  
}



angular.module('gridTest')
  .service('assetService', AssetService)
  .component('myGrid', {
    template: `
      <div class="ui-grid-comp">
        <div id="grid" ui-grid="$ctrl.gridOptions" ui-grid-pinning></div>
      </div>
    `,
    controller: GridController
  });

