import { createStore } from "redux";
import reducer from "../Reducers/Reducers";

const prestate = [];  //这里很奇怪，数组里是对象就报错

let store = createStore(reducer, prestate);

export default store;
