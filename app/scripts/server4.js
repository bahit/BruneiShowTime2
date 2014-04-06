'use strict';
var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var Firebase = require('firebase');
var app     = express();

var firebaseRootRef = new Firebase('https://wayang.firebaseio.com/mall2');

app.get('/mall', function(req, res){
  var url = 'http://mall-ticket.com/';
  request(url, function(error, response, htmlBody){
    if(!error){
      var $ = cheerio.load(htmlBody);
      var title, length, posterURL, miniPosterURL, date1, date2, date3,
      date4, date5, date6, date7,time1, time2, time3, time4, time5, time6, time7;
      var movies = [];

      // First need to rename class .ShowtimesSummaryRowAlt into ShowtimesSummaryRow
      // within DOM

      $('.ShowtimesSummaryRowAlt').each(function() {
        $(this).addClass('ShowtimesSummaryRow');
      });

      // Find the current date

      date1 = $('option').attr('value');

      $('.ShowtimesSummaryRow').each(function() {
        
        title = $(this).find('.ShowtimesMovieLink').text();
        length = $(this).find('.ShowtimesMovieOtherText').text();

        // Create a temp array to store all the time
        var timeTemp = [];
        
        $(this).find('.ShowtimesSessionLink').each(function() {
          timeTemp.push($(this).text());
        });

        time1 = timeTemp.join(', ');
        
        var start = length.indexOf(':');
        start +=2;
        length = length.substr(start);
        // console.log(date1);
        // console.log(title);
        // console.log(length);
        // console.log(time1);


        // TODO: Need to change the formt of dates into something standard
        var json = {
          title : title.trim(),
          length : length.trim(),
          posterURL: null,
          miniPosterURL: null,
          date1 : date1,
          time1 : time1,
          date2 : null,
          time2 : null,
          date3 : null,
          time3 : null,
          date4 : null,
          time4 : null,
          date5 : null,
          time5 : null,
          date6 : null,
          time6 : null,
          date7 : null,
          time7 : null
        };
        movies.push(json);
      });
      
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