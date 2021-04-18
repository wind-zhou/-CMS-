// action creator
export function add_project(value) {
  return {
    type: "add_project",
    value
  };
}

export function del_project(index) {
  return {
    type: "del_project",
    index
  };
}

export function clear_uncomplete(idlist) {
  return {
    type: "clear_project",
    idlist
  };
}
