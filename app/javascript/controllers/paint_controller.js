import { Controller } from "@hotwired/stimulus"
import { createPopper, end } from "@popperjs/core";

// Connects to data-controller="paint"
export default class extends Controller {
  static targets = ["canvas", "image", "color"];

  connect() {
    console.log("paint.js has arrived");
    this.canvasTarget.height = 400;
    this.canvasTarget.width = 700;
    this.brushSize = 3;
    this.prevX = null
    this.prevY = null
    this.draw = false
    this.ctx = this.canvasTarget.getContext("2d")
    this.ctx.fillStyle = "white"
    this.ctx.fillRect(0, 0, this.canvasTarget.width,  this.canvasTarget.height)
    this.ctx.fillStyle = "hsl(10, 90%, 90%"
    // this.artwork = @artwork
  }


  resetPreviousLocation() {
    this.prevX = null
    this.prevY = null
  }

  drawToggle(){
    this.draw = !this.draw
  }

  drawing(event){

    if (this.prevX === null || this.prevY === null) {
      // get initial position
      this.prevX = event.clientX - this.canvasTarget.offsetLeft;
      this.prevY = event.clientY - this.canvasTarget.offsetTop;
      console.log("wesh la famille, bien?")
      return
    }

    if(this.draw === true) {
      // catch current position
      var currentX = event.clientX - this.canvasTarget.offsetLeft;
      var currentY = event.clientY - this.canvasTarget.offsetTop;
      console.log(event.clientX)
      console.log(this.canvasTarget.offsetLeft)

      // create line through path
      this.ctx.beginPath(this.prevX, this.prevY);
      this.ctx.moveTo(this.prevX, this.prevY);
      // this.ctx.lineTo(currentX, currentY);
      this.ctx.arc(currentX, currentY, this.brushSize, 0, 2* Math.PI);
      this.ctx.fill()
      // this.ctx.stroke()

      // update last position
      this.prevX = currentX
      this.prevY = currentY
    }
  }

  changeColor(event) {
    console.log("color changed")
    this.ctx.fillStyle = event.currentTarget.dataset.color
  }

  clearCanvas() {
    // this.ctx.clearRect(0, 0, this.canvasTarget.height, this.canvasTarget.width)
    this.ctx.fillStyle = "white"
    this.ctx.fillRect(0, 0, this.canvasTarget.width,  this.canvasTarget.height)
    this.ctx.fillStyle = "grey"
  }

  savePng(){
    console.log("saving")
    const link = document.createElement('a');
    link.download = 'download.jpeg';
    link.href = this.canvasTarget.toDataURL()
    link.click();
    link.delete;
  }

  changeBrushSize(event){
    console.log(event)
    this.brushSize = event.currentTarget.value
  }

  changeSaturation(event) {
    let saturation = event.currentTarget.value
    const saturationRegex = /(\d+)(?=%)/;
    console.log(saturation)
    this.colorTargets.forEach(color => {
      var paletteColor = color.dataset.color
      paletteColor = paletteColor.replace(saturationRegex, saturation);
      color.dataset.color = paletteColor
      color.style.backgroundColor = paletteColor
    });
  }

  // function changeSaturationUsingRegex(color, newSaturation) {
  //   const saturationRegex = /(\d+)%/;
  //   const modifiedColor = color.replace(saturationRegex, `${newSaturation}%`);

  //   return modifiedColor;
  // }

  // const color = 'hsl(20,75%,60%)';
  // const newSaturation = 80;
  // const modifiedColor = changeSaturationUsingRegex(color, newSaturation);
  // console.log(modifiedColor); // Output: hsl(20,80%,60%)

  changeBrightness(event) {
    let brightness = event.currentTarget.value
    const brightnessRegex = /.*?,\s*(\d+)%\)/;
    console.log(brightness)
    this.colorTargets.forEach(color => {
      console.log(color.dataset.color)
      var paletteColor = color.dataset.color
      console.log(color.match(brightnessRegex))
      paletteColor = paletteColor.replace(brightnessRegex, brightness);
      console.log(paletteColor)
      color.dataset.color = paletteColor
      color.style.backgroundColor = paletteColor
    });
  }

  changeArtpiece(event){
    const url = `${window.location.href}?id=${event.currentTarget.value}`
    fetch(url, {
      headers: {
        Accept: "text/plain"
      }
    })
      .then(response => response.text())
      .then(data => {
        this.imageTarget.innerHTML = data
      })

    console.log(event.currentTarget.value)
  }
}
