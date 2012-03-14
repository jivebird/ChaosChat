require 'spec_helper'
require File.join(File.dirname(__FILE__), '..', 'user')
require 'mongoid-rspec'

describe User do
	it { should have_field(:handle) }
end
