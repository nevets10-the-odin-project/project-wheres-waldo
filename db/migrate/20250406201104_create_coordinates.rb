class CreateCoordinates < ActiveRecord::Migration[8.0]
  def change
    create_table :coordinates do |t|
      t.references :image, null: false, foreign_key: true
      t.references :character, null: false, foreign_key: true
      t.integer :start_x, null: false
      t.integer :start_y, null: false
      t.integer :end_x, null: false
      t.integer :end_y, null: false

      t.timestamps
    end
  end
end
