%w[Waldo Wilma Wizard Odlaw Woof].each do |name|
  Character.find_or_create_by!(name: name)
end

[
  { name: 'In Town',
    file_name: 'https://ia800402.us.archive.org/1/items/wheres-waldo-archive/01%20-%20Where%27s%20Waldo/1997%20-%20Where%27s%20Waldo%20Special%20Edition/book1-1997-scene01-in-town-600dpi.jpg' },
  { name: 'On The Beach',
    file_name: 'https://ia800402.us.archive.org/1/items/wheres-waldo-archive/01%20-%20Where%27s%20Waldo/1997%20-%20Where%27s%20Waldo%20Special%20Edition/book1-1997-scene02-on-the-beach-600dpi.jpg' },
  { name: 'Fairground', file_name: 'https://ia800402.us.archive.org/1/items/wheres-waldo-archive/01%20-%20Where%27s%20Waldo/1997%20-%20Where%27s%20Waldo%20Special%20Edition/book1-1997-scene12-fairground-600dpi.jpg' }
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
  },
  {
    image_id: 2,
    character_id: 1,
    start_x: 1249,
    start_y: 441,
    end_x: 1290,
    end_y: 523
  },
  {
    image_id: 2,
    character_id: 2,
    start_x: 1582,
    start_y: 491,
    end_x: 1608,
    end_y: 524
  },
  {
    image_id: 2,
    character_id: 3,
    start_x: 528,
    start_y: 415,
    end_x: 568,
    end_y: 464
  },
  {
    image_id: 2,
    character_id: 4,
    start_x: 181,
    start_y: 420,
    end_x: 205,
    end_y: 484
  },
  {
    image_id: 2,
    character_id: 5,
    start_x: 1392,
    start_y: 453,
    end_x: 1409,
    end_y: 465
  },
  {
    image_id: 3,
    character_id: 1,
    start_x: 1490,
    start_y: 651,
    end_x: 1517,
    end_y: 699
  },
  {
    image_id: 3,
    character_id: 2,
    start_x: 193,
    start_y: 974,
    end_x: 219,
    end_y: 1019
  },
  {
    image_id: 3,
    character_id: 3,
    start_x: 839,
    start_y: 726,
    end_x: 879,
    end_y: 774
  },
  {
    image_id: 3,
    character_id: 4,
    start_x: 1195,
    start_y: 343,
    end_x: 1218,
    end_y: 374
  },
  {
    image_id: 3,
    character_id: 5,
    start_x: 939,
    start_y: 1123,
    end_x: 965,
    end_y: 1141
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
