require 'mongoid'

class User
	include Mongoid::Document
	field :handle, type: String
	validates_presence_of :handle
	validates_uniqueness_of :handle
end
