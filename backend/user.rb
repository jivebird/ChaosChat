require 'mongoid'

class User
	include Mongoid::Document
	field :handle
end
