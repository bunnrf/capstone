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

  def self.from_post(post_id)
    select("comments.*").where(post_id: post_id).with_points
    .with_commenters.group("comments.id")
  end

  def self.with_points
    select("COUNT(CASE WHEN votes.vote_type = 'upvote' THEN votes.* END) - COUNT(CASE WHEN votes.vote_type = 'downvote' THEN votes.* END) AS vote_points")
    .joins("LEFT JOIN votes ON comments.id = votes.votable_id AND votes.votable_type = 'Comment'")
  end

  def self.with_commenters
    select("users.username AS commenter_username")
    .joins(:commenter).group("users.username")
  end

  def self.from_post_by_parent(post_id)
    comments_by_parent(from_post(post_id))
  end

  def self.comments_by_parent(comments)
    comments_by_parent = Hash.new { |hash, key| hash[key] = [] }

    comments.each do |comment|
      comments_by_parent[comment.parent_comment_id] << comment
    end

    comments_by_parent
  end
end
