require 'spec_helper'
require File.join(File.dirname(__FILE__), '..', 'models')
require 'mongoid-rspec'

describe User do
	it { should have_field(:name).of_type(String) }
	it { should validate_presence_of(:name) }
	it { should validate_uniqueness_of(:name) }
	it { should have_and_belong_to_many(:chats) }
end

describe Chat do
	it { should have_and_belong_to_many(:users) }
	it { should embed_many(:posts) }
end

describe Post do
	it { should have_field(:text).of_type(String) }
end
