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
      children: children,
      className: predicateType,
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
  _isMounted = false;
  state = { data: [], loading: false }

  componentDidMount() {
    this._isMounted = true;
    this.setState({ loading: true })
    getOntologyVersionHierarchy(
      this.props.ontology.name,
      this.props.ontology.version,
      this.loaded)

    // document.getElementsByClassName("dropdown-trigger")[0].click()

  }

  componentWillReceiveProps(props) {
    // console.log(this.props)
    this.setState({ loading: true })
    getOntologyVersionHierarchy(
      props.ontology.name,
      props.ontology.version,
      this.loaded)
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  onChange = (currentNode, selectedNodes) => {
    if (currentNode._depth !== 0) {
      // console.log('onChange::', currentNode)
      this.props.onHandle(currentNode.entityID, currentNode.predicateType)
      //simulate click away to close tree
      // var click = document.createEvent("MouseEvent")
      // click.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
      // document.getElementById("root").dispatchEvent(click)

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
        className: predicateTypes.c,
        expanded: true,
        children: convertData(mastroData.hierarchyTree.classTree.children, [], predicateTypes.c)
      },
      {
        label: "Object Properties",
        className: predicateTypes.op,
        expanded: true,
        children: convertData(mastroData.hierarchyTree.objectPropertyTree.children, [], predicateTypes.op)
      },
      {
        label: "Data Properties",
        className: predicateTypes.dp,
        expanded: true,
        children: convertData(mastroData.hierarchyTree.dataPropertyTree.children, [], predicateTypes.dp)
      }
    ]
    this._isMounted && this.setState({ data: gData, loading: false })
  }

  render() {
    const data = this.state.loading ?
      [{ label: 'Loading...' }] :
      this.state.data

    return <DropdownTreeSelect
      data={data}
      onChange={this.onChange}
      onAction={onAction}
      // onNodeToggle={onNodeToggle}
      className="ant-input"
      placeholderText="Search or select from entity tree"
      showDropdown
    />
  }
}