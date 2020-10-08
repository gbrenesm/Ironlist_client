import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import axios from "axios"
import{ SWRConfig } from "swr"
import 'antd/dist/antd.css';
import ContextProvider from "./context"
import Router from "./Router"

axios.defaults.baseURL = process.env.NODE_ENV === "production"? "https://allmybooksmex.herokuapp.com" : "http://localhost:3000"

ReactDOM.render(
  <SWRConfig value={{fetcher: url => axios.get(url).then(res => res.data)}}>
    <ContextProvider>
      <Router/>
    </ContextProvider>
  </SWRConfig>,
  document.getElementById('root')
);

serviceWorker.unregister();
