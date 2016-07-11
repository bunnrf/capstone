json.extract! comment, :id, :body, :commenter
json.set! :time_since, (comment.created_at.to_f * 1000).floor
