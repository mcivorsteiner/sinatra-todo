class CreateTasks < ActiveRecord::Migration
  def change
    create_table :tasks do |t|
      t.text :description
      t.boolean :complete, default: false
      t.date :date_completed
      t.timestamps
    end
  end
end
