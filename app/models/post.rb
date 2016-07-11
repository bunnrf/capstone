class Post < ActiveRecord::Base
  validates :title, :author_id, presence: true

  belongs_to :author, class_name: "User"
  has_many :comments, as: :commentable
  has_many :images, inverse_of: :post
  has_many :votes, as: :votable
  has_many :voters, through: :votes, source: :voter
  accepts_nested_attributes_for :images

  def points
    points = 0
    self.votes.each do |vote|
      points += 1 if vote.vote_type == "upvote"
      points -= 1 if vote.vote_type == "downvote"
    end
    points
  end
end
