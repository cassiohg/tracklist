var fs = require("fs"),
    id3 = require("id3"),
    findit = require("findit"),
    path = require("path"),
    zippy = require("zippy"),
    EE = require("events").EventEmitter;

var tracklist = function (p, cb) {

  var finder = findit.find(p, function (f) {
    cb(p, id3(f));
  }),
      ee = new EE();

  finder.on("file", function(p) {
    ee.emit("file", {
      path: p,
      id3: id3(p)
    });
  });

  return ee;

}

tracklist.sync = function (p) {
  var found = findit(p).sync(),
      id3 = found.map(id3);


  return zippy.zipWith(function (found, id3) {
    return {
      path: p,
      id3: id3
    }
  }, found, id3);
}

exports.tracklist = tracklist;
