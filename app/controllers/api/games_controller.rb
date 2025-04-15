class Api::GamesController < ApplicationController
  before_action :set_game, only: %i[update check_guess]

  def create
    @existing_game = Game.find_by(session_id: request.session_options[:id].to_s, image_id: session[:image_id])
    return render json: @existing_game if @existing_game

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
    @characters = Image.find(@game[:image_id]).characters
    @character = @characters.find_by(name: @guess[:character])
    @char_coords = @character.coordinates.find_by(image_id: session[:image_id])

    @found_characters = @game[:found_characters] ? JSON.parse(@game[:found_characters]) : []

    if overlap?(@guess, @char_coords) && @found_characters&.none?(@character[:id])
      @found_characters.push(@character[:id])
      @game.update(found_characters: JSON.dump(@found_characters))
    end

    @game.update(end_time: Time.now) if all_found?(@found_characters, @characters)

    render json: @game
  end

  private

  def overlap?(guess, char_coords)
    guess[:end_x] >= char_coords[:start_x] && char_coords[:end_x] >= guess[:start_x] &&
      guess[:end_y] >= char_coords[:start_y] && char_coords[:end_y] >= guess[:start_y]
  end

  def all_found?(found, characters)
    characters.reduce(true) { |acc, cur| found.include?(cur[:id]) ? acc : false }
  end

  def game_params
    params.expect(:initials)
  end

  def guess_params
    params.expect(guess: %i[character start_x start_y end_x end_y])
  end

  def set_game
    @game = Game.find_by(session_id: request.session_options[:id].to_s, image_id: session[:image_id])
  end
end
