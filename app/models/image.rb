class Image < ApplicationRecord
  validates :name, presence: true
  validates :file_name, presence: true
  has_many :coordinates
  has_many :characters, through: :coordinates, inverse_of: :images
  has_many :games
end
