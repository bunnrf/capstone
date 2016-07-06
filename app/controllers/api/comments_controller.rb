class Api::CommentsController < ApplicationController
  before_action :require_logged_in, only: [:create]

  def create
    comment = Comment.new(comment_params)

    if comment.save
      @post = comment.commentable
      render '/api/posts/show'
    else
      render json: comment, status: :unprocessable_entity
    end
  end

  private
  def comment_params
    params.require(:comment).permit(:body, :user_id, :commenter_id, :commentable_id, :commentable_type)
  end
end
