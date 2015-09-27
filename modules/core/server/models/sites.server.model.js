'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var SiteSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  site_name: {
    type: String,
    default: ''
  },
  content: {
    type: String,
    default: '',
    trim: true
  },
  siteType:{type:String, default: 'Municipality'},
  user_contact:Number,
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  link:{
    type: String,
    default: '#'
  }
  
});

mongoose.model('Site', SiteSchema);
