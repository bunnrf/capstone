json.extract! post, :id, :title, :description, :images, :author
json.set! :points, post["vote_points"]

comments_by_parent = Comment.from_post_by_parent(post.id)
json.comments_by_parent do
  comments_by_parent.each_key do |parent_comment_id|
    json.set! parent_comment_id.to_s.to_sym do
      json.partial! 'api/comments/comment', collection: comments_by_parent[parent_comment_id], as: :comment
    end
  end
end

json.set! :time_since, (post.created_at.to_f * 1000).floor
