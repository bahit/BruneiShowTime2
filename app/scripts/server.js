'use strict';
var express = require('express');
// var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

app.get('/timesquare', function(req, res){

  // url = 'http://www.imdb.com/title/tt1229340/';
  var url = 'http://timescineplex.com/schedule/';


  request(url, function(error, response, html){
    if(!error){
      var $ = cheerio.load(html);

      var title, posterURL, miniPosterURL, date1, date2, date3,
      date4, date5, date6, date7,time1, time2, time3, time4, time5, time6, time7;
      var json = { title : '', posterURL: '', miniPosterURL: '',
       date1 : '', time1 : '',
       date2 : '', time2 : '',
       date3 : '', time3 : '',
       date4 : '', time4 : '',
       date5 : '', time5 : '',
       date6 : '', time6 : '',
       date7 : '', time7 : ''};

      // var movies = [];
      // var mainjson = {movies:''};

      $('.movie-sched-outer').each(function() {
        $(this).find('.movie-title').each(function() {
          console.log('Title: ' + $(this).text());
          title = $(this).text();
          json.title = title;
        });
        $(this).find('.movie-poster').each(function() {
          posterURL = $(this).find('a').attr('href');
          console.log('Poster: ' + posterURL);
          json.posterURL = posterURL;
        });
        $(this).find('.movie-poster').each(function() {
          miniPosterURL = $(this).find('img').attr('src');
          console.log('Poster: ' + miniPosterURL);
          json.miniPosterURL = miniPosterURL;
        });
        $(this).find('.table-col-1').each(function() {
          date1 = $(this).find('.textwidget').text();
          time1 = $(this).find('.table-contents').text().trim();
          console.log('Date: ' + date1);
          console.log('Time: ' + time1);
          json.date1 = date1;
          json.time1 = time1;
        });
        $(this).find('.table-col-2').each(function() {
          date2 = $(this).find('.textwidget').text();
          time2 = $(this).find('.table-contents').text().trim();
          console.log('Date: ' + date2);
          console.log('Time: ' + time2);
          json.date2 = date2;
          json.time2 = time2;
        });
        $(this).find('.table-col-3').each(function() {
          date3 = $(this).find('.textwidget').text();
          time3 = $(this).find('.table-contents').text().trim();
          console.log('Date: ' + date3);
          console.log('Time: ' + time3);
          json.date3 = date3;
          json.time3 = time3;
        });
        $(this).find('.table-col-4').each(function() {
          date4 = $(this).find('.textwidget').text();
          time4 = $(this).find('.table-contents').text().trim();
          console.log('Date: ' + date4);
          console.log('Time: ' + time4);
          json.date4 = date4;
          json.time4 = time4;
        });
        $(this).find('.table-col-5').each(function() {
          date5 = $(this).find('.textwidget').text();
          time5 = $(this).find('.table-contents').text().trim();
          console.log('Date: ' + date5);
          console.log('Time: ' + time5);
          json.date5 = date5;
          json.time5 = time5;
        });
        $(this).find('.table-col-6').each(function() {
          date6 = $(this).find('.textwidget').text();
          time6 = $(this).find('.table-contents').text().trim();
          console.log('Date: ' + date6);
          console.log('Time: ' + time6);
          json.date6 = date6;
          json.time6 = time6;
        });
        $(this).find('.table-col-7').each(function() {
          date7 = $(this).find('.textwidget').text();
          time7 = $(this).find('.table-contents').text().trim();
          console.log('Date: ' + date7);
          console.log('Time: ' + time7);
          json.date7 = date7;
          json.time7 = time7;
        });
      });
      
      
      // mainjson.movies = movies;
      
      // To write to the system we will use the built in 'fs' library.

      // fs.writeFile('output.json', JSON.stringify(mainjson, null, 4), function(){
      //   console.log('File successfully written! - Check your project directory for the output.json file');
      // });

      // Finally, we'll just send out a message to the browser reminding you that this app does not have a UI.
      res.send('Check your console!');
    } else {
      throw error;
    }
  });
});

app.listen('8081');
console.log('Magic happens on port 8081');
exports = module.exports = app;