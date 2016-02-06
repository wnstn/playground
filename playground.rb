require 'sinatra/base'

class Playground < Sinatra::Base
  enable :logging, :dump_errors, :raise_errors
  set :root, File.dirname(__FILE__)
  set :dev, settings.development?
  set :dump_errors, false

  get '/' do
    @wrapperClass = 'index'
    @js = 'index'
    erb :index
  end

  get '/*' do
    id = params['splat'].first
    @wrapperClass = id
    @js = id.gsub(/-/, '_')

    erb id.to_sym
  end

  error Exception do
    # paths should return a 404 page, files should return a string response
    if /(?<=\w)[.](?=\w)/.match(request.path_info)
      "file not found"
    else
      erb :'errors/404'
    end
  end
end
