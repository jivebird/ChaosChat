require 'bundler/setup'
require 'sinatra'

class ChaosChat < Sinatra::Base
	get '/' do
		'hello world'
	end
end
