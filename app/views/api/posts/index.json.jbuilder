@posts.each_with_index do |post, idx|
  json.set! (params[:offset].to_i + idx) do
    json.extract! post, :id, :title, :description, :view_count
    json.set! :thumb, post.thumb_url.sub(".gifv", ".jpg").sub(".gif", ".jpg")
    json.set! :points, post["vote_points"]
  end
end
