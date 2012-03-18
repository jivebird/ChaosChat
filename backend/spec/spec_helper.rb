require 'mongoid-rspec'
require 'rack/test'

RSpec.configure do |configuration|
	configuration.include Mongoid::Matchers
	configuration.include Rack::Test::Methods
end
