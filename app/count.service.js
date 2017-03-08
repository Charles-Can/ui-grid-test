class CountService {
  constructor() {
    this.subscribers = [];
    this.assets;
    this.days;
  }
  getCount() {
    return {
      days: this.days,
      assets: this.assets
    };
  }
  setCount(assets=1, days=1) {
    this.assets = assets;
    this.days = days;
    this.push();
  }

  subscribe(fun) {
    let _this = this;
    this.subscribers.push(fun);
    fun(this.getCount());
    return function() {
      _this.subscribers = _this.subscribers.filter( f => f !== fun);
    };
  }
  push() {
    this.subscribers.map(sub => sub(this.getCount()));
  }
}
angular.module('gridTest')
  .service('countService', CountService );