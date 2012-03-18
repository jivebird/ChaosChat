require 'mongoid'

class User
	include Mongoid::Document
	field :name, type: String
	validates_presence_of :name
	validates_uniqueness_of :name
	has_and_belongs_to_many :chats	
end

class Chat
	include Mongoid::Document
	has_and_belongs_to_many :users
	embeds_many :posts
end

class Post
	include Mongoid::Document
	field :text, type: String
	embedded_in :chat
end
