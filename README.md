# Tracklist

# NO I DONT MAINTAIN THIS

Reads the id3 data for all mp3s in a folder and all subfolders.

## Example:

    #!/usr/bin/env node

    var tracklist = require("tracklist");

    tracklist.list(process.argv[2] || ".", function (err, result) {
      if (result) {
          console.log((result.artist || "???") + " - " + (result.title || "???"));
      }
    });

## Install:

    npm install tracklist

## Usage:

    $ ./bin/tracklist test/
    The We Shared Milk - Aye Drum
    The We Shared Milk - Butcher
    The We Shared Milk - Cookie Jar
    The We Shared Milk - Drag
    The We Shared Milk - I Picked Up The Axe
    The We Shared Milk - Come Home
    The We Shared Milk - Moon Mother

You can also use it programmatically:

asynchronous way

    tracklist = require("tracklist");

    var tracks = {};
    tracklist.list("path/to/jams")
    .on('file', function (filePath, tags) {
        // for each mp3 file found, 'tags' is an object holding the id3 tags.
        // 'filePath' is the path to the found file.
        tracks[filePath] = tags;
    })
    .on('end', function (err) {
        // called after all files have been found.
        console.log(tracks);
    });

synchronous way

    tracklist = require("tracklist");

    console.log(tracklist.sync("path/to/jams"));
    // returns an object with pairs filePath-tags like this:
    // {{filePath: tags}, {filePath: tags}, {filePath: tags}}


## License:

MIT/X11.
