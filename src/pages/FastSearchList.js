import React from 'react';

import DropdownTreeSelect from 'react-dropdown-tree-select'
import 'react-dropdown-tree-select/dist/styles.css'
import '../css/FastSearchTree.css'

import { getMappingViews } from '../api/MastroApi'

function convertData(node) {
  let arr = []
  for (let item of node) {
    arr.push({
      label: item.sqlViewID
    })
  }

  return arr;
}

const onAction = ({ action, node }) => {
  console.log(`onAction:: [${action}]`, node)
}

export default class SearchTree extends React.Component {
  state = { data: [] }

  componentDidMount() {
    getMappingViews(
      this.props.ontology.name,
      this.props.ontology.version,
      this.props.mappingID,
      this.loaded)
    document.getElementsByClassName("dropdown-trigger")[0].click()
  }

  componentWillReceiveProps(props) {
    // console.log(this.props)
    getMappingViews(
      props.ontology.name,
      props.ontology.version,
      this.props.mappingID,
      this.loaded)
  }

  onChange = (currentNode, selectedNodes) => {
    // console.log('onChange::', currentNode)
    this.props.onHandle(currentNode.label)
    //click away to close tree
    var click = document.createEvent("MouseEvent")
    click.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    document.getElementById("root").dispatchEvent(click)


  }

  loaded = (mastroData) => {
    this.setState({ data: convertData(mastroData) })
  }

  render() {
    return <DropdownTreeSelect
      data={this.state.data}
      onChange={this.onChange}
      onAction={onAction}
      // onNodeToggle={onNodeToggle}
      className="ant-input"
      placeholderText="Choose or select SQL view"
    />
  }
}