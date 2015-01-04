class UserShiftsController < ApplicationController

	def create
		current_user.signup(Shift.find(params[:shift_id]))
		redirect_to shifts_path
	end

end
