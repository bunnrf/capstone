class Api::ImagesController < ApplicationController
  private
  def image_params
    params.require(:image).permit(:title, :image_url, :description, :ordinal)
  end
end
