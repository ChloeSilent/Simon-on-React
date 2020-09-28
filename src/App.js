import React from "react";
import "./App.css";

import audio0 from "./sounds/1.ogg";
import audio1 from "./sounds/2.ogg";
import audio2 from "./sounds/3.ogg";
import audio3 from "./sounds/4.mp3";

const audios = {
    "top-left": audio0,
    "top-right": audio1,
    "bottom-left": audio2,
    "bottom-right": audio3
};

class App extends React.Component {
    state = {
        canClick: false,
        sequence: [],
        sequenceToGuess: [],
        active: null,
        round: 0,
        status: ""
    }

    getRandomPanel = () => {
        const panels = ["top-left", "top-right", "bottom-left", "bottom-right"];
        const randomPanel = panels[parseInt(Math.random() * panels.length, 10)];
        return randomPanel
    };

    flash = (panel) => {
        return new Promise((resolve) => {
            // const sound = new Audio(audios[panel])
            // sound.play();
            this.setState({
                active: panel
            })
            setTimeout(() => {
                this.setState({
                    active: null
                })
                setTimeout(() => {
                    resolve();
                }, 500);
            }, 1000);
        });
    };

    panelClicked = (panel) => {
        if (this.state.canClick) {
            let copySequenceToGuess = [...this.state.sequenceToGuess]
            const expectedPanel = copySequenceToGuess.shift();
            this.setState({
                sequenceToGuess: [...copySequenceToGuess]
            }, () => {
                if (expectedPanel === panel) {
                    if (this.state.sequenceToGuess.length === 0) {
                        console.log("start a new round");
                        const update = [this.getRandomPanel()]
                        this.setState({
                            sequence: this.state.sequence.concat(update),
                            sequenceToGuess: this.state.sequence.concat(update),
                            round: this.state.round + 1
                        })
                        this.startFlashing();
                    }
                } else {
                    this.setState({
                        sequence: [],
                        sequenceToGuess: [],
                        round: 0,
                        status: "game over"
                    })
                }
            })

        }
    };

    startFlashing = async () => {
        if (this.state.round >= 21) {
            this.setState({
                sequence: [],
                sequenceToGuess: [],
                round: 0,
                status: "You win!"
            })
        } else {
            this.setState({
                canClick: false
            })

            for (const panel of this.state.sequence) {
                await this.flash(panel);
            }
            this.setState({
                canClick: true,
            })
        }
    };

    startGame = async () => {
        setTimeout(async () => {
            const item = this.getRandomPanel();
            this.setState({
                canClick: false,
                sequence: [item],
                sequenceToGuess: [item],
                active: null,
                round: 0,
                status: ""
            })
            for (const panel of this.state.sequence) {
                await this.flash(panel);
            }
        }, 300)
    }

    componentDidMount() {
        const item = this.getRandomPanel();
        this.setState({
            sequence: [item],
            sequenceToGuess: [item]
        })
    }

    render() {
        return (
            <div className="App">
                <div className="title">
                    <h1>Simon</h1>
                    <button className="play-button" onClick={this.startFlashing}>Start</button>
                </div>
                <div className="game">
                    <div className="simonPanel">
                        <div className="row">
                            <div onClick={() => {
                                this.panelClicked("top-left")
                            }}
                                 className={`top-left panel ${this.state.active === "top-left" ? "active" : ""}`}>
                            </div>
                            <div onClick={() => {
                                this.panelClicked("top-right")
                            }}
                                 className={`top-right panel ${this.state.active === "top-right" ? "active" : ""}`}>
                            </div>
                        </div>
                        <div className="row">
                            <div onClick={() => {
                                this.panelClicked("bottom-left")
                            }}
                                 className={`bottom-left panel ${this.state.active === "bottom-left" ? "active" : ""}`}>
                            </div>
                            <div onClick={() => {
                                this.panelClicked("bottom-right")
                            }}
                                 className={`bottom-right panel ${this.state.active === "bottom-right" ? "active" : ""}`}>
                            </div>
                        </div>
                    </div>
                    <div className="additionalData">
                        <div>Round : {this.state.round}</div>
                    </div>
                </div>
                <div
                    className={`modal ${this.state.status === "You win!" || this.state.status === "game over" ? "shown" : ""}`}>
                    <div className="message">
                        <p>{this.state.status}</p>
                        <button className="play-button" onClick={this.startGame}>Try again</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;


// import "./styles.css";
//
// const topLeft = document.querySelector(".top-left");
// const topRight = document.querySelector(".top-right");
// const bottomLeft = document.querySelector(".bottom-left");
// const bottomRight = document.querySelector(".bottom-right");
// const panels = document.querySelectorAll(".panel");
// let canClick = false;
//
// const getRandomPanel = () => {
//   const panels = [topLeft, topRight, bottomLeft, bottomRight];
//   return panels[parseInt(Math.random() * panels.length, 10)];
// };
//
// const sequence = [
//   getRandomPanel()
//   // getRandomPanel(),
//   // getRandomPanel(),
//   // getRandomPanel()
// ];
// let sequenceToGuess = [...sequence];
//
// const flash = (panel) => {
//   return new Promise((resolve) => {
//     panel.className += " active";
//     setTimeout(() => {
//       panel.className = panel.className.replace(" active", "");
//       setTimeout(() => {
//         resolve();
//       }, 250);
//     }, 1000);
//   });
// };
//
// const panelClicked = (panel) => {
//   if (canClick) {
//     console.log("panel", panel);
//     const expectedPanel = sequenceToGuess.shift();
//     if (expectedPanel === panel) {
//       if (sequenceToGuess.length === 0) {
//         console.log("start a new round");
//         sequence.push(getRandomPanel());
//         sequenceToGuess = [...sequence];
//         startFlashing();
//       }
//     } else {
//       console.log("game over");
//     }
//   }
// };
//
// panels.forEach((panel) => {
//   panel.addEventListener("click", (event) => {
//     panelClicked(event.currentTarget);
//   });
// });
//
// const startFlashing = async () => {
//   canClick = false;
//   for (const panel of sequence) {
//     await flash(panel);
//   }
//   canClick = true;
// };
//
// startFlashing();
