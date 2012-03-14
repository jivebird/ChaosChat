require 'sinatra/base'

class ChaosChat < Sinatra::Base
	get '/' do
		"Hello, World"
	end
end
