class AddInfoToShifts < ActiveRecord::Migration
  def change
    add_column :shifts, :weekday, :string
    add_column :shifts, :time, :string
  end
end
