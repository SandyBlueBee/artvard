class ArtworksController < ApplicationController
  skip_before_action :authenticate_user!, only: %i[index show]

  def index
    @artworks = Artwork.all
    @sample = @artworks.sample(15)
  end

  def show
    @artwork = Artwork.find(params[:id])
  end
end
