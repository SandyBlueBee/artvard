class AddDateToArtworks < ActiveRecord::Migration[7.0]
  def change
    add_column :artworks, :date, :string
  end
end
