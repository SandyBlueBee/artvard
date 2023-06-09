import { Controller } from "@hotwired/stimulus"
import { createPopper } from "@popperjs/core";

// Connects to data-controller="paint"
export default class extends Controller {
  static targets = ["canvas"];

  connect() {
    console.log("paint.js has arrived");
    this.canvasTarget.height = 500;
    this.canvasTarget.width = 600;
    this.prevX = null
    this.prevY = null
    this.draw = false
    this.ctx = this.canvasTarget.getContext("2d")
    this.ctx.lineWidth = 50;


    // const ctx = canvas.getContext("2d")
    // canvas.addEventListener("mousemove", this.draw.bind(this))
    // canvas.addEventListener("mousemove", this.coordinates.bind(this))
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

      // create line through path
      this.ctx.beginPath(this.prevX, this.prevY);
      this.ctx.moveTo(this.prevX, this.prevY);
      // this.ctx.lineTo(currentX, currentY);
      this.ctx.arc(currentX, currentY, 5, 0, 2* Math.PI);
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
    this.ctx.clearRect(0, 0, this.canvasTarget.height, this.canvasTarget.width)
  }

  savePng(){
    console.log("saving")
    var data = this.canvasTarget.toDataURL("image/jpeg")
    var a = document.createElement("a")
    a.href = data.download = "sketch.png"
    a.click()
  }
}
