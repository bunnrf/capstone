class Image < ActiveRecord::Base
  validates :image_url, :post, presence: true

  belongs_to :post, inverse_of: :images

  def self.thumbify(url)
    uri = URI::parse(url)
    uri.path = uri.path.sub(".gifv", ".jpg").sub(".gif", ".jpg")

    if uri.host.include?("imgur")
      imgur_thumbify(uri)
    elsif uri.host.include?("cloudinary")
      cloudinary_thumbify(uri)
    else
      url
    end
  end

  def self.imgur_thumbify(imgur_uri)
    imgur_uri = URI::parse(imgur_uri) unless imgur_uri.is_a? URI
    imgur_uri.path = imgur_uri.path.sub(".jpg", "b.jpg")
    imgur_uri.to_s
  end

  def self.cloudinary_thumbify(cloudinary_uri)
    cloudinary_uri = URI::parse(cloudinary_uri) unless cloudinary_uri.is_a? URI
    unless cloudinary_uri.path.include?("/h_180/")
      index = cloudinary_uri.path.index("/upload/")
      cloudinary_uri.path.insert(index + 8, "h_180/")
    end
    cloudinary_uri.to_s
  end

end
