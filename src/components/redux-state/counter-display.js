import React from "react";
import {connect} from "react-redux";


const CounterDisplay = ({theCount = 321}) =>
    <h1>Counter: {theCount}</h1>

const stateToPropertyMapper = (state) => {
  console.log(state)
  const map = {
      theCount: state.count
  }
  return map
}

// const ewq = connect()
// ewq(CounterDisplay)
export default connect() (stateToPropertyMapper)
(CounterDisplay)