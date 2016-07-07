json.extract! post, :id, :title, :description, :points, :images, :author

json.comments do
  json.partial! 'api/comments/comment', collection: post.comments, as: :comment
end

json.set! :time_since, (post.created_at.to_f * 1000).floor
