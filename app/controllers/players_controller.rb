class PlayersController < ApplicationController
  def create
    @gameroom = Gameroom.find(params[:gameroom_id])
    player = Player.create(gameroom: @gameroom, user: current_user)
    GameroomChannel.broadcast_to(
      @gameroom,
      {
        action: "insertNewPlayer",
        partial: render_to_string(partial: "players/player", locals: { player: })
      }
    )
    redirect_to gameroom_path(@gameroom)
  end
end
