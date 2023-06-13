import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["card", "players", "timer"]
  static values = { gameroomId: Number, currentUserId: Number }

  connect(){
    console.log("lzerhjvberkjnbub");
    this.counter = 0
  }

  start() {
    this.updateTimer();
  }

  // insertNewPlayer(data) {
  //   this.playersTarget.insertAdjacentHTML("beforeend", data.partial)
  // }

  flip (event) {
    if (event.currentTarget.classList.contains("disabled")) return;
    clearTimeout(this.timing)
    event.currentTarget.classList.remove("upsidedown")
    if (event.currentTarget == this.card) return;

    this.counter += 1
    this.match = event.currentTarget.dataset.id === this.id
    this.card = event.currentTarget
    this.id = this.card.dataset.id

    if (this.counter % 2 === 0) {
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
        console.log("maaaatch");
      }
      if (this.counter % 2 === 0) {
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

  score(data) {
    console.log(data);
  }

  updateTimer(data) {
    this.timer = 5
    this.cardTargets.forEach(card => {
      card.classList.remove("upsidedown")
    })
    let interval = setInterval(() => {
      if (this.timer === 1) {
        this.cardTargets.forEach(card => {
          card.classList.add("upsidedown")
          card.classList.remove("disabled")
        })
      }
      this.timer -= 1
      if (this.timer === 0) {
        clearInterval(interval)
      }
      this.timerTarget.innerText = this.timer
    }, 1000);
  }

}
