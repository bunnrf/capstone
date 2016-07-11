class User < ActiveRecord::Base
  attr_reader :password

  validates :username, :password_digest, :session_token, presence: true
  validates :username, uniqueness: true
  validates :password, length: { minimum: 6, allow_nil: true }

  after_initialize :ensure_session_token

  has_many :posts
  has_many :comments, as: :commentable
  has_many :votes
  has_many :voted_posts, through: :votes, source: :votable, source_type: "Post"
  has_many :voted_comments, through: :votes, source: :votable, source_type: "Comment"

  #return votes with type comment, as opposed to the comments themselves
  def post_votes
    post_votes = {}
    votes.select do |vote|
      vote.votable_type == "Post"
    end.each do |vote|
      post_votes[vote.votable_id] = { vote_type: vote.vote_type }
    end
    post_votes
  end

  def comment_votes
    post_votes = {}
    votes.select do |vote|
      vote.votable_type == "Comment"
    end.each do |vote|
      post_votes[vote.votable_id] = { vote_type: vote.vote_type }
    end
    post_votes
  end

  def self.find_by_credentials(username, password)
    user = User.find_by(username: username)

    return nil unless user

    user.is_password?(password) ? user : nil
  end

  def password=(password)
    self.password_digest = BCrypt::Password.create(password)
    @password = password
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_session_token
    self.session_token = SecureRandom.urlsafe_base64
    self.save
    self.session_token
  end

  def ensure_session_token
    self.session_token ||= SecureRandom.urlsafe_base64
  end
end
