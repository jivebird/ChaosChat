require 'sinatra/base'

class ChaosChat < Sinatra::Base
	post '/in' do
		name = params[:name]
		response.set_cookie 'name', :value => name
		redirect '/chats'
	end
	get '/chats' do
		''
	end
end
