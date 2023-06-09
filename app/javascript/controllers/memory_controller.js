import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="memory"
export default class extends Controller {
  static targets = ["card"]
  connect(){
    this.counter = 0
  }
  flip (event) {
    if (event.currentTarget.classList.contains("disabled")) return;
    clearTimeout(this.timing)
    event.currentTarget.classList.remove("upsidedown")
    if (event.currentTarget == this.card) return;

    this.counter += 1
    this.match = event.currentTarget.dataset.id === this.id
    this.card = event.currentTarget
    this.id = this.card.dataset.id
    if (this.counter%2 === 0) {
      this.cardTargets.forEach(card => {
        card.classList.add("disabled")
      })
    }

    this.timing = setTimeout(() => {
      if (this.match) {
        this.cardTargets.forEach(card => {
          if (card.dataset.id === this.id){
            card.classList.add("remove")
          }
        });
      }
      if (this.counter%2 === 0) {
        this.id = null
        this.card = null
        this.cardTargets.forEach(card => {
          card.classList.add("upsidedown")
        })
      }

      this.cardTargets.forEach(card => {
        card.classList.remove("disabled")
      })

    }, 1000);


  }

  start() {
    this.cardTargets.forEach(card => {
      console.log(card);
      card.classList.add("upsidedown")
      card.classList.remove("disabled")
    })
  }

  restart() {
    window.location.reload()
  }
}
