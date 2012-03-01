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
	
	it('user name is saved on login', function() {
		loginController.userName = 'Boot';
		login();
		
		expect(Chat.userModel.userName).toEqual('Boot');
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
		expect(chatController.get('message')).toEqual('');
		expect(chatController.get('content').length).toEqual(0);
	});
	
	it('can add a message', function() {
		Chat.userModel.set('userName', 'The signed in user');
		chatController.set('message', 'new message');
		chatController.send();
		
		expect(chatController.get('content').length).toEqual(1)
		expect(chatController.get('content')[0].user).toEqual('The signed in user');
		expect(chatController.get('content')[0].message).toEqual('new message');
	});
	
	it('can be cleared', function() {
		chatController.set('message', 'new message');
		chatController.send();
		chatController.clear();
		
		expect(chatController.get('message')).toEqual('');
		expect(chatController.get('content').length).toEqual(0);	
	});
});
