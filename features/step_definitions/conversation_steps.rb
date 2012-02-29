class You
	def say(word)
		if @response == 'Howdy Sailor'
			@response = 'SHUTUP'
		else
			@response = 'Howdy Sailor'
		end
	end
	
	def response
		@response
	end
end

you = nil

Given /^I can see you$/ do
	you = You.new
end

When /^I say "([^"]*)"$/ do |say|
 you.say(say)
end

Then /^you should say "([^"]*)"$/ do |response|
  you.response.should == response
end

