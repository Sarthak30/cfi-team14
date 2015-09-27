'use strict';

module.exports = function (app) {
  // Root routing
  var core = require('../controllers/core.server.controller');
  var sites= require('../controllers/links.server.controller');

  var circular= require('../controllers/circular.server.controller');

  // Define error pages
  app.route('/server-error').get(core.renderServerError);

  // Return a 404 for all undefined api, module or lib routes
  app.route('/:url(api|modules|lib)/*').get(core.renderNotFound);

  app.route('/getSites').get(sites.list).post(sites.create);
  app.route('/getCirculars').get(circular.list);
   app.route('/getSites/:siteId')
    .get(sites.read);
  // Define application route
  app.route('/*').get(core.renderIndex);

  // Finish by binding the article middleware
  app.param('siteId', sites.siteByID);

  app.route('/api/uploads').post(sites.uploadFile);
};
