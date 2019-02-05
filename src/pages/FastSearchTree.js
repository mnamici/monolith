import React from 'react';

import DropdownTreeSelect from 'react-dropdown-tree-select'
import 'react-dropdown-tree-select/dist/styles.css'
import '../css/FastSearchTree.css'

import { getOntologyVersionHierarchy } from '../api/MastroApi'

export const predicateTypes = {
  c: "class",
  op: "objectProperty",
  dp: "dataProperty",
  i: "individuals"
}

const renders = ["entityIRI", "entityID", "entityPrefixIRI", "entityRemainder", "entityLabel"]
const render = renders[2]

function convertData(node, arr, predicateType) {

  for (let item of node) {
    const children = convertData(item.children, [], predicateType)
    arr.push({
      label: item.entity[render],
      entityID: item.entity.entityID,
      predicateType: predicateType,
      children: children
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
    if (currentNode.label !== predicateTypes.c && currentNode.label !== predicateTypes.op && currentNode.label !== predicateTypes.dp){
      // console.log('onChange::', currentNode)
      this.props.onHandle(currentNode.entityID, currentNode.predicateType)
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
      placeholderText="Choose or select in entity tree"
    />
  }
}