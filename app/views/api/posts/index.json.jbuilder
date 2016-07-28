@posts.each do |post|
  json.set! post.id do
    json.extract! post, :id, :title, :points, :description, :thumb
  end
end
