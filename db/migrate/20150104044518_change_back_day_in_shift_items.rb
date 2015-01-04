class ChangeBackDayInShiftItems < ActiveRecord::Migration
  def change
  	change_column :shift_items, :day, :datetime
  end
end
