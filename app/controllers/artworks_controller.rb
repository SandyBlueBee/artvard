class ArtworksController < ApplicationController
  skip_before_action :authenticate_user!, only: %i[index show]

  def index
    @artworks = Artwork.all
    @easteregg = Artwork.find_by title: "Fusion Artistique"
    @sample = @artworks.sample(15)
    @artworks_shuffle = @artworks.shuffle
    if params[:query].present?
      sql_subquery = "title ILIKE :query OR artist ILIKE :query"
      @artworks = @artworks.where(sql_subquery, query: "%#{params[:query]}%")
    end
  end

  def show
    @artwork = Artwork.find(params[:id])
  end
end
