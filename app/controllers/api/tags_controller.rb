class Api::TagsController < ApplicationController
  def index
    if params[:limit]
      @tags = Tag.limit(params[:limit])
    else
      @tags = Tag.all
    end

    render json: @tags
  end
  
  private
  def tag_params
    params.require(:tag).permit(:name)
  end
end
