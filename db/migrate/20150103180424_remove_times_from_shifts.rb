class RemoveTimesFromShifts < ActiveRecord::Migration
  def change
  	remove_column :shifts, :start_time
  	remove_column :shifts, :end_time
  end
end
