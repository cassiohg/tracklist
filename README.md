# Tracklist

Reads the id3 data for all mp3s in a folder.

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

    tracklist.list("path/to/jams", function (err, result) {
      // result for each file in the path
    });

One property is attached to the results that's not from a tag name: "filepath", or the path to the file.

## License:

MIT/X11.
