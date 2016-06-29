class CreatePosts < ActiveRecord::Migration
  def change
    create_table :posts do |t|
      t.string :title, null: false
      t.text :description
      t.integer :points, null: false, default: 0
      t.integer :author_id, null: false

      t.timestamps null: false
    end

    add_index :posts, :author_id
  end
end
