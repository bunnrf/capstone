class AddViewsToPosts < ActiveRecord::Migration
  def change
    add_column :posts, :view_count, :integer, default: 0
    add_index :posts, :view_count
  end
end
