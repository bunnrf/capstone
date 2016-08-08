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

  # alias_method :rails_child_comments_attributes=, :child_comments_attributes=
  # def child_comments_attributes=(attributes)
  #   self.child_comments.build(attributes)
  #   self.save
  #   self.rails_child_comments_attributes = attributes
  # end

  # alias_method :rails_votes_attributes=, :votes_attributes=
  # def votes_attributes=(attributes)
  #   self.votes.build(attributes)
  #   self.save
  #   self.rails_votes_attributes = attributes
  # end

  def points
    counts = self.votes.group(:vote_type).count
    (counts["upvote"] || 0) - (counts["downvote"] || 0)
  end
end
