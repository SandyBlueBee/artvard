class GameroomsController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:update]
  skip_before_action :authenticate_user!, only: [:choice]


  def index
    @gamerooms = Gameroom.all
  end

  def show
    @gameroom = Gameroom.find(params[:id])
    @players = @gameroom.players
    @cards_selected = Artwork.all.sample(1)
    @cards = []
    @cards_selected.each do |card|
      @cards.push({ title: card.title, id: card.id })
      @cards.push({ image: card.image, id: card.id })
    end
    @cards = @cards.shuffle
  end

  def new
    @gameroom = Gameroom.new
  end

  def create
    @gameroom = Gameroom.new(gameroom_params)
    Player.create(gameroom: @gameroom, user: current_user)
    if @gameroom.save
      redirect_to gameroom_path(@gameroom)
    else
      render :new
    end
  end

  def choice
  end

  def update
    @gameroom = Gameroom.find(params[:id])
    @player = @gameroom.players.find_by(user: current_user)
    @player.update(score: @player.score + 1)
    GameroomChannel.broadcast_to(@gameroom,
      {
        partial: render_to_string(partial: "players/player", locals: { player: @player }),
        id: @player.id,
        action: "score"
      })
  end

  private

  def gameroom_params
    params.require(:gameroom).permit(:name)
  end
end
