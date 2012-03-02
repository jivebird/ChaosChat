require 'sinatra/base'

class ChaosChat < Sinatra::Base
  get '/' do
    'Hello, world!'
  end
end
