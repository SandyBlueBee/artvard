class Gameroom < ApplicationRecord
  has_many :players, dependent: :destroy
end
