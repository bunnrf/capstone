class Api::VotesController < ApplicationController
  def create
    vote = Vote.new(user_id: current_user.id, vote_type: vote_params[:vote_type], votable_id: vote_params[:votable_id], votable_type: vote_params[:votable_type])

    if(vote.save)
      @post = Post.find(vote_params[:votable_id])
      render "api/posts/show"
    else
      @errors = vote.errors.full_messages
      render "api/shared/errors", status: 422
    end
  end

  def destroy
    vote = Vote.find_by(user_id: current_user.id, votable_id: vote_params[:votable_id], votable_type: vote_params[:votable_type])

    if(vote.destroy)
      @post = Post.find(vote_params[:votable_id])
      render "api/posts/show"
    else
      @errors = vote.errors.full_messages
      render "api/shared/errors", status: 422
    end
  end

  private
  def vote_params
    params.require(:vote).permit(:vote_type, :user_id, :votable_id, :votable_type)
  end
end
