'use strict';
var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var Firebase = require('firebase');
var app     = express();

var firebaseRootRef = new Firebase('https://wayang.firebaseio.com/empire2');

app.get('/timesquare', function(req, res){
  var url = 'http://timescineplex.com/empire/schedule/';
  request(url, function(error, response, htmlBody){
    if(!error){
      var $ = cheerio.load(htmlBody);
      var title, length, posterURL, miniPosterURL, date1, date2, date3,
      date4, date5, date6, date7,time1, time2, time3, time4, time5, time6, time7;
      var movies = [];

      $('.movie-sched-outer').each(function() {
        // Below fixes the problem of inlcuding movie length and just get the title
        // of movie, FYI gets the text node within the div excluding text in <p>
        var movieTitleString = $(this).find('.movie-title').first().contents().filter(function() {
          return this.nodeType === 3;
        });
        title = movieTitleString.prevObject.eq(0).text();
        $(this).find('.movie-title').each(function(){
          length = $(this).children().first().text();
        });
        $(this).find('.movie-poster').each(function() {
          posterURL = $(this).find('a').attr('href');
        });
        $(this).find('.movie-poster').each(function() {
          miniPosterURL = $(this).find('img').attr('src');
        });
        $(this).find('.table-col-1').each(function() {
          date1 = $(this).find('.textwidget').text();
          time1 = $(this).find('.table-contents').text().trim();
        });
        $(this).find('.table-col-2').each(function() {
          date2 = $(this).find('.textwidget').text();
          time2 = $(this).find('.table-contents').text().trim();
        });
        $(this).find('.table-col-3').each(function() {
          date3 = $(this).find('.textwidget').text();
          time3 = $(this).find('.table-contents').text().trim();
        });
        $(this).find('.table-col-4').each(function() {
          date4 = $(this).find('.textwidget').text();
          time4 = $(this).find('.table-contents').text().trim();
        });
        $(this).find('.table-col-5').each(function() {
          date5 = $(this).find('.textwidget').text();
          time5 = $(this).find('.table-contents').text().trim();
        });
        $(this).find('.table-col-6').each(function() {
          date6 = $(this).find('.textwidget').text();
          time6 = $(this).find('.table-contents').text().trim();
        });
        $(this).find('.table-col-7').each(function() {
          date7 = $(this).find('.textwidget').text();
          time7 = $(this).find('.table-contents').text().trim();
        });

        // TODO: Need to change the formt of dates into something standard
        var json = {
          title : title.trim(),
          length : length.trim(),
          posterURL: posterURL,
          miniPosterURL: miniPosterURL,
          date1 : date1,
          time1 : time1.replace(/(\r\n|\n|\r)/gm,' '),
          date2 : date2,
          time2 : time2.replace(/(\r\n|\n|\r)/gm,' '),
          date3 : date3,
          time3 : time3.replace(/(\r\n|\n|\r)/gm,' '),
          date4 : date4,
          time4 : time4.replace(/(\r\n|\n|\r)/gm,' '),
          date5 : date5,
          time5 : time5.replace(/(\r\n|\n|\r)/gm,' '),
          date6 : date6,
          time6 : time6.replace(/(\r\n|\n|\r)/gm,' '),
          date7 : date7,
          time7 : time7.replace(/(\r\n|\n|\r)/gm,' ')
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