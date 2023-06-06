require "open-uri"
require "nokogiri"
require "awesome_print"


class ScrapArtService
  def initialize

  end

  def call
    response = File.open("public/paintings.html").read
    doc = Nokogiri::HTML(response)
    doc.search(".block").each do |block|

      title = block.search(".title").text.split("-").first
      artist_date = block.search(".title").text.split("-").last
      artist = artist_date.split("(").first
      date = artist_date.split("(").last
      ap artist
      description =
      image =
      exposition =
      Artwork.create(title: title, description: description, image: image, exposition: exposition)
    end

    return nil
  end
end
