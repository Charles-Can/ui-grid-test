require('./brew.sass');
require('./scroll-reporter.directive.js');
class HomeBrewController {
  constructor(assetService, countService, $scope) {
    this.countService = countService;
    this.sub;
    this.days;
    this.assets;
    this.dayList = [];
    this.$inject = ['assetService']
    this.assetCol = [];
    this.service = assetService;
    this.top = 0;
    this.left = 0;
    this.scope = $scope;
  }

  updateScroll(scrollTop, scrollLeft) {
    this.scope.$apply(() => {
      this.top = scrollTop;
      this.left = scrollLeft;
    })
  }

  $onInit() {
    this.sub = this.countService.subscribe( count => {
      this.assets = count.assets;
      this.days = count.days;
      this.getAssets();
    });
  }

  getAssets() {
    this.service.generateActualPayload(this.assets, this.days)
      .then( data => {
        this.assetCol = data; 
        this.dayList = this.assetCol[0].assetLocalDates.map(d => d.assetLocalDate.substring(0,5));
      });
  }

  $onDestroy() {
    this.sub();
  }
}
angular.module('gridTest')
  .component('homeBrewGrid', {
    controller: HomeBrewController,
    template: require('./home-brew.html')
  });