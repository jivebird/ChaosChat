require 'mongoid'

class Chat
	include Mongoid::Document
	embeds_many :posts
end

class Post
	include Mongoid::Document
	field :text, type: String
	embedded_in :chat
end
