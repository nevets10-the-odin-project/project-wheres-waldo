# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.0].define(version: 2025_04_06_230814) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_catalog.plpgsql"

  create_table "articles", force: :cascade do |t|
    t.string "title"
    t.text "body"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "characters", force: :cascade do |t|
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "coordinates", force: :cascade do |t|
    t.bigint "image_id", null: false
    t.bigint "character_id", null: false
    t.integer "start_x", null: false
    t.integer "start_y", null: false
    t.integer "end_x", null: false
    t.integer "end_y", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["character_id"], name: "index_coordinates_on_character_id"
    t.index ["image_id"], name: "index_coordinates_on_image_id"
  end

  create_table "games", force: :cascade do |t|
    t.bigint "image_id", null: false
    t.datetime "start_time", null: false
    t.datetime "end_time"
    t.string "initials"
    t.string "session_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["image_id"], name: "index_games_on_image_id"
  end

  create_table "images", force: :cascade do |t|
    t.string "name", null: false
    t.string "file_name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "coordinates", "characters"
  add_foreign_key "coordinates", "images"
  add_foreign_key "games", "images"
end
