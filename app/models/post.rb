class Post < ActiveRecord::Base
  validates :title, :author_id, presence: true

  belongs_to :author, class_name: "User"
  has_many :comments, as: :commentable
  has_many :images, inverse_of: :post
  accepts_nested_attributes_for :images
end
