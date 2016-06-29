json.extract! post, :id, :title, :description, :points, :images, :author_id

json.comments do
  json.partial! 'api/comments/comment', collection: post.comments, as: :comment
end
