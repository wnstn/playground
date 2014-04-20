# Playground

A simple, lightweight Sinatra app with all my favorite tools baked in so I can easily jump in and start prototyping an idea or exploring a toolset.

Want to play around yourself? It's simple to get started after you clone the project from Github, assuming you have Ruby installed on your machine and are comfortable with the command line:

1. `cd` into the directory you cloned it into
2. run `gem install bundle`
3. run `bundle`
4. run `guard`
5. visit http://localhost:9292 in your browser

## What is this good for?

I am a big fan of designing in the browser. Sometimes I just need to get in and start coding things out, and this is the easiest way for me to do it. I can create a new view and start working. This app is slightly opinionated - it includes the latest version of jQuery and utilizes Sass for CSS preprocessing, as well as including Thoughtbot's Bourbon and Neat tools. Those are my choices, but it's easy enough to swap them out.

The biggest advantage for me is that by running `guard` I am up and running - Sass changes are automatically compiled and reloaded into the browser, simplifying my workflow.

## OK, so how can I start working?

Well if you just wanted to dive in, start adding HTML to /views/index.erb. Everytime you save, Guard will auto-reload in your browser, so it's easy to do the rapid iteration that we love to do when working on the Front End. Want to style it? Add it to /public/scss/_site.scss. Want to get more advanced? Add a new partial in /public/scss/ and then included it as an `@import` in /public/scss/application.scss. Boom, new styles!

Javascript files are included in /views/partials/footer.erb. Stylesheets and meta tags are in /views/partials/header.erb. You can add new views by mimicking the code in /playground.rb:

```
class Playground < Sinatra::Base
  get '/' do
    erb :index
  end
end
```

So maybe you want to start playing around with d3.js and want a specific view for that. Sweet! Make playground.rb look something like this:

```
class Playground < Sinatra::Base
  get '/' do
    erb :index
  end

  get '/d3' do
    erb :d3
  end
end
```

Then add a new file named `d3.erb` to /views/ and visit http://localhost:9292/d3 in your browser. You should see your default layout. Add some content to d3.erb, save the file, and wow, there it is in your browser.

## Some notes on Sass

I've set up the project according to my favorite ways to work. So /public/scss/application.scss is a manifest file, which calls Bourbon and Neat at the top. Next is variables.scss - which is where you can define all your color variables, media query variables, etc. etc. If you write your own mixins, perhaps add a _mixins.scss file to /public/scss/ and then include it in the manifest. You probably want to add it right under the `@import "variables"` line so that all other files have access to it.

## Cool cool cool

I'd love feedback, thoughts, pull-requests, bug reports, whatever. This is just a fun thing that helps me, so hopefully it helps you too! I'm [@suchwinston](http://twitter.com/suchwinston) on the tweets so get in touch there if you wish.