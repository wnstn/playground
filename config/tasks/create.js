var gulp = require('gulp');

var fs = require('fs');
var argv = require('yargs').argv;

gulp.task('create', function() {
  if (!argv.name) {
    throw new gutil.PluginError('create', {
      message: "Name is required to create a new file",
    });
  }

  var locations = [
    {path:'./views/', ext:'.erb', text: "<% @app = false %>"},
    {path:'./public/sass/custom/_', ext:'.scss', text: "." + argv.name + " { }"},
    {path:'./public/javascripts/views/', ext:'.js', text: "(function(){ // write some JS \n })()" } ];

  locations.forEach(function(loc) {
    var fileName = loc.path + argv.name.replace(/-/g,"_") + loc.ext;

    fs.writeFile(fileName, loc.text, function (err) {
      if (err) {
        console.log(err);
      }
      console.log('successfully created', fileName);
    });
  });
});
