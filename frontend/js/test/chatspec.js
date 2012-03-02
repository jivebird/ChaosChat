describe('Logging in', function() {
	var loginController;
	var view;
	
	beforeEach(function() {
		loginController = Chat.loginController;
	});
	
	it('starts out shown', function() {
		expect(loginController.loggedIn).toEqual(false);
	});
	
	it('switches views on login', function() {
		login();
		
		expect(Em.View.create).toHaveBeenCalledWith({ templateName: 'chatView' });
		expect(view.append).toHaveBeenCalled();
		expect(loginController.loggedIn).toEqual(true);
	});
	
	it('user loaded on login', function() {
		spyOn(Chat.userModel, 'setMainUser');
		loginController.userName = 'Boot';
		login();
		
		expect(Chat.userModel.setMainUser).toHaveBeenCalledWith('Boot');
	});
	
	function login() {
		view = jasmine.createSpyObj('view', ['append']);
		
		spyOn(Em.View, 'create').andReturn(view);
		loginController.login();
	}
});

describe('Chatting', function() {
	var chatController;
	
	beforeEach(function() {
		chatController = Chat.chatController;
	});
	
	afterEach(function() {
		chatController.clear();
	});
	
	it('starts empty', function() {
		controllerIsEmpty();
	});
	
	it('can add a message', function() {
		Chat.userModel.setMainUser('The signed in user');
		sendMessage('new message');
		
		hasMessages([{ user: 'The signed in user', message: 'new message' }]);
	});
	
	it('can be cleared', function() {
		sendMessage('new message');
		chatController.clear();
		
		controllerIsEmpty();
	});
	
	function sendMessage(message) {
		chatController.set('message', message);
		chatController.send();
	}
	
	function controllerIsEmpty() {
		expect(chatController.get('message')).toEqual('');
		expect(chatController.get('content').length).toEqual(0);	
	}
	
	function hasMessages(messages) {
		var content = chatController.get('content');
		expect(content.length).toEqual(messages.length)
		
		for(var i = 0; i < messages.length; i++) {
			expect(content[i].get('user')).toEqual(messages[i].user);
			expect(content[i].get('message')).toEqual(messages[i].message);
		}
	}
});
