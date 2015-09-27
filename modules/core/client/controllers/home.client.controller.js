'use strict';

angular.module('core').controller('HomeController', ['$scope', '$http','$location','Authentication','Site',
  function ($scope,$http,$location, Authentication,Site) {
    // This provides Authentication context.
    $scope.authentication = Authentication;
   // $scope.listSites=Site.query();
    $scope.create = function (isValid) {
    	console.log("here");
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'articleForm');

        return false;
      }

      // Create new Article object
      var site = new Site({
        site_name: this.site_name,
        content: this.content,
        siteType:this.siteType,
        user_contact:this.user_contact,
        created: new Date(),

      });

      // Redirect after save
      site.$save(function (response) {
        console.log(response._id);
        $location.path('site/' + response._id);

        // Clear form fields
        $scope.title = '';
        $scope.content = '';
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };
      $scope.currentPage = 1;
                        $scope.numPerPage = 20;
                        $scope.maxSize = 20;

     // Find a list of site
    $scope.find = function () {

                        var q ={
                            'limit':$scope.numPerPage,
                            'page':$scope.currentPage};

      //$scope.listSites = Site.query();
         var result = Site.get(q,function () {
                                //$scope.$apply();
                                $scope.showSpinner= false;
                                $scope.listSites= result.siteData;


                              
                                $scope.totalSites = result.Totalsites;

                                $scope.totalPages = result.TotalPages;
                                $scope.currentPage = result.CurrentPage;
                                $scope.pages = [];
                                for (var i = 1; i < $scope.totalPages; i++){
                                    $scope.pages.push(i);
                                }
                                $scope.showErrorAlert=false;
                                $scope.changePager= false;

                            });
      console.log($scope.listSites);
    };

    // Find existing Site
    $scope.findOne = function () {
      $scope.article = Site.get({
        articleId: $stateParams.articleId
      });
    };
  
    $scope.searchSites=function(parameter){
    	console.log(parameter)
  			if(parameter) {
                            
                                $scope.showSpinner=true;
                               // $scope.search=true;
                                $http.get('getSites?search=' + parameter,  { cache: true}).success(function (sites) {
                                  console.log(sites);
                                  $scope.listSites=sites.siteData;
                                });

                                return $http.get('getSites?search=' + parameter,  { cache: true}).then(function (cities) {

                                    if (cities.data.TotalSites == 0) {
                                        cities.data.siteData.push({'title': "No Result found",'id':0,'img':false});
                                        return cities.data.siteData.map(function (item) {
                                            return ({title:item.title ,'img':false});
                                        });
                                    }
                                    else {
                                        return cities.data.siteData.map(function (item) {
                                            //console.log(item);
                                            $scope.displaySites=item;
                                            console.log($scope.displaySites);

                                           //$scope.$apply();
                                            return({'link': item.link, 'title': item.site_name});

                                        });
                                    }
                                    $scope.showSpinner =false;
                                });
                            }
                        


    }
  }
]);
