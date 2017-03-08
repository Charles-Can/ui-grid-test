const linkFn = function(scope, el, attrs) {

  function throttle(delay, callback) {
      var previousCall = new Date().getTime();
      return function() {
          var time = new Date().getTime();
          if ((time - previousCall) >= delay) {
              previousCall = time;
              callback.apply(null, arguments);
          }
      };
  }

  var throttledScroll = throttle(10, scope.onScroll);

  el.on('scroll', function(e) {
    throttledScroll({scrollTop: e.target.scrollTop, scrollLeft: event.target.scrollLeft});
  });

  scope.$on('$destroy')

};

angular.module('gridTest')
  .directive('scrollReporter', function() {
    return {
      restrict: 'A',
      controller: function() {},
      controllerAs: 'vm',
      scope: {
        onScroll: '&'
      },
      link: linkFn
    };
  });