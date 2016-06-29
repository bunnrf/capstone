class Post < ActiveRecord::Base
  validates :title, :description, :author_id, presence: true

  belongs_to :author, class_name: "User"
  has_many :comments, as: :commentable
  has_many :images
end
