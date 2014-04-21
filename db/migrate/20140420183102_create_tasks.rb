class CreateTasks < ActiveRecord::Migration
  def change
    create_table :tasks do |t|
      t.integer :display_id
      t.text :description
      t.boolean :complete
      t.date :date_completed
      t.timestamps
    end
  end
end
