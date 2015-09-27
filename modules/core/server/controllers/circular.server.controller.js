'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  fs=require('fs'),


  Circular = mongoose.model('Circular'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a site
 */



exports.list= function(req,res){

        Circular.find().populate('user').exec(function(err, users) {
        if (err) {
           console.log(err);
        } else {
            res.jsonp(users);
        }
    });
    
}