require 'rubygems'
require 'bundler'
Bundler.require(:default)
require 'rack-livereload'

require './playground'

# live reload
use Rack::LiveReload

run Playground.new