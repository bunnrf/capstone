class Comment < ActiveRecord::Base
  validates :body, :commenter, :post, presence: true

  belongs_to :commenter, class_name: "User"
  belongs_to :post, inverse_of: :comments
  has_many :child_comments, class_name: "Comment", foreign_key: :parent_comment_id
  belongs_to :parent_comment, class_name: "Comment"
  has_many :votes, as: :votable

  # for seeding
  accepts_nested_attributes_for :child_comments
  accepts_nested_attributes_for :votes

  def points
    counts = self.votes.group(:vote_type).count
    (counts["upvote"] || 0) - (counts["downvote"] || 0)
  end
end
