Chat = Ember.Application.create();

Chat.User = Em.Object.extend({
	userName: ''
});

Chat.UserModel = Em.Object.extend({
	init: function() {
		this.userName = '';
		this.users = [];
	},
	
	loadMainUser: function(user) {
		this.set('userName', user.userName);
	},
	
	loadUser: function(user) {
		this.get('users').pushObject(user);
	},
	
	clear: function() {
		this.set('users', []);
		this.set('userName', '');
	}
});

Chat.userModel = Chat.UserModel.create();

Chat.Message = Em.Object.extend({
	text: '',
	isMainUser: false,
	
	_mainUserBinding: 'Chat.userModel.userName',
	_usersBinding: 'Chat.userModel.users',
	
	user: function() {
		return this.get('isMainUser') ? this.get('_mainUser') : this.get('_users')[this.get('userIndex')].get('userName');
	}.property('_mainUser', '_users')
});

Chat.MessageModel = Em.Object.extend({
	init: function() {
		this.clear();
	},
	
	clear: function() {
		this.set('messages', []);
	},
	
	addMessage: function(text, user) {
		var message = Chat.Message.create({ text: text });
		message.set('userIndex', user);
		message.set('isMainUser', user == null);
		this.get('messages').push(message);
	},
	
	getMessage: function(index) {
		return this.get('messages').get(index);
	},
	
	messageCount: function() {
		return this.get('messages').length;
	}.property('messages')
});

Chat.messageModel = Chat.MessageModel.create();

Chat.ChatService = Em.Object.extend({
	sendMessage: function(text) {
		// Stubbed
	}
});

Chat.loginController = Em.Object.create({
	loggedIn: false,
	userName: '',
	
	login: function() {
		var view = Em.View.create({ templateName: 'chatView' });
		view.append();
		this.set('loggedIn', true);
		
		var user = Chat.User.create({ userName: this.userName });
		Chat.userModel.loadMainUser(user);
	}
});

Chat.Entry = Em.Object.extend({
	userBinding: 'Chat.userModel.userName',
	message: null
});

Chat.chatController = Em.ArrayController.create({
	contentBinding: 'Chat.messageModel.messages',
	
	init: function() {
		this.clear();
	},
	
	addMessage: function(userName, message) {
		var entry = Chat.Entry.create({ message: message });
		this.pushObject(entry);
	},
	
	send: function() {
		this.addMessage(Chat.userModel.get('userName'), this.get('message'));
		this.set('message', '');
	},
	
	clear: function() {
		this.set('message', '');
	}
});

