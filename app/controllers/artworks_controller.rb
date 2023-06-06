class ArtworksController < ApplicationController

  def index
    @artworks = Artwork.all
    @sample = @artworks.sample(15)
  end

  def show

    @artwork = Artwork.find(params[:id])
  end
end
