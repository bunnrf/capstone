class Api::VotesController < ApplicationController
  def create
    vote = Vote.new(user_id: current_user.id, vote_type: vote_params[:vote_type], votable_id: vote_params[:votable_id], votable_type: vote_params[:votable_type])

    if(vote.save)
      if vote.votable_type == "Post"
        @post = vote.votable
      else
        @post = vote.votable.post
      end
      render "api/posts/show"
    else
      @errors = vote.errors.full_messages
      render "api/shared/error", status: 422
    end
  end

  def update
    vote = Vote.find_by(user_id: current_user.id, votable_id: vote_params[:votable_id], votable_type: vote_params[:votable_type])

    if vote.update(vote_params)
      if vote.votable_type == "Post"
        @post = vote.votable
      else
        @post = vote.votable.post
      end
      render "api/posts/show"
    else
      @errors = vote.errors.full_messages
      render "api/shared/error", status: 422
    end
  end

  def destroy
    vote = Vote.find_by(user_id: current_user.id, votable_id: vote_params[:votable_id], votable_type: vote_params[:votable_type])

    if(vote.destroy)
      if vote.votable_type == "Post"
        @post = vote.votable
      else
        @post = vote.votable.post
      end
      render "api/posts/show"
    else
      @errors = vote.errors.full_messages
      render "api/shared/error", status: 422
    end
  end

  private
  def vote_params
    params.require(:vote).permit(:vote_type, :votable_id, :votable_type)
  end
end
