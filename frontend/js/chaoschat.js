Chat = Ember.Application.create();

Chat.User = Em.Object.extend({
	userName: ''
});

Chat.UserModel = Em.Object.extend({
	userName: '',
	
	setMainUser: function(user) {
		this.set('userName', user.userName);
	},
	
	clear: function() {
		this.set('userName', '');
	}
});

Chat.userModel = Chat.UserModel.create();

Chat.loginController = Em.Object.create({
	loggedIn: false,
	userName: '',
	
	login: function() {
		var view = Em.View.create({ templateName: 'chatView' });
		view.append();
		this.set('loggedIn', true);
		
		var user = Chat.User.create({ userName: this.userName });
		Chat.userModel.setMainUser(user);
	}
});

Chat.Entry = Em.Object.extend({
	userBinding: 'Chat.userModel.userName',
	message: null
});

Chat.chatController = Em.ArrayController.create({
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
		this.set('content', []);
		this.set('message', '');
	}
});

