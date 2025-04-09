class Character < ApplicationRecord
  validates :name, presence: true
  has_many :coordinates
  has_many :images, through: :coordinates, inverse_of: :characters
end
