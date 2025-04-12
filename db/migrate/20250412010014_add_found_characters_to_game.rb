class AddFoundCharactersToGame < ActiveRecord::Migration[8.0]
  def change
    add_column :games, :found_characters, :string
  end
end
