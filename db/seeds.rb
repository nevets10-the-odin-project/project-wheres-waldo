# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

%w[Waldo Wilma Wizard Odlaw Woof].each do |name|
  Character.find_or_create_by!(name: name)
end

[
  { name: 'In Town', file_name: 'https://ia800402.us.archive.org/1/items/wheres-waldo-archive/01%20-%20Where%27s%20Waldo/1997%20-%20Where%27s%20Waldo%20Special%20Edition/book1-1997-scene01-in-town-600dpi.jpg' }
].each do |image|
  Image.find_or_create_by!(name: image[:name], file_name: image[:file_name])
end

[
  {
    image_id: 1,
    character_id: 1,
    start_x: 872,
    start_y: 938,
    end_x: 937,
    end_y: 1020
  },
  {
    image_id: 1,
    character_id: 2,
    start_x: 887,
    start_y: 759,
    end_x: 919,
    end_y: 801
  },
  {
    image_id: 1,
    character_id: 3,
    start_x: 1324,
    start_y: 978,
    end_x: 1377,
    end_y: 1013
  },
  {
    image_id: 1,
    character_id: 4,
    start_x: 1173,
    start_y: 1206,
    end_x: 1206,
    end_y: 1252
  },
  {
    image_id: 1,
    character_id: 5,
    start_x: 1164,
    start_y: 390,
    end_x: 1187,
    end_y: 407
  }
].each do |coord|
  Coordinate.find_or_create_by!(
    image_id: coord[:image_id],
    character_id: coord[:character_id],
    start_x: coord[:start_x],
    start_y: coord[:start_y],
    end_x: coord[:end_x],
    end_y: coord[:end_y]
  )
end
