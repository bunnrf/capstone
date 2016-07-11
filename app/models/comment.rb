class Comment < ActiveRecord::Base
  validates :body, :commenter_id, :commentable_id, :commentable_type, presence: true

  belongs_to :commenter, class_name: "User"
  belongs_to :commentable, polymorphic: true
  has_many :comments
  has_many :votes, as: :votable
end
