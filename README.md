# Playground

Playground is a (hopefully) easy-to-use environment for removing as much friction from the “Having an idea” stage to the “coding out a prototype” stage. By taking advantage of tools like Browsersync and Gulp, the environment makes it easy to hop right into code and shape ideas instantly.

Suggestions for improvement are welcome, PRs for any issues are welcome. The hope is to make this a useful tool for people who like working out their ideas in a text editor.

## Installation

First, you need to have Ruby 2.2.2 installed. I enjoy using [rbenv](https://github.com/sstephenson/rbenv) to manage versions. Next, you'll need to [install npm](https://nodejs.org/download/). Then, [fork the repo](https://help.github.com/articles/fork-a-repo/) and clone it locally. In the directory, run `gem install bundle` then `bundle install`. All necessary ruby gems will be installed. Then, run `npm i` to get all the gulp dependencies.

## Basic Usage

To startup playground and begin using it, run `bundle exec foreman start` inside the directory. Foremen starts up two separate processes:

### 1. The Sinatra Server

This environment is a Sinatra app. In development, Sinatra handles the routing. The app is set to live at `localhost:4000`, if it's running you can visit that in your browser. The Sinatra configuration file, `playground.rb` will look for any route you attempt to visit. If you have a file named `foo.erb` in the `/views/` directory, you can load it in the browser at `localhost:4000/foo`. If no `.erb` file is in the directory, the browser will return a 404 error.

The routing file also delivers to variables to the view: `@wrapperClass` and `@js`. The layout file in `/views/layout.erb` sets `@wrapperClass` as a class on the element that wraps the view, for easy styling and JS creation. The `@js` variable is inserted into the footer so that view can automatically load a Javascript file with the same name as the `erb` view. More information on that in a second.

### 2. Gulp

The Gulpfile is where a lot of the convenience is happening. Here's a walkthrough of everything it handles:

* _Javascript Concatenation:_ Inside `/public/javascripts/` is a directory named `vendor`. The `concat-js` task concatenates everything it finds inside that directory so that it can be served to all views. Anytime a new file is added, this task will run and the browser will reload. This means if you ever wanted to hack around with the latest and greatest JS tool, you can drop it in this folder and start hacking.

* _CSS Concatenation:_ Works similar to the JS concat task, except by default the directory doesn't exist. If you have vendor CSS or third-party libraries you wish to include, just create a directory named `vendor` inside `/public/css/` and drop your CSS in there. This task will concatenate it all and serve it to all views.

* _[Browsersync](http://www.browsersync.io/):_ A lovely tool that makes it trivial to automatically insert file changes into the browser, and reload multiple browsers as you work. By default, Playground's BrowserSync setup is accessible at `localhost:4001`. All browsers that connect to `localhost:4000` or the publicly available URL will be automatically reloaded everytime a file changes, which makes for super fast development across multiple browsers or breakpoints.

* _Gulp Watch:_ Using the built in gulp watch capabilities, a number of file watchers are instantiated on `init` that help make for rapid development. Playground will watch for changes in the CSS directory (`/public/css`) and inject them into the view. It will watch for changes in the SCSS directory (`/public/sass`) and run Sass compilation (see below for more information). As mentioned above, it will watch for new files in `/public/javascripts/vendor` and concat them. It will also watch for file changes in the other two Javascript directories (`/public/javascripts/views` and `/public/javascripts/compiled`) and reload the browser if a file is added or changes. It will watch the `/views` directory for file change, and reload the view on save.

* _Sass:_ The Sass task is run anytime a file is added or changes inside `/public/sass`. Because the gulp-file uses the npm module [gulp-css-globbing](https://github.com/jsahlen/gulp-css-globbing) any new file with the extension `.scss` added to `/public/sass/custom` will be incorporated into the compiled CSS. Files added to `/public/sass/vendor` and `/public/sass/lib` will need to be manually included in the `application.scss` manifest located in `/public/sass/`. The Sass compilation task includes [Autoprefixer](https://github.com/postcss/autoprefixer) so you don't need to worry about vendor prefixes. The default Sass stack includes the [Normalize](https://github.com/JohnAlbin/normalize-scss) browser reset library and the sass helper library [Breakpoint](http://breakpoint-sass.com). All other libraries or tools can be added to `/public/sass/vendor` and included in the manifest whenever you'd like to use them. Sass will normally just compile and reload the browser silently, but the Gulpfile is designed to give you a notification if an error occurs using [gulp-notify](https://www.npmjs.com/package/gulp-notify). You can turn this off by commenting out the line `.pipe(plumber(plumbConfig))` in the Gulpfile.

## Creating New Views

To help you quickly get to code, there's a gulp task that creates all the files necessary for instantly hopping into code. Inside the directory, run `gulp create --name=foo` where `foo` is replaced with whatever you want your route to be named. This task will create three files: an erb file, a Javascript file, and a Sass file.

Going with the example above, the erb file will be `/views/foo.erb` and it's where you can start writing your HTML. The Sass file will be `/public/sass/custom/_foo.scss` and it'll have the wrapper class (in this case, `.foo`) included in the file so you can immediately scope all styles just the new view. The Javascript file will be `/public/javascripts/views/foo.js` and when you hit `localhost:4000/foo` in the browser, the JS will be available in the view.

## What about Browserify and ES6?

If you're wanting to experiment with Javascript that requires build tools, you're in luck. There's a gulp task called `browserify`. This task is commented out by default, but if you uncomment it and the `watch` line just above it in the Gulpfile, you'll have a task ready to build JS files with [Browserify](http://browserify.org/) and then transpile them with [Babel](https://babeljs.io/), then reload the browser with the new files.

The task for handling this is designed to watch `./public/javascripts/app/app.js`. By default, this file is setup for react but all contents are commented out. To get started, follow the directions in the file then start writing your code. If all components and modules live inside this directory, then the `browserify` task will be run everytime a file is changed. Files are automatically compiled with Sourcemaps to help improve the debugging workflow. On successful compilation, the browser is reloaded. To enable it, add this line of erb somewhere in the view `<% @app = true %>`. By default, new views created with the `gulp create` task will have that variable set to false. Setting it to true will include `/public/javascripts/compiled/app-compiled.js` in the view, which will have everything that Browserify and Babel create.

## Contributing

The overarching goal of this project is to remove a lot of the work required for learning or prototyping ideas. Any and all ideas and PRs towards that end are welcome. I'd love to expand this to include some sort of built-in database capabilities so I can sketch out API ideas and such. If you have thoughts or want to add a feature, feel free to open a Github issue first so we can discuss it. Also, feel free to fork and hack to your own needs.
