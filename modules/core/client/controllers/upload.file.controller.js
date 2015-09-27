'use strict';

angular.module('core').controller('UploadController', ['$scope', '$http','$location', '$window','Authentication','Site','FileUploader',
  function ($scope,$http,$location, $window, Authentication,Site,FileUploader) {
   /* $scope.uploader = new FileUploader({
      url: 'api/uploads/'
    });*/

$scope.circular_title='';
$scope.uploadFiles = function () {
console.log("hererre");
                        //$scope.modalInstance.close($scope.content);
                        var file = $scope.fileContent;
                        console.log($scope.content);

                        $scope.showSpinner=true;
                        $http.post('api/uploads', {
                                files: file, encoding: 'utf-8',title:$scope.circular_title,user:Authentication.user
                            }
                        ).success(function (results,err) {
                          console.log(results);
                           $scope.success = true;

              // Populate user object
            // $scope.user = Authentication.user = response;
                        });
                      };

$scope.getCirculars=function(){
    $http.get('getCirculars',  { cache: true}).success(function (circ) {
                                  console.log(circ);
                                  $scope.listCirculars=circ;
                                });

}

  }]);