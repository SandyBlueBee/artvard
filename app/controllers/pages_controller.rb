class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: %i[home game paint]

  def home
    @artworks = Artwork.all
    @sample = @artworks.sample(15)
  end

  def game
    @cards_selected = Artwork.all.sample(10)
    @cards = []
    @cards_selected.each do |card|
      @cards.push({title: card.title, id: card.id})
      @cards.push({image: card.image, id: card.id})
    end
    @cards = @cards.shuffle
  end

  def paint
  end
end
