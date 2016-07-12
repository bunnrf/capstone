class Api::CommentsController < ApplicationController
  before_action :require_logged_in, only: [:create]

  def create
    comment = Comment.new(comment_params)

    if comment.save
      @post = comment.post
      render '/api/posts/show'
    else
      render json: comment, status: :unprocessable_entity
    end
  end

  private
  def comment_params
    params.require(:comment).permit(:body, :commenter_id, :post_id, :parent_comment_id)
  end
end
