// reducer处理函数

function reducer(prestate, action) {
  console.log("prestate:", prestate);
  switch (action.type) {
    case "add_project":
      var newState = [...prestate, action.value];
      return newState;

    case "del_project":
      var newState = prestate.filter(value => {
        return value.id !== action.index;
      });
      return newState;

    case "clear_project":
      var newState = prestate.filter(value => {
        return !action.idlist.includes(value.id);
      });

      return newState;
    default:
      return prestate;
  }
}

export default reducer;
