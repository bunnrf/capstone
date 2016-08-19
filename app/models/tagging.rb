class Tagging < ActiveRecord::Base
  validates :tag_id, :post_id, presence: true
  validates_uniqueness_of :post_id, scope: :tag_id

  belongs_to :tag
  belongs_to :post
end
