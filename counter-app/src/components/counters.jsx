import React, { Component } from "react";
import Counter from "./counter";

class Counters extends Component {
  render() {
    const { counters, onIncrement, onDelete, onReset } = this.props;

    return (
      <div>
        {counters.map((counter) => (
          <Counter
            key={counter.id}
            onIncrement={() => onIncrement(counter)}
            onDelete={onDelete}
            counter={counter}
          >
            <h4>Counter #{counter.id}</h4>
          </Counter>
        ))}
        <button
          onClick={onReset}
          className="btn btn-danger btn-lg btn-block m-2"
        >
          Reset
        </button>
      </div>
    );
  }
}

export default Counters;
