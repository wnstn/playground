var gulp = require('gulp');

var argv = require('yargs').argv;
var psi = require('psi');
var table = require('console.table');

gulp.task('pagespeed', function() {
  var ctxt = argv.context ? argv.context : "mobile";
  if (!argv.site) {
    throw new gutil.PluginError('create', {
      message: "Site is required in order to test"
    });
  }
  return psi(argv.site, {
      // key: key
      nokey: 'true',
      strategy: ctxt,
      format: 'cli'
  }).then(function (data) {
    var stats = data.pageStats;
    var divider = "------------------";
    var output = [divider, ""]
    console.log("");
    console.log("Pagespeed results for", argv.site, "on", ctxt);
    console.log("");
    var top;
    if (ctxt === "mobile") {
      top = [
        {"category": "Pagespeed",
        "score": data.ruleGroups.SPEED.score},
        {"category": "Usability",
        "score": data.ruleGroups.USABILITY.score},
        {"category": divider,
        "score": divider},
      ];
    } else {
      top = [
        {"category": "Pagespeed",
        "score": data.ruleGroups.SPEED.score},
        {"category": divider,
        "score": divider},
      ];
    }
    console.table(top)
    console.table('Assets',[
      {"Total": "Resources",
      "Data": stats.numberResources},
      {"Total": "Hosts",
      "Data": stats.numberHosts},
      {"Total": "Static Resources",
      "Data": stats.numberStaticResources},
      {"Total": divider,
      "Data": divider},
      {"Total": "HTML Weight",
      "Data": (stats.htmlResponseBytes / 1000).toString() + "kb"},
      {"Total": "Image Weight",
      "Data": (stats.imageResponseBytes / 1000).toString() + "kb"},
      {"Total": divider,
      "Data": divider},
      {"Total": "CSS Weight",
      "Data": (stats.cssResponseBytes / 1000).toString() + "kb"},
      {"Total": "CSS Resources",
      "Data": stats.numberCssResources},
      {"Total": "JS Weight",
      "Data": (stats.javascriptResponseBytes/ 1000).toString() + "kb"},
      {"Total": "JS Resources",
      "Data": stats.numberJsResources},
    ]);
  });

});
