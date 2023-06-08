class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: %i[home game]

  def home
  end

  def game
    @cards_selected = Artwork.all.sample(10)
    @cards = []
    @cards_selected.each do |card|
      @cards.push(card.title)
      @cards.push(card.image)
    end
    @cards = @cards.shuffle
  end
end
