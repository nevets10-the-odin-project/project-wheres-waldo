class Api::LeaderboardController < ApplicationController
  def index
    @images = Image.all
    render json: @images, include: %w[games]
  end
end
