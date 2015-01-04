class CreateUserShiftItems < ActiveRecord::Migration
  def change
    create_table :user_shift_items do |t|
      t.integer :user_id
      t.integer :shift_item_id

      t.timestamps null: false
    end
  end
end
