Feature: Logging into chat
	Scenario: New user logging in
		Given I am on the homepage
		When I fill in "AwesomeGuy" for "username"
		And I press "submit"
		Then I should see "AwesomeGuy"
