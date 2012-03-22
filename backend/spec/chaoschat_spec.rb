require 'spec_helper'
require File.join(File.dirname(__FILE__), '..', 'chaoschat')

ENV['RACK_ENV'] = 'test'

describe ChaosChat do
	def app
		ChaosChat
	end

	it 'logs in' do
		post '/in', params={:name=>'test'}
		follow_redirect!
		last_response.should be_ok
	end
end
