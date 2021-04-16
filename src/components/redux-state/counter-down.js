import React from "react"
import {connect} from 'react-redux'

const CounterDown = ({down}) =>
    <button onClick={down}>Down</button>

const stpm = (state) => {}
//
const propertyToDispatcher = (dispatch) => {
    return {
        down: () => {
            dispatch({type: "Down"})
        }
    }
}

export default connect()(CounterDown)
    // mapStateToProps:()=>{},
    // propertyToDispatcher
    // )(CounterDown)