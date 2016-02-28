angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

})

.controller('HomeCtrl', function($scope, $http, $state, beerResults) {
  $scope.form = {};

  $scope.search = function() {

    var data = {};

    if ($scope.form.beerName) {
      data.name = $scope.form.beerName;
    };
    if ($scope.form.year) {
      data.year = $scope.form.year;
    };
    if ($scope.form.abvVal && $scope.form.abvToggle) {
      data.abv = $scope.form.abvVal;
    };
    if ($scope.form.ibuVal && $scope.form.ibuToggle) {
      data.ibu = $scope.form.ibuVal;
    };
    if ($scope.form.isOrganic) {
      data.isOrganic = $scope.form.isOrganic;
    };

    console.log($scope.form);

    $http({
      method: 'GET',
      url: 'https://salty-taiga-88147.herokuapp.com/beers',
      params: data
    }).then(function successCallback(response) {
      beerResults.data = response.data;
      console.log(beerResults.data);
      $state.go('app.results',{});
    }, function errorCallback(response) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
    });

    

  }

})
.factory('beerResults', function () {
  return {
    data: {}
  }
})

.controller('ResultsCtrl', function($scope, $state, beerResults){

  $scope.results = beerResults.data;

  $scope.viewDetail = function(id) {
    $state.go('app.details',{id:id});
  }

})

.controller('DetailsCtrl', function($scope, $http, $stateParams, beerResults){

  console.log($stateParams);

  id = $stateParams.id;
  $scope.beerInfo = beerResults.data;

  var index = 0; 
  while(true){
    if ($scope.beerInfo.data[index].id == id) {
      break;
    };
    index++;
  }

  $scope.beerInfo = beerResults.data.data[index];
  console.log($scope.beerInfo);

})








