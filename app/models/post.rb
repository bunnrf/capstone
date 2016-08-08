class Post < ActiveRecord::Base
  validates :title, :author_id, presence: true

  belongs_to :author, class_name: "User"
  has_many :comments, inverse_of: :post
  has_many :images, inverse_of: :post
  has_many :votes, as: :votable
  has_many :voters, through: :votes, source: :voter
  accepts_nested_attributes_for :images

  def self.all_tracks(limit, offset)
    Post.limit(limit).offset(offset).includes(:author).joins(:images).where(:images => { :ordinal => 0 }).includes(:images)
  end

  def thumb
    url = self.images.first.image_url
    url.sub(".gifv", ".jpg").sub(".gif", ".jpg")
  end

  def points
    counts = self.votes.group(:vote_type).count
    (counts["upvote"] || 0) - (counts["downvote"] || 0)
  end

  def comments_by_parent
    comments_by_parent = Hash.new { |hash, key| hash[key] = [] }

    self.comments.includes(:commenter).each do |comment|
      comments_by_parent[comment.parent_comment_id] << comment
    end

    comments_by_parent
  end
end
