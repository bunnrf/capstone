json.extract! comment, :id, :body, :points, :commenter
json.set! :time_since, (comment.created_at.to_f * 1000).floor
