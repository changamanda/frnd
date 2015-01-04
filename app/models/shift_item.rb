class ShiftItem < ActiveRecord::Base
	has_many :user_shift_items
	has_many :users, through: :user_shift_items
	belongs_to :shift
end
