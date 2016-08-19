class CreateTaggings < ActiveRecord::Migration
  def change
    create_table :taggings do |t|
      t.integer :tag_id, null: false
      t.integer :post_id, null: false
    end

    add_index :taggings, :tag_id
    add_index :taggings, :post_id
  end
end
