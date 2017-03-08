require('./brew.scss');
class HomeBrewController {

}
angular.module('gridTest')
  .component('homeBrewGrid', {
    controller: HomeBrewController,
    template: require('./template.html')
  });