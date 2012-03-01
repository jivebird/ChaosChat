Chat = Ember.Application.create();

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

