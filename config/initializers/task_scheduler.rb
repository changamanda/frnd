# scheduler = Rufus::Scheduler.new

# scheduler.cron("00 08 * * *") do
#   ShiftItem.today.each do |shiftitem|
#   	shiftitem.users.each do |user|
#   		Text.send_text_message(shiftitem, user)
#   	end
#   end
# end