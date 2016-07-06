class Api::ImagesController < ApplicationController
  def show

  end

  def create

  end

  def a

  end

  private
  def image_params
    params.require(:image).permit(:title, :image_url, :description, :ordinal)
  end
end
