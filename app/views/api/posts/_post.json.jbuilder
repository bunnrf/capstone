json.extract! post, :id, :title, :points, :images, :author

json.comments_by_parent do
  post.comments_by_parent.each_key do |parent_comment_id|
    json.set! parent_comment_id.to_s.to_sym do
      json.partial! 'api/comments/comment', collection: post.comments_by_parent[parent_comment_id], as: :comment
    end
  end
end

json.set! :time_since, (post.created_at.to_f * 1000).floor
