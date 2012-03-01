Chat = Ember.Application.create();

Chat.UserModel = Em.Object.extend({
	userName: ''
});

Chat.userModel = new Chat.UserModel();

Chat.loginController = Em.Object.create({
	loggedIn: false,
	userName: '',
	
	login: function() {
		var view = Em.View.create({ templateName: 'chatView' });
		view.append();
		this.set('loggedIn', true);
		Chat.userModel.set('userName', this.userName);
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
		this.addMessage('Boot', this.get('message'));
		this.set('message', '');
	},
	
	clear: function() {
		this.set('content', []);
		this.set('message', '');
	}
});

