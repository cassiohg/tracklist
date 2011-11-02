var fs = require("fs"),
    id3 = require("id3"),
    findit = require("findit"),
    path = require("path"),
    EE = require("events").EventEmitter;

module.exports = function (folder, cb) {
  var res = [],
      count = 0,
      tracks = new EE();

  var finder = findit(folder);

  finder.on("file", function (p) {
    if (path.extname(p) === ".mp3") {
      count++;
      fs.readFile(p, function (err, f) {
        if (err) {
          cb(err);
        }

        var track = id3(f);
        track.filepath = p;
        tracks.emit("track", track);

      });
    }
  });

  finder.on("end", function () {
    var stack = [];

    tracks.on("track", function (f) {
      stack.push(f);
      if (stack.length >= count) {
        cb(null, stack);
      }
    });
  });

}
