var fs = require("fs");
var browserify = require("browserify");
var babelify = require("babelify");

browserify({ debug: true })
  .transform(babelify)
  .require("./src/client/app.js", { entry: true })
  .bundle()
  .on("error", function (err) { console.log("Error: " + err.message); })
  .pipe(fs.createWriteStream("bundle.js"));