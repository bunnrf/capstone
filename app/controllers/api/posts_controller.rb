class Api::PostsController < ApplicationController
  def index
    @posts = Post.all.includes(:author, :comments).joins(:images).where(:images => { :ordinal => 1 }).includes(:images)
  end

  def show
    @post = Post.includes(:author, :comments, :images).find(params[:id])
  end

  def new

  end

  def create

  end

  def edit

  end

  def update

  end

  def destroy

  end

  private
  def post_params
    params.require(:post).permit(:title, :description, :points, :author_id)
  end
end
