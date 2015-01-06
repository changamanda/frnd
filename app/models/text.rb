class Text < ActiveRecord::Base

	def self.send_text_message(shiftitem, user)
  	# Get your Account Sid and Auth Token from twilio.com/user/account
		account_sid = ENV['TWILIO_ACCOUNT_SID']
		auth_token = ENV['TWILIO_AUTH_TOKEN']
		 
		# set up a client to talk to the Twilio REST API 
		@client = Twilio::REST::Client.new account_sid, auth_token 
		 
		@client.account.messages.create({
			:from => '+19733097348', 
			:to => "+1#{user.phone}", 
			:body => "Hey, #{user.name}! This is a reminder that you have a shift today at #{shiftitem.dayf}."
		})
  end

end
