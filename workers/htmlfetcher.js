// */1 * * * * /Users/student/.nvm/versions/node/v6.9.5/bin/node /Users/student/code/hrsf80-web-historian/workers/htmlfetcher.js

var fs = require('fs');
var archive = require('../helpers/archive-helpers');

// log each execution of cron
var time = new Date().getTime();
time = time + '\n';
fs.appendFileSync('/Users/student/code/hrsf80-web-historian/workers/cron-log.txt', time); 

// check file to download
archive.readListOfUrls(function(list) {
  list.forEach(function(el) {
    archive.isUrlArchived(el, function(test) {
      if (!test) {
        // call the download function
        fs.appendFileSync('/Users/student/code/hrsf80-web-historian/workers/cron-log.txt', el + '\n'); 
        if (el.length) {
          archive.downloadUrls([el]); 
        }
      }
    });
  });
});
