'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Site = mongoose.model('Site'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a site
 */
exports.create = function (req, res) {
  var site = new Site(req.body);
  site.user = req.user;

  site.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(site);
    }
  });
};
/**
 * Show the current site info
 */
exports.read = function (req, res) {
  res.json(req.site);
};


exports.list= function(req,res){
  //ebug('Page is: ' + page);
    var skip = (page - 1) * limit;
   var query=req.query;
   var limit = query.limit;
    var page = query.page;
   var search=query.search;
    if(search !=null){
        var re = new RegExp('\\b' + search + '\S*', 'i');
        console.log(re);
        var find = Site.find({'site_name':re}).limit(15);

        find.skip(skip).limit(limit).exec(function (err, cities) {
            if (err) {
                console.log(err);
                
            } else {

                console.log('Sites returned:' + cities.length);

                var result = {
                  'Limit': limit,
                        'TotalPages': Math.ceil(cities.length/ limit),
                        'CurrentPage': page,
                    'siteData': cities,
                    'TotalSites': cities.length
                };
                res.jsonp(result);
            }
        });

    }
    else{
      Site.count({}, function (err, count) {
            console.log('Number of sites:', count);
            var skip = (page - 1) * limit;
            Site.find().skip(skip).limit(limit).exec(function (err, sites) {
                if (err) {
                   // logger.error('Error while trying to list sites based on page and limit' + errorHandler.getErrorMessage(err));
                   console.log(err);
                } else {
                    //profiler.step('Processed data');
                    // Rendering taking 120ms
//
                   // logger.debug(new Date());
                    var result = {
                        'Limit': limit,
                        'TotalPages': Math.ceil(count / limit),
                        'CurrentPage': page,
                        'siteData': sites,
                        'Totalsites': count
                    };
                    console.log('Total pages:' + result.TotalPages);
                    //profiler.step('Rendered page');
                    //console.timeEnd('list sites');
                   // console.log(profiler.getSteps());
                    res.jsonp(result);
                }
            });
        });
       /* Site.find().exec(function(err, users) {
        if (err) {
           console.log(err);
        } else {
            res.jsonp(users);
        }
    });*/
    }
}

/**
 * Sites middleware
 */
exports.siteByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Site is invalid'
    });
  }

  Site.findById(id).populate('user', 'displayName').exec(function (err, article) {
    if (err) {
      return next(err);
    } else if (!article) {
      return res.status(404).send({
        message: 'No article with that identifier has been found'
      });
    }
    req.article = article;
    next();
  });
};
