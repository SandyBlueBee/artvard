class CreateGamerooms < ActiveRecord::Migration[7.0]
  def change
    create_table :gamerooms do |t|
      t.string :name

      t.timestamps
    end
  end
end
