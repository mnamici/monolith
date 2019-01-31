import React from 'react';

import DropdownTreeSelect from 'react-dropdown-tree-select'
import 'react-dropdown-tree-select/dist/styles.css'
import '../css/FastSearchTree.css'


import { getOntologyVersionHierarchy } from '../api/MastroApi'


const renders = ["entityIRI", "entityID", "entityPrefixIRI", "entityRemainder", "entityLabel"]
const render = renders[0]

function convertData(node, arr) {

  for (let item of node) {
    const children = convertData(item.children, [])
    arr.push({
      label: item.entity[render],
      children: children
    })
  }

  return arr;
}

const onChange = (currentNode, selectedNodes) => {
  console.log('onChange::', currentNode, selectedNodes)
}
const onAction = ({ action, node }) => {
  console.log(`onAction:: [${action}]`, node)
}
const onNodeToggle = currentNode => {
  console.log('onNodeToggle::', currentNode)
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
    console.log(this.props)
    getOntologyVersionHierarchy(
      props.ontology.name,
      props.ontology.version,
      this.loaded)
  }

  loaded = (mastroData) => {
    const gData = [
      {
        label: "Classes",
        children: convertData(mastroData.hierarchyTree.classTree.children, [])
      },
      {
        label: "Object Properties",
        children: convertData(mastroData.hierarchyTree.objectPropertyTree.children, [])
      },
      {
        label: "Data Properties",
        children: convertData(mastroData.hierarchyTree.dataPropertyTree.children, [])
      }
    ]
    this.setState({ data: gData })
  }

  render() {
    return <DropdownTreeSelect
      data={this.state.data}
      onChange={onChange}
      onAction={onAction}
      onNodeToggle={onNodeToggle}
      className="ant-input"
      placeholderText="Choose or select in entity tree"
    />
  }
}