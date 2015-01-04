class CreateShiftItems < ActiveRecord::Migration
  def change
    create_table :shift_items do |t|
      t.datetime :day

      t.timestamps null: false
    end
  end
end
