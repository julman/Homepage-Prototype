var jobresultsApp = angular.module('jobresultsApp', []);

function JobResultsCtrl($scope, $http, $timeout) {
      timer = false;

      $scope.search = function() {
        //show spinner
        if (timer) {
          $timeout.cancel(timer);
        }  

        timer = $timeout(function(){
          angular.element(document.querySelector('.spinner')).css('display', 'block');

          $http({
            url: '/job/search', 
            method: "GET",
            params: { title: $scope.title, 
                      location: $scope.location,
                      salary: $scope.salary,
                      education: $scope.education
                    }
          }).success(function(data) {
            $scope.jobs = data;
            //hide spinner
            angular.element(document.querySelector('.spinner')).css('display', 'none');
            angular.element(document.querySelector('#count')).css('display', 'block');
          }).error(function(error) {
            //hide spinner
            angular.element(document.querySelector('.spinner')).css('display', 'none');
          });
        }, 250)
        
      };
}

JobResultsCtrl.inject = ['$scope', '$http', '$timeout'];

jobresultsApp.controller('JobResultsCtrl', JobResultsCtrl);




