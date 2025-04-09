class CreateGames < ActiveRecord::Migration[8.0]
  def change
    create_table :games do |t|
      t.references :image, null: false, foreign_key: true
      t.datetime :start_time, null: false
      t.datetime :end_time
      t.string :initials
      t.string :session_id, null: false

      t.timestamps
    end
  end
end
