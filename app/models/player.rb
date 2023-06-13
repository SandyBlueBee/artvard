class Player < ApplicationRecord
  belongs_to :user
  belongs_to :gameroom
end
