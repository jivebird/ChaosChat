require 'sinatra/base'

class ChaosChat < Sinatra::Base
  get '/' do
    'Login'
  end
end
