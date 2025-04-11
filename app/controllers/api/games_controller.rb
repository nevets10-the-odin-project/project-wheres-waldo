class Api::GamesController < ApplicationController
  def create
    @game = Image.find(session[:image_id].to_i).games.create(start_time: Time.now, session_id: session[:image_id].to_i)

    if @game.save
      session[:game_id] = @game[:id]
      head :ok
    else
      head :unprocessable_entity
    end
  end

  def update
    @game = Game.find(session[:game_id])

    if @game.update(game_params)
      head :ok
    else
      head :unprocessable_entity
    end
  end

  private

  def game_params
    params.expect(:end_date, :initials)
  end
end
