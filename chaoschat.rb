require 'bundler/setup'
require 'sinatra'
require 'mongo_mapper'

class ChaosChat < Sinatra::Base
	get '/' do
		'hello world'
	end
end
