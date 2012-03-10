require 'sinatra/base'

class ChaosChat < Sinatra::Base
	get '/' do
		erb :homepage
    	end
	post '/login' do
		erb :chat, :locals => {:username => params[:username]}
	end
end
