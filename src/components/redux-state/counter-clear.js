import React from "react"

const CounterClear = ({clearTheCounter}) =>
    <button onClick={clearTheCounter}>
        Clear
    </button>

const stpm = (state) => {}
const dtpm = (dispatch) => ({
  clearTheCounter: () => dispatch({type: "c"})
})

export default