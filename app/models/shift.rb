class Shift < ActiveRecord::Base
	has_many :user_shifts
	has_many :users, through: :user_shifts
	has_many :shift_items

	def create_shifts(weeks)
		create_shifts_starting_in(0, weeks)
	end

	def create_shifts_starting_in(start_week, weeks)
		for i in (start_week)..(start_week + weeks - 1)
			day = Chronic.parse("#{i} weeks from now #{self.weekday} #{self.time}")
			if (day.to_s[-3..-1].to_i == 500)
				day = DateTime.parse(day.to_s[0..-4] + (day.to_s[-3..-1].to_i + 100).to_s)
			end
			shiftitem = ShiftItem.create(day: day, shift_id: self.id)
			shiftitem.users << self.users
			shiftitem.save
		end
	end

	def filled
		self.users.count >= self.volunteer_number
	end

	def open
		self.users.count < self.volunteer_number
	end

	def today?
		self.weekday == Time.now.strftime("%A")
	end

	def self.filled
		self.all.select{|shift| shift.filled}
	end

	def self.open
		self.all.select{|shift| shift.open}
	end
end
