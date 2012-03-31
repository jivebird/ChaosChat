require 'mongoid'
require File.join(File.dirname(__FILE__), 'models') 

class UserService
	def create_user(name)
		User.create!(name:name)
		mongoid.save
	end
	def user_exists?(name)
		false
	end
end
