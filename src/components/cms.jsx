import React, { Component } from "react";
import { connect } from "react-redux";
import { add_project, del_project, clear_uncomplete } from "./Action/Action";

let proId = 0;
let showUncompleteState = false;

class CMS extends Component {
  render() {
    let con = this.props.project.map(value => {
      return (
        <li
          key={value.id}
          style={{ color: "#f00", display: this.state[value.id] }}
        >
          <input type="checkbox" onClick={this.isCheckBoxActive(value.id)} />
          {value.name}
          <button onClick={this.delproject(value.id)}>-</button>
        </li>
      );
    });
    return (
      <ul>
        <li>
          <input
            type="text"
            ref={ele => {
              this.input = ele;
            }}
          />
          <button onClick={this.addproject}>提交</button>
        </li>
        {con}
        <button onClick={this.hideUnComplete}>隐藏已完成项</button>
        <button onClick={this.clearAllUnComplete}>清空所有未完成</button>
      </ul>
    );
  }

  //   增加项目

  addproject = () => {
    proId++;
    this.setState({
      [proId]: "block"
    });
    this.props.addProject(this.input.value, proId);
  };
  // 删除项目
  delproject = id => {
    return () => {
      this.props.delProject(id);
    };
  };

  //   点击checkbox 标记已完成
  isCheckBoxActive = id => {
    return e => {
      // (1)根据id找到该项目 并修改iscomplete字段
      let targetProjet = this.props.project.filter(item => {
        return item.id == id;
      });
      targetProjet[0].isComplete = !targetProjet[0].isComplete;

      // (2) 改变颜色
      if (targetProjet[0].isComplete == true) {
        e.target.parentNode.style.color = "#0f0";
      } else {
        e.target.parentNode.style.color = "#f00";
      }
    };
  };

  //   填仓所有的未完成项
  hideUnComplete = () => {
    showUncompleteState = !showUncompleteState;
    // (1)找到所有的未完成项
    let unCompleteItem = this.props.project.filter(item => {
      return item.isComplete == false;
    });
    // （2）根据所有的未完成项的id，在state中设置一个状态
    unCompleteItem.map(item => {
      if (showUncompleteState == true) {
        this.setState({
          [item.id]: "none"
        });
      } else {
        this.setState({
          [item.id]: "block"
        });
      }
    });
  };

  clearAllUnComplete = () => {
    // (1)找到所有未完成
    let list = [];
    this.props.project.map(item => {
      if (item.isComplete == false) {
        list.push(item.id);
      }
    });
    // (2)传给reducer
    this.props.clear(list);
  };
}

function mapStateToProps(state) {
  return {
    project: state
  };
}

function mapDisPatchToProps(dispatch) {
  return {
    addProject: (value, id) => {
      let proItem = {
        id,
        name: value,
        isComplete: false
      };
      dispatch(add_project(proItem));
    },
    delProject: id => {
      dispatch(del_project(id));
    },
    clear: idlist => {
      dispatch(clear_uncomplete(idlist));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDisPatchToProps
)(CMS);
