require 'bundler/setup'
require 'mongo_mapper'
require 'sinatra'
require 'sinatra/config_file'

config_file 'chaos-config.yaml'

class ChaosChat < Sinatra::Base
	get '/' do
		'hello world'
	end
end
