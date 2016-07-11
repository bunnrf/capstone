class EditComments < ActiveRecord::Migration
  def change
    drop_table :comments
    create_table :comments do |t|
      t.string :body, null: false
      t.integer :commenter_id, null: false
      t.integer :parent_comment_id
      t.integer :post_id, null: false

      t.timestamps null: false
    end

    add_index :comments, :post_id
    add_index :comments, :commenter_id
  end
end
