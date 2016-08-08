RANDOM_USER_COUNT = 250
RANDOM_COMMENT_COUNT = 750
RANDOM_VOTES_COUNT = 10000
RANDOM_POSTS_COUNT = 1000
TOTAL_USER_COUNT = RANDOM_USER_COUNT

def create_random_comment
  { body: "", commenter_id: rand(TOTAL_USER_COUNT) + 1  }
end

def create_comment(post_id, parent_comment_id = nil)
  comment = create_random_comment
  comment[:post_id] = post_id
  comment[:parent_comment_id] = parent_comment_id if parent_comment_id
  comment
end

def create_child_comments(weight, post_id)
  Array.new(weight) do
    comment = create_comment(post_id)
    if rand(8) < 1 && weight > 0
      comment[:child_comments] = create_child_comments(weight - rand(weight + 1) ,post_id, )
    end
    comment
  end
end

users_count = TOTAL_USER_COUNT
top_comments = []
15.times do |post_id|
  3.times do
    weight = rand(20) + 5
    child_comments = create_child_comments(weight, post_id)
    votes = Array.new(weight * 5 + (rand(60) - 20)) { { vote_type: "upvote", user_id: rand(users_count) + 1, votable_type: "comment" } }
    comment = create_comment(post_id)
    comment[:child_comments] = child_comments
    comment[:votes] = votes
    top_comments << comment
  end
end

p top_comments[0]
