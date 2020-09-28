import React from 'react';
import './App.css';

class App extends React.Component {
    state = {
        canClick: false,
        sequence: [],
        sequenceToGuess: [],
        active: null,
        status: 0
    }

    getRandomPanel = () => {
        const panels = ["top-left", "top-right", "bottom-left", "bottom-right"];
        const randomPanel = panels[parseInt(Math.random() * panels.length, 10)];
        console.log("getRandomPanel", typeof randomPanel, randomPanel);
        return randomPanel
    };

    flash = (panel) => {
        console.log("flash", panel)
        return new Promise((resolve) => {
            this.setState({
                active: panel
            })
            setTimeout(() => {
                this.setState({
                    active: null
                })
                setTimeout(() => {
                    resolve();
                }, 250);
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
                    // console.log("3 expectedPanel === panel", expectedPanel === panel);
                    // console.log("3 copySequenceToGuess", copySequenceToGuess)
                    // console.log("3 this.state.sequenceToGuess.length", this.state.sequenceToGuess.length)
                    // console.log("3 this.state.sequenceToGuess", this.state.sequenceToGuess)
                    if (this.state.sequenceToGuess.length === 0) {
                        console.log("start a new round");
                        const update = [this.getRandomPanel()]
                        this.setState({
                            sequence: this.state.sequence.concat(update),
                            sequenceToGuess: this.state.sequence.concat(update),
                            status: this.state.status + 1
                        })
                        this.startFlashing();
                    } else {
                        console.log("hohoho")
                    }
                } else {
                    alert("game over");
                    this.setState({
                        sequence: [],
                        sequenceToGuess: [],
                        status: 0
                    })
                }
            })

        }
    };

    startFlashing = async () => {
        this.setState({
            canClick: false
        })

        for (const panel of this.state.sequence) {
            await this.flash(panel);
        }
        this.setState({
            canClick: true,
            status: 0
        })
    };

    componentDidMount() {
        const item = this.getRandomPanel();
        console.log("item", item);
        this.setState({
            sequence: [item],
            sequenceToGuess: [item]
        })
    }

    render() {
        return (
            <div className="App">
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
                    <div>sequence: {this.state.sequence}</div>
                    <div>sequenceToGuess: {this.state.sequenceToGuess}</div>
                    <div>status: {this.state.status}</div>
                    <button onClick={this.startFlashing}>Start</button>
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
