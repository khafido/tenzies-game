import React from "react";
import Die from "./Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

class ClassComp extends React.Component {
    constructor() {
        super();
        this.state = {
          dice: this.allNewDice(),
          tenzies: false
        }
        this.generateNewDie = this.generateNewDie.bind(this);
        this.holdDice = this.holdDice.bind(this);
        this.rollDice = this.rollDice.bind(this);
        this.allNewDice = this.allNewDice.bind(this);
        console.log("CONSTRUCTOR");
      }
    
      componentDidMount() {
        console.log("MOUNT");
      }
    
      componentDidUpdate() {
        console.log("UPDATE");
      }
    
      componentWillUnmount() {
        console.log("UNMOUNT");
      }
    
      checkWin(allHeld, allSameValue) {
        if (allHeld && allSameValue) {
          this.setState({ tenzies: true });
        }
      }
    
      allNewDice() {
        const newDice = [];
        for (let i = 0; i < 10; i++) {
          newDice.push(this.generateNewDie());
        }
        return newDice;
      }
    
      generateNewDie() {
        return {
          value: Math.ceil(Math.random() * 6),
          isHeld: false,
          id: nanoid()
        }
      }
    
      holdDice(id) {
        let newDice = this.state.dice.map(die => {
          return die.id === id ?
          { ...die, isHeld: !die.isHeld } :
          die;
        });
        console.log("new", newDice);
        const allHeld = newDice.every(die => die.isHeld);
        const firstValue = newDice[0].value;
        const allSameValue = newDice.every(die => die.value === firstValue);
        this.setState({ dice: newDice });
        this.checkWin(allHeld, allSameValue);
      }
    
      rollDice() {
        if (!this.state.tenzies) {
          let newDice = this.state.dice.map(die => {
            return (die.isHeld) ? die : this.generateNewDie()
          });
          this.setState({ dice: newDice });
        } else {
          this.setState({ tenzies: false });
          this.setState({ dice: this.allNewDice() });
        }
      }

      render() {
        let diceElements = this.state.dice.map(die => (
          <Die
            key={die.id}
            value={die.value}
            isHeld={die.isHeld}
            holdDice={() => this.holdDice(die.id)}
          />
        ));
    
        const confettiStatus = this.state.tenzies?<Confetti />:null;
     
        return (
            <div className="wrapper">
              {confettiStatus}
              <h1 className="title">Tenzies</h1>
              <h3>(Class Component)</h3>
              <p className="instructions">Roll until all dice are the same.
                Click each die to freeze it at its current value between rolls.</p>
              <div className="dice-container">
                {diceElements}
              </div>
              <button
                className="roll-dice"
                onClick={this.rollDice}
              >
                {this.state.tenzies ? "New Game" : "Roll"}
              </button>
            </div>
        );
      }
}

export default ClassComp;