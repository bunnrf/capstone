json.extract! comment, :id, :body, :commenter, :points, :parent_comment_id
json.set! :time_since, (comment.created_at.to_f * 1000).floor
