class Api::PostsController < ApplicationController
  def index
    if params[:limit] && params[:offset]
      @posts = Post.most_popular(params[:limit], params[:offset])
    else
      @posts = Post.index
    end
  end

  def most_popular
    if params[:tag]
      @posts = Post.most_popular(params[:limit], params[:offset]).with_tag(params[:tag])
    else
      @posts = Post.most_popular(params[:limit], params[:offset])
    end
    render :index
  end

  def most_recent
    if params[:tag]
      @posts = Post.most_recent(params[:limit], params[:offset]).with_tag(params[:tag])
    else
      @posts = Post.most_recent(params[:limit], params[:offset])
    end
    render :index
  end

  def highest_scoring
    if params[:tag]
      @posts = Post.highest_scoring(params[:limit], params[:offset]).with_tag(params[:tag])
    else
      @posts = Post.highest_scoring(params[:limit], params[:offset])
    end
    render :index
  end

  def show
    @post = Post.show(params[:id])[0]
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
