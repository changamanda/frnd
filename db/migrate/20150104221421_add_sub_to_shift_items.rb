class AddSubToShiftItems < ActiveRecord::Migration
  def change
    add_column :shift_items, :sub_id, :integer
  end
end
