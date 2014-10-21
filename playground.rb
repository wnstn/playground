require 'sinatra'

class Playground < Sinatra::Base
  get '/' do
    erb :index
  end

  get '/react' do
    erb :react
  end
end
