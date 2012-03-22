require 'sinatra/base'

class ChaosChat < Sinatra::Base
	post '/in' do
		redirect '/user/'+params[:name]
	end
	get '/user/:name' do |name|
		'hello ' + name
	end
end
