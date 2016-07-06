class Image < ActiveRecord::Base
  validates :image_url, :post, presence: true

  belongs_to :post, inverse_of: :images
end
