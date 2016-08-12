class Vote < ActiveRecord::Base
  validates :vote_type, :user_id, :votable_type, presence: true
  validates :user_id, uniqueness: { scope: [:votable_id, :votable_type] }

  belongs_to :voter, class_name: "User"
  belongs_to :votable, polymorphic: true
end
