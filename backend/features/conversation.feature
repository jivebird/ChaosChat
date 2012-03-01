Feature: Have a conversation
	When I say something, I want to to say something smart
	
	Scenario: Greetings
		Given I can see you
		When I say "Hello"
		Then you should say "Howdy Sailor"
		
	Scenario: Poor Greeting
		Given I can see you
		When I say "Hello"
		And I say "Hello"
		Then you should say "SHUTUP"
