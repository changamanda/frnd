class ShiftItemsController < ApplicationController

	def new
		@shiftitem = ShiftItem.new
	end

	def create
		Shift.find(params[:shift_id]).create_shifts_starting_in(params[:start_weeks].to_i, params[:slots].to_i)
		redirect_to shifts_path
	end

end