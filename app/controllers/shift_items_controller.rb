class ShiftItemsController < ApplicationController

	def new
		@shiftitem = ShiftItem.new
	end

	def create
		Shift.find(params[:shift_id]).create_shifts_starting_in(params[:start_weeks].to_i, params[:slots].to_i)
		redirect_to shifts_path
	end

	def sub
		@shiftitem = ShiftItem.find(params[:id])
		@shiftitem.sub_id = current_user.id
		@shiftitem.save

		UserMailer.sub_email(current_user, params[:id]).deliver_now
		redirect_to shifts_path
	end

	def subfill
		@shiftitem = ShiftItem.find(params[:id])
	end

	def subupdate
		@shiftitem = ShiftItem.find(params[:id])
		@shiftitem.replace_user(@shiftitem.sub_id, current_user.id)
		@shiftitem.sub_id = nil
		@shiftitem.save

		redirect_to current_user
	end

	def log
		@shiftitem = ShiftItem.find(params[:id])
	end

	def logupdate
		@shiftitem = ShiftItem.find(params[:id])
		@shiftitem.update(shiftitem_log_params)
		redirect_to current_user
	end

	private

  def shiftitem_log_params
    params.require(:shift_item).permit(:pounds)
  end

end