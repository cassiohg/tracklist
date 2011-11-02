var fs = require("fs"),
    id3 = require("id3"),
    findit = require("findit");



module.exports = function (folder) {
  findit(folder).on("file", function (p) {
    fs.readFile(p, function (err, f) {
      if (err) {
        throw err;
      }

      var tags = id3(f);

      console.log((tags.artist || "???") + " - " + (tags.title || "???"));
    })
  });
}
