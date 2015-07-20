ENV['RACK_ENV'] ||= 'development'

require 'rubygems'
require 'bundler'
require 'sinatra'

Bundler.require(:default, ENV['RACK_ENV'].to_sym)

require File.expand_path '../playground.rb', __FILE__
run Playground
