class Api::PostsController < ApplicationController
  def index
    if params[:limit] && params[:offset]
      @posts = Post.all_tracks(params[:limit], params[:offset])
    else
      @posts = Post.all.includes(:author).joins(:images).where(:images => { :ordinal => 0 }).includes(:images)
    end
  end

  def show
    @post = Post.includes(:author, :comments, :images).find(params[:id])
  end

  def new

  end

  def create
    @post = Post.create!(post_params)
    render :show
  end

  def edit

  end

  def update

  end

  def destroy

  end

  private
  def post_params
    params.require(:post).permit(:title, :points, :author_id, images_attributes: [:title, :image_url, :description, :ordinal])
  end
end
