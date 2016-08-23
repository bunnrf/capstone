json.extract! @comment, :id, :body, :parent_comment_id

json.commenter do
  json.set! :id, @comment["commenter_id"]
  json.set! :username, current_user.username
end

json.set! :points, 0
json.set! :time_since, (@comment.created_at.to_f * 1000).floor
