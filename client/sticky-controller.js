const app = angular.module('stickyController', []);

app.controller('mainController', [
  '$scope',
  '$http',
  'StickyService',
  ($scope, $http, StickyService) => {
    $scope.stickyData = {};

    // get all sticky when application starts.
    $scope.init = () => {
      StickyService
        .get()
        .then((result) => {
          $scope.stickies = result.data;
        });
    };

    $scope.init();

    // create sticky here.
    $scope.createSticky = () => {
      if ($scope.stickyData.note) {
        StickyService.create($scope.stickyData)
          .then((result) => {
            if (result.data.ops.length) {
              $scope.stickies.push(result.data.ops[0]);
            }
          });
      }
      $scope.stickyData = {};
    };

    // Update sticky here.
    $scope.updateSticky = (id, status) => {
      StickyService.update(id, status)
        .then(() => {
          if (status === 0) {
            const index = $scope.stickies
              .map(sticky => sticky.sticky_id)
              .indexOf(id);
            $scope.stickies.splice(index, 1);
          } else $scope.init();
        });
    };
  }]);
