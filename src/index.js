import React from "react";
import ReactDOM from "react-dom";
import App from './App'

import {Provider} from 'react-redux'
import './index.css'

// 引入store
import store from './components/Store/Store'


ReactDOM.render(

    //使用provider组件监听子组件，有需要store的就传给他
    <Provider store={store} >  
          <App/>
    </Provider>,


    document.getElementById("root")
)
