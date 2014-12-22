class Shift < ActiveRecord::Base
	has_many :user_shifts
	has_many :users, through: :user_shifts

	def self.filled
		self.all.select{|shift| shift.users.count == shift.volunteer_number}
	end

	def self.open
		self.all.select{|shift| shift.users.count < shift.volunteer_number}
	end
end
