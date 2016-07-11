class Comment < ActiveRecord::Base
  validates :body, :commenter, :post, presence: true

  belongs_to :commenter, class_name: "User"
  belongs_to :post, inverse_of: :comments
  has_many(
    :child_comments,
    class_name: "Comment",
    foreign_key: :parent_comment_id,
    primary_key: :id
  )
  belongs_to(
    :parent_comment,
    class_name: "Comment",
    foreign_key: :parent_comment_id,
    primary_key: :id
  )
  has_many :votes, as: :votable

  def points
    points = 0
    self.votes.each do |vote|
      points += 1 if vote.vote_type == "upvote"
      points -= 1 if vote.vote_type == "downvote"
    end
    points
  end
end
