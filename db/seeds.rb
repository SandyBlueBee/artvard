# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

User.destroy_all

User.create!(username: "toto", email: "toto@test.com", password: "password")

puts "je fais le service"
Artwork.destroy_all
ScrapArtService.new.call
Artwork.create!(title: "Fusion Artistique", artist: "Sacha du bourg palette", description: "", image: "easteregg/vague-levia.png", exposition: "")
puts "j'ai fini le service ( #{Artwork.count} peintures créées )"
