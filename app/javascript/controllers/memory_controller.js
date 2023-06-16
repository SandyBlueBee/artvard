import { Controller } from "@hotwired/stimulus"
import { createConsumer } from "@rails/actioncable"
import ConfettiGenerator from "confetti-js";

export default class extends Controller {
  static targets = ["card", "players", "timer"]
  static values = { gameroomId: Number, currentUserId: Number }

  connect(){
    this.counter = 0
    this.channel = createConsumer().subscriptions.create(
      {
        channel: "GameroomChannel",
        id: this.gameroomIdValue },
      {
        received: (data) => {
          this[data.action](data)
        }
      },
    )
  }


  insertNewPlayer(data) {
    this.playersTarget.insertAdjacentHTML("beforeend", data.partial)
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
        fetch(`/gamerooms/${this.gameroomIdValue}/`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
        })
        console.log(this.cardTargets.every(card => card.classList.contains("remove")));
        if (this.cardTargets.every(card => card.classList.contains("remove"))) {
          document.body.innerHTML += `
          <div style="
            position: absolute; top: 0; width: 100vw; height: 100vh; display: flex;
            align-items: center;
            justify-content: center;
          ">
              <div style="
                background: rgba(255, 255, 255, 0.35);
                border-radius: 8px;
                box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
                backdrop-filter: blur(9.2px);
                -webkit-backdrop-filter: blur(9.2px);
                border: 1px solid rgba(255, 255, 255, 0.3);
                height: 20vh;
                width: 40vw;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
              ">
                  <p> GG tu as gagné !</p>
                  <a class="button game-button" href="/gamerooms/${this.gameroomIdValue}">Restart</a>
              </div>
          </div>`
          this.gameOver({ id: this.currentUserIdValue })
          var confettiSettings = { target: 'my-canvas' };
          console.log(confettiSettings);
          var confetti = new ConfettiGenerator(confettiSettings);
          console.log(confetti);
          confetti.render();
        }
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
    this.playersTarget.querySelector(`#player_${data.id}`).outerHTML = data.partial
  }

  start() {
    this.channel.perform("start")
  }

  restart() {
    this.channel.perform("restart")
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
        console.log(this.timerTarget)
        this.timerTarget.style.display = "none"
        setTimeout(function(){
  }, 1000);
        clearInterval(interval)
      }
      this.timerTarget.innerText = this.timer
    }, 1000);
  }

  gameOver(data) {
    this.channel.perform("game_over", data)
  }

  finishGame(data) {
    if (data.id === this.currentUserIdValue) {
      return
    } else {
      this.cardTargets.forEach(card => {
        card.classList.add("remove")
      })
      document.body.innerHTML += `
        <div style="
          position: absolute; top: 0; width: 100vw; height: 100vh; display: flex;
          align-items: center;
          justify-content: center;">
          <div style="
            background: rgba(255, 255, 255, 0.35);
            border-radius: 8px;
            box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
            backdrop-filter: blur(9.2px);
            -webkit-backdrop-filter: blur(9.2px);
            border: 1px solid rgba(255, 255, 255, 0.3);
            height: 20vh;
            width: 40vw;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;">
            <p> Dommage tu as perdu ! </p>
            <a class="button game-button" href="/gamerooms/${this.gameroomIdValue}">Restart</a>
          </div>
        </div>
      `
    }
  }
}
