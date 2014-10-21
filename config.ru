ENV['RACK_ENV'] ||= 'development'

require 'rubygems'
require 'bundler'

Bundler.require(:default, ENV['RACK_ENV'].to_sym)

configure :development do
  require 'rack-livereload'
  # live reload
  use Rack::LiveReload, :no_swf => true
end

require './playground'
run Playground
