import React from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import LayoutApp from "./components/Layout"
import Home from "./pages/Home"
import Auth from "./pages/Auth"
import UserTasks from "./pages/UserTasks"


const Router = () => {
  return(
    <BrowserRouter>
      <Switch>
        <LayoutApp>
          <Route component={Home} path="/" exact/>
          <Route component={Auth} path="/auth" exact/>
          <Route component={UserTasks} path="/user" exact/>
        </LayoutApp>
      </Switch>
    </BrowserRouter>
  )
}

export default Router