require 'spec_helper'
require File.join(File.dirname(__FILE__), '..', 'services')

describe UserService do
	it "checks if a user exists" do
		service = UserService.new
		service.user_exists?("test").should eq(false)
	end
	it "creates users" do
		service = UserService.new
		service.create_user("test")
		service.user_exists?("test").should eq(true)
	end
end
