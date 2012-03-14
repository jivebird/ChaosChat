require 'mongoid-rspec'

RSpec.configure do |configuration|
	configuration.include Mongoid::Matchers
end
