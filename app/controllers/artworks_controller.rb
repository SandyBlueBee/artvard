class ArtworksController < ApplicationController
  skip_before_action :authenticate_user!, only: %i[index show]

  def index
    @artworks = Artwork.all
    @sample = @artworks.sample(15)
    # if params[:query].present?
    #   @artworks = @artworks.where("artist ILIKE ?", "%#{params[:query]}")
    # end
    if params[:query].present?
      sql_subquery = "title ILIKE :query OR artist ILIKE :query"
      @artworks = @artworks.where(sql_subquery, query: "%#{params[:query]}%")
    end
  end

  def show
    @artwork = Artwork.find(params[:id])
  end
end
