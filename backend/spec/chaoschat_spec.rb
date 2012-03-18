require 'spec_helper'
require File.join(File.dirname(__FILE__), '..', 'chaoschat')

ENV['RACK_ENV'] = 'test'

describe ChaosChat do
	def app
		ChaosChat
	end

	it 'says Hello, World' do
		get '/'
		last_response.should be_ok
		last_response.body.should == 'Hello, World'
	end
end
