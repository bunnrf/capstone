class ChangePresenceOfImageTitles < ActiveRecord::Migration
  def change
    change_column_null :images, :title, true
  end
end
