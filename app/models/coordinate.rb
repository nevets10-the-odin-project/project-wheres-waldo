class Coordinate < ApplicationRecord
  belongs_to :image
  belongs_to :character
end
