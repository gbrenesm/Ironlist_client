import React from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import LayoutApp from "./components/Layout"
import Home from "./pages/Home"
import Auth from "./pages/Auth"


const Router = () => {
  return(
    <BrowserRouter>
      <Switch>
        <LayoutApp>
          <Route component={Home} path="/" exact/>
          <Route component={Auth} path="/auth" exact/>
        </LayoutApp>
      </Switch>
    </BrowserRouter>
  )
}

export default Router