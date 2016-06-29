class Image < ActiveRecord::Base
  validates :title, :image_url, :post_id, presence: true

  belongs_to :post, dependent: :destroy
end
