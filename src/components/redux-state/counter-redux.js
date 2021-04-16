import React from 'react'
import CounterDisplay from "../counter/react-state/counter-display";
import CounterUp from "./counter-up";
import CounterDown from "./counter-down";
import {createStore} from "redux";
import {Provider} from  "react-redux";
//
// const initialState = {
//     count: 234
// }
//
// const reducer = ( prevstate =initialState, action ) => {
//   switch (action.type) {
//     case "Clear":
//           count
//     case "UP":
//       return{
//           count: prevstate.count + 1
//       }
//     case "Down":
//       return {
//           count: prevstate.count - 1
//       }
//     default:
//       return prevstate
//   }
// }
const store = createStore(reducer)

export default class CounterRedux
    extends React.Component{
    render( ) {
      return(
          <Provider store={store}>
              <div>
                <CounterDisplay/>
                <CounterUp/>
                <CounterDown/>
                <CounterClear/>

              </div>
          </Provider>

      )
    }


}