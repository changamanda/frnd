class ShiftsController < ApplicationController

	def index
		@shift = Shift.new
	end

	def create
		@shift = Shift.create(shift_params)
		redirect_to shifts_path
	end

	private

  def shift_params
    params.require(:shift).permit(:volunteer_number, :weekday, :time)
  end

end
