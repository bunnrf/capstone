@posts.each do |post|
  json.set! post.id do
    json.extract! post, :id, :title, :points
    json.set! :thumb, post.images.first.image_url
  end
end
