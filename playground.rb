require 'sinatra'

class Playground < Sinatra::Base
  get '/' do
    erb :index
  end

  get '/react' do
    @footer = "footer-react"
    erb :react
  end
end
