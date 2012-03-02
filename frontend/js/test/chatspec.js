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
		
		var user = Chat.User.create({ userName: 'Boot' });
		expect(Chat.userModel.setMainUser).toHaveBeenCalledWith(user);
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
		isEmpty();
	});
	
	it('can be cleared', function() {
		sendMessage('new message');
		chatController.clear();
		
		isEmpty();
	});
	
	it('can add a message', function() {
		setMainUser();
		sendMessage('new message');
		
		hasMessages([{ user: 'The signed in user', message: 'new message' }]);
	});
	
	it('can add multiple messages', function() {
		setMainUser();
		sendMessage('new message');
		sendMessage('another message');
		
		hasMessages([
			{ user: 'The signed in user', message: 'new message' },
			{ user: 'The signed in user', message: 'another message' }
		]);
	});
	
	it('reloads the user name when the user is reloaded', function() {
		setMainUser();
		sendMessage('new message');
		setMainUser('Updated Name');
		
		hasMessages([{ user: 'Updated Name', message: 'new message' }]);
	});
	
	function setMainUser(userName) {
		userName = userName != null ? userName : 'The signed in user';
		var user = Chat.User.create({ userName: userName });
		Chat.userModel.setMainUser(user);
	}
	
	function sendMessage(message) {
		chatController.set('message', message);
		chatController.send();
	}
	
	function isEmpty() {
		expect(chatController.get('message')).toEqual('');
		expect(chatController.get('content').length).toEqual(0);	
	}
	
	function hasMessages(messages) {
		var content = chatController.get('content');
		expect(content.length).toEqual(messages.length)
		
		waits(10, function() {
			for(var i = 0; i < messages.length; i++) {
				expect(content[i].get('user')).toEqual(messages[i].user);
				expect(content[i].get('message')).toEqual(messages[i].message);
			}
		});
	}
});

describe('Users are stored and managed', function() {
	var userModel;
	
	beforeEach(function() {
		userModel = new Chat.UserModel();
	});
	
	it('starts empty', function() {
		isEmpty();
	});
	
	it('can be cleared', function() {
		userModel.setMainUser('Big Fella');
		userModel.clear();
		
		isEmpty();
	});
	
	it('can load the main user', function() {
		var user = Chat.User.create({ userName: 'Big Fella' });
		userModel.setMainUser(user);
		
		expect(userModel.get('userName')).toEqual('Big Fella');
	});
	
	function isEmpty() {
		expect(userModel.get('userName')).toEqual('');
	}
});
