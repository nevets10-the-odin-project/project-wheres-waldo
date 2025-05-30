class Api::ImagesController < ApplicationController
  def index
    @images = Image.all
    render json: @images
  end

  def show
    @image = Image.find(params[:id])
    session[:image_id] = params[:id]
    render json: @image, include: %w[characters coordinates]
  end
end
