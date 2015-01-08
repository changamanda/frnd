class AddPoundsToShiftItems < ActiveRecord::Migration
  def change
    add_column :shift_items, :pounds, :float
  end
end
