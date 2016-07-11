class RemovePointsFromVotables < ActiveRecord::Migration
  def change
    remove_column :posts, :points
    remove_column :comments, :points
  end
end
