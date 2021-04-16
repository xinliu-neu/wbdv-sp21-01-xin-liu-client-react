import React from 'react'



export default class CounterReact
    extends React.Component {
    state ={
      count: 123
    }
    up = () => {
        this.setState((prevState) => {
            return{
                count: prevState.count + 1
            }
        })
    }

    down = () =>{
          this.setState((prevState) => {
              return{
                  count: prevState.count - 1
              }
          })
    }

    render() {
      return (
          <div>
            <CounterDisplay count={this.state.count}
                                      hello="How are you?"/>
            {/*<button onClick={this.down}>Down</button>*/}
            <CounterDown dowm={this.down}/>
            {/*<button onClick={this.up}>Up</button>*/}
            <CounterUp up={this.up}/>
          </div>
      )
    }
}