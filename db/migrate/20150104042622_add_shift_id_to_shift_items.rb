class AddShiftIdToShiftItems < ActiveRecord::Migration
  def change
    add_column :shift_items, :shift_id, :integer
  end
end
