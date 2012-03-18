require 'sinatra/base'

class ChaosChat < Sinatra::Base
	post '/user/:name' do |name|
		redirect '/user/'+name
	end
	get '/user/:name' do |name|
		'hello ' + name
	end
end
