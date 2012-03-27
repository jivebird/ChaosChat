require 'spec_helper'
require File.join(File.dirname(__FILE__), '..', 'chaoschat')

ENV['RACK_ENV'] = 'test'

describe ChaosChat do
	def app
		ChaosChat
	end

	let(:test_username) { $test_user = 'test_user' }

	def login_as_test_user
		post '/in', params={:name=>test_username}
	end

	it 'logs in' do
		login_as_test_user
		follow_redirect!
		rack_mock_session.cookie_jar['name'].should == test_username
		last_response.should be_ok
	end
end
