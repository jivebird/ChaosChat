function wait() {
	waits(100);
};

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
		spyOn(Chat.userModel, 'loadMainUser');
		loginController.userName = 'Boot';
		login();
		
		var user = Chat.User.create({ userName: 'Boot' });
		expect(Chat.userModel.loadMainUser).toHaveBeenCalledWith(user);
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
		Chat.messageModel.clear();
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
		runs(function() {
			loadMainUser();
			sendMessage('new message');
		});
		
		wait();
		
		runs(function() {
			hasMessages([{ user: 'The signed in user', message: 'new message' }]);
		});
	});
	
	it('can add multiple messages', function() {
		runs(function() {
			loadMainUser();
			sendMessage('new message');
			sendMessage('another message');
		});
		
		wait();
		
		runs(function() {
			hasMessages([
				{ user: 'The signed in user', message: 'new message' },
				{ user: 'The signed in user', message: 'another message' }
			]);
		});
	});
	
	it('can send messages from other users', function() {
		runs(function() {
			loadMainUser();
			var subUsers = [createUser('first'), createUser('second')];
			Chat.userModel.loadUser(subUsers[0]);
			Chat.userModel.loadUser(subUsers[1]);
			
			sendMessage('message 0', 0);
			sendMessage('main message');
			sendMessage('message 1', 1);
		});
		
		wait();
		
		runs(function() {
			hasMessages([
				{ user: 'first', message: 'message 0' },
				{ user: 'The signed in user', message: 'main message' },
				{ user: 'second', message: 'message 1' }
			]);
		});
	});
	
	it('reloads the user name when the user is reloaded', function() {
		runs(function() {
			loadMainUser();
			sendMessage('new message');
			loadMainUser('Updated Name');
		});
		
		wait();
		
		runs(function() {
			hasMessages([{ user: 'Updated Name', message: 'new message' }]);
		});
	});
	
	function loadMainUser(userName) {
		userName = userName != null ? userName : 'The signed in user';
		var user = Chat.User.create({ userName: userName });
		Chat.userModel.loadMainUser(user);
	}
	
	function sendMessage(message, user) {
		Chat.messageModel.addMessage(message, user);
	}
	
	function isEmpty() {
		expect(chatController.get('message')).toEqual('');
	}
	
	function hasMessages(messages) {
		var content = chatController.get('content');
		expect(content.length).toEqual(messages.length)
		
		for(var i = 0; i < messages.length; i++) {
			expect(content[i].get('user')).toEqual(messages[i].user);
			expect(content[i].get('text')).toEqual(messages[i].message);
		}
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
		userModel.loadMainUser(createUser('Big Fella'));
		var subUsers = [createUser('first'), createUser('second')];
		userModel.loadUser(subUsers[0]);
		userModel.loadUser(subUsers[1]);
		userModel.clear();
		
		isEmpty();
	});
	
	it('can load the main user', function() {
		var user = createUser('Big Fella');
		userModel.loadMainUser(user);
		
		expect(userModel.get('userName')).toEqual('Big Fella');
	});
	
	it('can load other users', function() {
		var subUsers = [createUser('first'), createUser('second')];
		userModel.loadUser(subUsers[0]);
		userModel.loadUser(subUsers[1]);
		
		expect(userModel.get('users').get(0)).toEqual(subUsers[0]);
		expect(userModel.get('users').get(1)).toEqual(subUsers[1]);
	});
	
	function isEmpty() {
		expect(userModel.get('userName')).toEqual('');
		expect(userModel.get('users').length).toEqual(0);
	}
});

function createUser(userName) {
	return Chat.User.create({ userName: userName });
}

describe('Chat info is stored and managed', function() {
	var messageModel;
	
	beforeEach(function() {
		messageModel = Chat.MessageModel.create();
	});
	
	it('can have messages added from the main user', function() {
		messageModel.addMessage('new message');
		hasMainUserMessage(0, 'new message');
	});
	
	it('can have messages added from sub users', function() {
		messageModel.addMessage('new message', 2);
		hasSubUserMessage(0, 2, 'new message');
	});
	
	it('can have multiple messages added', function() {
		messageModel.addMessage('new message');
		messageModel.addMessage('another message', 5);
		
		hasMainUserMessage(0, 'new message');
		hasSubUserMessage(1, 5, 'another message');
	});
	
	it('tracks message count', function() {
		messageModel.addMessage('new message');
		messageModel.addMessage('another message', 5);
		
		expect(messageModel.get('messageCount')).toEqual(2);
	});
	
	it('can be cleared', function() {
		messageModel.addMessage('new message');
		messageModel.addMessage('another message', 5);
		messageModel.clear();
		
		expect(messageModel.get('messageCount')).toEqual(0);
	});
	
	function hasMainUserMessage(index, text) {
		var message = messageModel.getMessage(index);
		expect(message.isMainUser).toEqual(true);
		expect(message.text).toEqual(text);
	}
	
	function hasSubUserMessage(index, user, text) {
		var message = messageModel.getMessage(index);
		expect(message.isMainUser).toEqual(false);
		expect(message.get('userIndex')).toEqual(user);
		expect(message.text).toEqual(text);
	}
});

describe('Chat info is sent and received from the server', function() {
	var service;
	
	beforeEach(function() {
		service = Chat.ChatService.create();
	});
	
	it('sends messages to the server from the main user', function() {
		service.sendMessage('message');
	});
});
