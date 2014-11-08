var fs = require("fs"),
    id3 = require("id3"),
    findit = require("findit"),
    path = require("path"),
    // zippy = require("zippy"),
    // Hash = require("hashish"),
    alists = require("alists"),
    EE = require("events").EventEmitter;

var track = module.exports;


var getTags = function (filePath, callback) {
  console.log(filePath)
  if (path.extname(filePath) === ".mp3") {

    fs.readFile(filePath, function (err, buff) {
      if (err) {
        throw err;
      }

      callback(filePath, id3(buff));
    });
  }
}

var getTagsSync = function (pathString) {
  return alists.toObj(findit
    .sync(pathString)
    .filter(function (filePath) {
      return (path.extname(filePath) === ".mp3");
    }).map(function (pathString) {
      return [pathString, id3(fs.readFileSync(pathString))];
    }));
}



track.list = function (pathString) {

  var ee = new EE();

  var finder = findit.find(pathString);

  finder.on("file", function (filePath) {
    getTags(filePath, ee.emit.bind(ee, "file"));
  });

  finder.on("end", ee.emit.bind(ee, "end"));

  return ee;

}

track.sync = getTagsSync;
