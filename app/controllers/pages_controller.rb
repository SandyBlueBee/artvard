class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: %i[home game paint]

  def home
  end

  def game
    @cards = Artwork.all.sample(10)
    @cards += @cards
    @cards = @cards.shuffle
  end

  def paint
  end
end
