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
		chatController.set('message', 'new message');
		chatController.send();
		
		expect(chatController.get('content').length).toEqual(1)
		expect(chatController.get('content')[0].user).toEqual('Boot');
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
