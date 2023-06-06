class CreateArtworks < ActiveRecord::Migration[7.0]
  def change
    create_table :artworks do |t|
      t.string :title
      t.string :artist
      t.string :description
      t.string :image
      t.string :exposition

      t.timestamps
    end
  end
end
