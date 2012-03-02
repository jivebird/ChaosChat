Chat = Ember.Application.create();

Chat.UserModel = Em.Object.extend({
	userName: '',
	
	setMainUser: function(user) {
		this.set('userName', user);
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
		Chat.userModel.setMainUser(this.userName);
	}
});

Chat.Entry = Em.Object.extend({
	user: null,
	message: null
});

Chat.chatController = Em.ArrayController.create({
	init: function() {
		this.clear();
	},
	
	addMessage: function(userName, message) {
		this.pushObject(Chat.Entry.create({ user: userName, message: message }));
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

