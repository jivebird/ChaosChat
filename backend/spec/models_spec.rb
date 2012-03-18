require 'spec_helper'
require File.join(File.dirname(__FILE__), '..', 'models')
require 'mongoid-rspec'

describe Chat do
	it { should embed_many(:posts) }
end

describe Post do
	it { should have_field(:text).of_type(String) }
end
