class UserShiftItem < ActiveRecord::Base
	belongs_to :shift_item
	belongs_to :user
end
