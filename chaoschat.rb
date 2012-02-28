require 'bundler/setup'
require 'sinatra'
require 'mongo_mapper'
require 'mustache/sinatra'

class ChaosChat < Sinatra::Base
	get '/' do
		'hello world'
	end
end
