var path = require('path');
var archive = require('../helpers/archive-helpers');
var helpers = require('./http-helpers');
var fs = require('fs');
// require more modules/folders here!


  //Read index html

exports.handleRequest = function (req, res) {
  
  //var statusCode;  

  console.log('Serving request type ' + req.method + ' for url ' + req.url);
  
  if (req.method === 'GET' && req.url === '/') {
    helpers.serveAssets(res, path.join(__dirname, '../web/public/index.html'), function(data) {
      res.writeHead(200, helpers.headers);
      res.end(data);
    });
  } else if (req.method === 'GET' && req.url === '/www.google.com') {
    helpers.serveAssets(res, path.join(__dirname, '../archives/sites/Google.htm'), function(data) {
      res.end(data);
    });
  } else if (req.method === 'POST') {
    // should append submitted sites to 'sites.txt'
    //console.log(req.url);


    var body = '';
    req.on('data', function(data) {
      body += data;
      body = body.slice(4) + '\n';
      
      fs.appendFile(path.join(__dirname, '../test/testdata/sites.txt'), body, function (err) {
        if (err) {
          throw err;
        }
        console.log('Saved!');
        res.writeHead(302, helpers.headers);
        res.end(body);
      });
    });

    


  } else if (req.method === 'GET' && req.url === '/arglebargle') {
    res.writeHead(404, helpers.headers);
    res.end('');
  } 


  

  // should append submitted sites to 'sites.txt'

  // //res.end(archive.paths.siteAssets + '/index.html');
  // if (req.method === 'GET') {
  //   console.log('received a GET');
  //   //statusCode = 200;
  // }


  // res.writeHead(statusCode, headers);
  // res.end(JSON.stringify(result));


  //res.end(archive.paths.list);
  //res.end('/<input/');
};



// var actions = {
//   'GET': function(request, response) {
//     utils.sendResponse(response, {results: messages});
//   },
//   'POST': function(request, response) {
//     utils.collectData(request, function(message) {
//       message.objectId = ++objectIdCounter;
//       messages.push(message);
//       utils.sendResponse(response, {objectId: message.objectId}, 201);
//     });
//   },
//   'OPTIONS': function(request, response) {
//     utils.sendResponse(response, null);
//   }
// };


// exports.collectData = function(request, callback) {
//   var data = '';
//   request.on('data', function(chunk) {
//     data += chunk;
//   });
//   request.on('end', function() {
//     callback(JSON.parse(data));
//   });
// };
