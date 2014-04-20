require 'sinatra'

class Playground < Sinatra::Base
  get '/' do
    erb :index
  end
end