var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var http = require('http');
var request = require('request');
/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  fs.readFile(exports.paths.list, function(err, data) {
    var str = '';
    
    str += data;
    var arr = str.split('\n');
    callback(arr);
  });
};

exports.isUrlInList = function(url, callback) {
  fs.readFile(exports.paths.list, function(err, data) {
    var str = '';
    str += data;    
    var arr = str.split('\n');
    if (arr.indexOf(url) === -1) {
      callback(false);
    } else {
      callback(true);
    }
    
  });
};

exports.addUrlToList = function(url, callback) {
  fs.appendFileSync(exports.paths.list, url + '\n');  
  callback();   
};

exports.isUrlArchived = function(url, callback) {  
  

  var files = fs.readdirSync(exports.paths.archivedSites);
  
  if (files.indexOf(url) !== -1) {
    callback(true);
  } else {
    callback(false);  
  }
};

exports.downloadUrls = function(urls) {
  // should download all pending urls in the list
  //readListOfUrls(function(arrList) {
  // console.log('List of sites: ', urls);
  // urls.forEach(function(url) {

  //   //console.log('loop', urls[i]);
  //   var options = {
  //     host: url,
  //     port: 80,
  //     method: 'GET',
  //     path: '/index.hml'
  //   };
    
  //   //var context = this;
  //   //console.log('inside loop', urls[i]);   
  //   http.get(options, (res) => {
  //     //console.log('inside get', options.host);   
  //     console.log(`Download: ${options.host} res: ${res.statusCode} ${res.statusMessage}`);     
  //     res.on('data', (chunk) => {
  //       var content = ''; 
  //       content += chunk;
  //       console.log(`Download: ${options.host} content: ${content}`);
  //       //console.log('inside res', options.host);
  //       fs.writeFileSync((exports.paths.archivedSites + '/' + options.host), content); 
  //       //console.log('Got response: ' + content);
  //     });
  //   }).on('error', function (error) {
  //     console.log(error);
  //   });
  // })
  urls.forEach(function (url) {
    if (!url) {
      return;
    } 
    request('http://' + url).pipe(fs.createWriteStream(exports.paths.archivedSites + '/' + url));
  });
  //});
};















