@posts.each_with_index do |post, idx|
  json.set! (params[:offset].to_i + idx) do
    json.extract! post, :id, :title, :description, :view_count
    json.set! :thumb, Image.thumbify(post.thumb_url)
    json.set! :points, post["vote_points"]
  end
end
