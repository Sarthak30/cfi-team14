'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var CircularSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  circular_title: {
    type: String,
    default: ''
  },
  content: {
    type: String,
    default: '',
    trim: true
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  link:{
    type: String,
    default: '#'
  }
  
});

mongoose.model('Circular', CircularSchema);
