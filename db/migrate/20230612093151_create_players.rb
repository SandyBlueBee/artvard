class CreatePlayers < ActiveRecord::Migration[7.0]
  def change
    create_table :players do |t|
      t.integer :score, default: 0
      t.references :user, null: false, foreign_key: true
      t.references :gameroom, null: false, foreign_key: true

      t.timestamps
    end
  end
end
