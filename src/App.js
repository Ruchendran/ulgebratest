import {Component} from "react"

import { Redirect } from "react-router-dom"





import {BrowserRouter,Route,Switch} from "react-router-dom"


import Login from "./components/Login"

import Home from "./components/Home"

import NotFound from "./components/NotFound"



class App extends Component{
  
  render(){
    return(
      <BrowserRouter>
      <Switch>
          <Route exact path="/login" component={Login} />

          <Route exact path="/" component={Home} />

          <Route exact path="/not-found" component={NotFound} />

          <Redirect to="/not-found" />
        
      </Switch>
      </BrowserRouter>
    )
  }
}



export default App;
