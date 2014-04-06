'use strict';
var express = require('express');
var request = require('request');
// var cheerio = require('cheerio');
var Firebase = require('firebase');
var app     = express();

var firebaseRootRef = new Firebase('https://wayang.firebaseio.com/qlap2');

// Qlap Cineplex have a undocumented API used by its own mobile app
// It have 3 options:
// - Get movies: http://qlapcineplex.com/iphone/services/getmovies.php
// - Get showtime: http://qlapcineplex.com/iphone/services/getshowtimes.php?dt=4/4/2014
// - Get movie details (by IDs): http://qlapcineplex.com/iphone/services/getmovie.php?id=383

// Basically since the data output will be JSON so directly save them to firebase

// Example request header @ 66.147.240.188:
// GET /iphone/services/getmovie.php?id=381 HTTP/1.1
// Host: www.qlapcineplex.com
// Connection: keep-alive
// Accept: application/json, text/javascript, */*; q=0.01
// X-Requested-With: com.phonegap.sqcbrunei
// User-Agent: Mozilla/5.0 (Linux; U; Android 4.3; en-us; sdk Build/JB_MR2) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30
// Accept-Encoding: gzip,deflate
// Accept-Language: en-US
// Accept-Charset: utf-8, iso-8859-1, utf-16,

app.get('/timesquare', function(req, res){
  // First get the list of movies and their IDs
  var url = 'http://qlapcineplex.com/iphone/services/getmovies.php';
  request(url, function(error, response, htmlBody){
    if(!error){

      // We don't need cheerio since the data is in JSON
      // var $ = cheerio.load(htmlBody);
      var title, length, posterURL, miniPosterURL, date1, date2, date3,
      date4, date5, date6, date7,time1, time2, time3, time4, time5, time6, time7;
      var movies = [];

      // Parsing the requested JSON data should be done below

      // Below pacakaged the processed JSON data into Firebase friendly format
      var json = {
        title : title.trim(),
        length : length.trim(),
        posterURL: posterURL,
        miniPosterURL: miniPosterURL,
        date1 : date1,
        time1 : time1,
        date2 : date2,
        time2 : time2,
        date3 : date3,
        time3 : time3,
        date4 : date4,
        time4 : time4,
        date5 : date5,
        time5 : time5,
        date6 : date6,
        time6 : time6,
        date7 : date7,
        time7 : time7
      };
      movies.push(json);
      
      firebaseRootRef.set(movies, function () {
        console.log('updated firebase');
      });
      
      res.send('Check your console!');
    } else {
      throw error;
    }
  });
});

app.listen('8081');
console.log('Magic happens on port 8081');
exports = module.exports = app;