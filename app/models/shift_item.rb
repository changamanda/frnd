class ShiftItem < ActiveRecord::Base
	has_many :user_shift_items
	has_many :users, -> {uniq}, through: :user_shift_items
	belongs_to :shift

	def replace_user(old_id, new_id)
		self.users.delete(User.find(old_id))
		self.users << User.find(new_id)
	end

	def dayf
		self.day.strftime("%a %b %e, %Y%l:%M %Z")
	end

	def self.today
		now = Time.now.to_date
		self.all.select do |shiftitem|
			shiftitem.day.to_date == now.to_date
		end
	end
end
