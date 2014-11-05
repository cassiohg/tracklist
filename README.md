# Tracklist

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

    tracklist = require("tracklist");

    var tracks = [];
    tracklist.list("path/to/jams")
        .on('file', function (err, mp3Tag) {
        // mp3Tag is an object holding the id3 tags for each mp3 file in the path.
        tracks.push(mp3Tag);
        // One property is attached to the mp3Tag that's not from a tag name: "filepath", or the path to the file.
    })
        .on('end', function (err) {
        // called after all files have been found.
        console.log(tracks);
    })

## License:

MIT/X11.
