angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

})

.controller('HomeCtrl', function($scope, $http, $state, beerResults) {
  $scope.form = {
    abvVal: 6,
    ibuVal: 20
  };

  $scope.search = function() {

    var data = {
      key: '6e3bdbd495156ed013e780c3d4dfb15c',
      // isOrganic: $scope.isOrganic
    };

    if ($scope.form.beerName) {
      data.name = $scope.form.beerName;
    };
    if ($scope.form.foodPairings) {
      data.foodPairings = $scope.form.foodPairings;
    };
    if ($scope.form.abvVal) {
      data.abv = $scope.form.abvVal;
    };
    if ($scope.form.ibuVal) {
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
  // $scope.info = {
  //   data: {
  //     labels: {
  //       "medium": 'http://www.beernbratsrun.com/wp-content/uploads/2015/08/fav-icon.jpg'
  //     },
  //     name: "Sample Beer", 
  //     abv: "6.2",
  //     ibuMax: "70",
  //     ibuMin: "50",
  //     description: "blah blah blah blahb blah beer",
  //     isOrganic: 'N'
  //   }
  // }
  console.log($stateParams);

  id = $stateParams.id;
  $scope.info = beerResults.data;

  var index = 0;
  // while(true){
  //   if ($scope.info[index].id === id) {
  //     break;
  //   };
  //   index++;
  // }

  $scope.info = beerResults.data[index];

})








