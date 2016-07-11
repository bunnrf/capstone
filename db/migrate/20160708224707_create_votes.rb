class CreateVotes < ActiveRecord::Migration
  def change
    create_table :votes do |t|
      t.string :vote_type, null: false
      t.integer :user_id, null: false
      t.integer :votable_id, null: false
      t.string :votable_type, null: false

      t.timestamps
    end

    add_index :votes, :user_id
    add_index :votes, :votable_id
    add_index :votes, :votable_type    
  end
end
