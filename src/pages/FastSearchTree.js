import React from 'react';

import DropdownTreeSelect from 'react-dropdown-tree-select'
import 'react-dropdown-tree-select/dist/styles.css'
import '../css/FastSearchTree.css'

import { getOntologyVersionHierarchy } from '../api/MastroApi'

import { renderEntity, predicateTypes } from '../utils/utils'

function convertData(node, arr, predicateType) {

  for (let item of node) {
    const children = convertData(item.children, [], predicateType)
    arr.push({
      label: renderEntity(item.entity),
      entityID: item.entity.entityID,
      predicateType: predicateType,
      children: children
    })
  }

  return arr.sort(function (a, b) {
    var x = a.label.toLowerCase();
    var y = b.label.toLowerCase();
    if (x < y) { return -1; }
    if (x > y) { return 1; }
    return 0;
  });
}

const onAction = ({ action, node }) => {
  console.log(`onAction:: [${action}]`, node)
}

export default class SearchTree extends React.Component {
  state = { data: [] }

  componentDidMount() {
    getOntologyVersionHierarchy(
      this.props.ontology.name,
      this.props.ontology.version,
      this.loaded)
  }

  componentWillReceiveProps(props) {
    // console.log(this.props)
    getOntologyVersionHierarchy(
      props.ontology.name,
      props.ontology.version,
      this.loaded)
  }

  onChange = (currentNode, selectedNodes) => {
    if (currentNode._depth !== 0) {
      // console.log('onChange::', currentNode)
      this.props.onHandle(currentNode.entityID, currentNode.predicateType)
      //click away to close tree
      var click = document.createEvent("MouseEvent")
      click.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
      document.getElementById("root").dispatchEvent(click)

    }
    // toggle expand and collapse clicking on Classes Object Properties adn Data Properties labels
    else {
      for (let node of document.getElementsByClassName('toggle collapsed')) {
        if (node.nextElementSibling.title === currentNode.label) {
          node.click()
          return;
        }
      }
      for (let node of document.getElementsByClassName('toggle expanded')) {
        if (node.nextElementSibling.title === currentNode.label) {
          node.click()
          return;
        }
      }
    }

  }

  loaded = (mastroData) => {
    const gData = [
      {
        label: "Classes",
        children: convertData(mastroData.hierarchyTree.classTree.children, [], predicateTypes.c)
      },
      {
        label: "Object Properties",
        children: convertData(mastroData.hierarchyTree.objectPropertyTree.children, [], predicateTypes.op)
      },
      {
        label: "Data Properties",
        children: convertData(mastroData.hierarchyTree.dataPropertyTree.children, [], predicateTypes.dp)
      }
    ]
    this.setState({ data: gData })
  }

  render() {
    return <DropdownTreeSelect
      data={this.state.data}
      onChange={this.onChange}
      onAction={onAction}
      // onNodeToggle={onNodeToggle}
      className="ant-input"
      placeholderText="Search or select in entity tree"
    />
  }
}