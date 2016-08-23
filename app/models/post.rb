class Post < ActiveRecord::Base
  validates :title, :author_id, presence: true

  belongs_to :author, class_name: "User"
  has_many :comments, inverse_of: :post
  has_many :images, inverse_of: :post
  has_many :taggings
  has_many :tags, through: :taggings
  has_many :votes, as: :votable
  has_many :voters, through: :votes, source: :voter
  accepts_nested_attributes_for :images

  def self.all_posts(limit, offset)
    limit(limit).offset(offset)
  end

  def self.index
    select("posts.*").with_thumbs.with_points.group("posts.id")
  end

  def self.most_popular(limit, offset)
    index.limit(limit).offset(offset).order("view_count DESC")
  end

  def self.most_recent(limit, offset)
    index.limit(limit).offset(offset).order("created_at DESC")
  end

  def self.highest_scoring(limit, offset)
    index.limit(limit).offset(offset).order("vote_points DESC")
  end

  def self.match_title(string)
    match(:title, string)
  end

  def self.show(post_id)
    select("posts.*").where(posts: { id: post_id } )
    .joins(:images).joins(:author).with_points
    .group("posts.id")
  end

  def self.with_tag(tag_name)
    joins(:tags).where(tags: { name: tag_name } )
  end

  def self.with_thumbs
    select("images.image_url AS thumb_url").joins(:images)
    .where(images: { ordinal: 0 } ).group("images.image_url")
  end

  def self.with_points
    select("COUNT(CASE WHEN votes.vote_type = 'upvote' THEN votes.* END) - COUNT(CASE WHEN votes.vote_type = 'downvote' THEN votes.* END) AS vote_points")
    .joins("LEFT JOIN votes ON posts.id = votes.votable_id AND votes.votable_type = 'Post'")
  end

  def self.match(col, string)
    where(Post.arel_table[col].matches("%#{string}%"))
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
    Comment.comments_by_parent(comments)
  end
end
