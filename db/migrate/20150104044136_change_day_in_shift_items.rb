class ChangeDayInShiftItems < ActiveRecord::Migration
  def change
  	change_column :shift_items, :day, :time
  end
end
