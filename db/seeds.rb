# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

%w[Waldo Wilma Odlaw].each do |name|
  Character.find_or_create_by!(name: name)
end

[
  { name: 'In Town', file_name: 'https://ia600106.us.archive.org/BookReader/BookReaderImages.php?zip=/4/items/whereswaldo87/whereswaldo87_jp2.zip&file=whereswaldo87_jp2/whereswaldo87_0003.jp2&id=whereswaldo87&scale=2&rotate=0' }
].each do |image|
  Image.find_or_create_by!(name: image[:name], file_name: image[:file_name])
end

[
  {
    image_id: 1,
    character_id: 1,
    start_x: 2535,
    start_y: 1665,
    end_x: 2662,
    end_y: 1843
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
