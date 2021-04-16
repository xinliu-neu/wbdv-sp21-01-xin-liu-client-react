import React from 'react'
import CounterDisplay from "../counter/react-state/counter-display";
import CounterUpun from "./counter-up";
import CounterDown from "./counter-down";
import CounterUp from "./counter-up";
const initialState = {
  count: 234
}

const reducer = ( prevstate =initialState, action ) => {
  switch (action.type) {
    case "Clear":
      count
    case "UP":
      return{
        count: prevstate.count + 1
      }
    case "Down":
      return {
        count: prevstate.count - 1
      }
    default:
      return prevstate
  }
}