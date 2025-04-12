class Api::GamesController < ApplicationController
  before_action :set_game, only: %i[update check_guess]

  def create
    @existing_game = Game.find_by(session_id: request.session_options[:id].to_s, image_id: session[:image_id])
    return head :ok if @existing_game

    start_params = { start_time: Time.now, session_id: request.session_options[:id] }
    @game = Image.find(session[:image_id].to_i).games.create(start_params)

    if @game.save
      session[:game_id] = @game[:id]
      render json: @game
    else
      head :unprocessable_entity
    end
  end

  def update
    if @game.update(game_params)
      render json: @game
    else
      head :unprocessable_entity
    end
  end

  def check_guess
    @guess = guess_params
    @char_coords = Character.find_by(name: @guess[:character]).coordinates.find_by(image_id: session[:image_id])
    is_overlap = @guess[:end_x] >= @char_coords[:start_x] && @char_coords[:end_x] >= @guess[:start_x] &&
                 @guess[:end_y] >= @char_coords[:start_y] && @char_coords[:end_y] >= @guess[:start_y]

    if is_overlap && !@game[:found_characters]&.include?(@guess[:character])
      @game.update(found_characters: "#{@guess[:character]},#{@game[:found_characters]}")
    end

    render json: @game
  end

  private

  def game_params
    params.expect(:end_date, :initials)
  end

  def guess_params
    params.expect(guess: %i[character start_x start_y end_x end_y])
  end

  def set_game
    @game = Game.find_by(session_id: request.session_options[:id].to_s, image_id: session[:image_id])
  end
end
