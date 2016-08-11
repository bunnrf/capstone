class Post < ActiveRecord::Base
  validates :title, :author_id, presence: true

  belongs_to :author, class_name: "User"
  has_many :comments, inverse_of: :post
  has_many :images, inverse_of: :post
  has_many :votes, as: :votable
  has_many :voters, through: :votes, source: :voter
  accepts_nested_attributes_for :images

  def self.all_posts(limit, offset)
    limit(limit).offset(offset)
  end

  def self.index(limit, offset)
    select("posts.*, images.image_url as thumb_url,
    COUNT(case when votes.vote_type = 'upvote' then votes.* end) -
    COUNT(case when votes.vote_type = 'downvote' then votes.* end) as vote_points")
    .limit(limit).offset(offset).joins(:images).where(images: { ordinal: 0 } )
    .joins("LEFT JOIN votes ON posts.id = votes.votable_id AND votes.votable_type = 'Post'")
    .group("posts.id, images.image_url").order("vote_points desc")
  end

  def thumb
    url = images.first.image_url
    url.sub(".gifv", ".jpg").sub(".gif", ".jpg")
  end

  def points
    counts = votes.group(:vote_type).count
    (counts["upvote"] || 0) - (counts["downvote"] || 0)
  end

  def comments_by_parent
    comments_by_parent = Hash.new { |hash, key| hash[key] = [] }

    comments.includes(:commenter).each do |comment|
      comments_by_parent[comment.parent_comment_id] << comment
    end

    comments_by_parent
  end
end
