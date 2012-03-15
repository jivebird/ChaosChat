require 'spec_helper'
require File.join(File.dirname(__FILE__), '..', 'user')
require 'mongoid-rspec'

describe User do
	it { should have_field(:handle).of_type(String) }
	it { should validate_presence_of(:handle) }
	it { should validate_uniqueness_of(:handle) }
end
