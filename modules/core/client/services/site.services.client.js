'use strict';

//Articles service used for communicating with the articles REST endpoints
angular.module('core').factory('Site', ['$resource',
  function ($resource) {
    return $resource('getSites/:siteId', {
      siteId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
