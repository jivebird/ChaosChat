require File.join(File.dirname(__FILE__), '..', 'chaoschat.rb')
require 'rspec'
require 'rack/test'

ENV['RACK_ENV'] = 'test'

describe 'ChaosChat' do
	include Rack::Test::Methods

	def app
		ChaosChat
	end

	it "shows the homepage" do
		get '/'
		last_response.should be_ok
	end
end
