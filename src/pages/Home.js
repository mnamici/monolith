import React from 'react';
import LastLoadedList from './LastLoadedList'
import MainMenuDescriptions from './MainMenuDescriptions'
import logo from '../scritta.svg'
import { isChrome } from '../utils/utils';

const dataOntologies = [
  // {
  //   ontologyID: 'ACI',
  //   versionID: '1.0',
  //   ontologyDescription: 'First version of ACI ontology'
  // },
  // {
  //   ontologyID: 'ISTAT',
  //   versionID: '1.0',
  //   ontologyDescription: 'First version of ISTAT ontology'
  // },
  // {
  //   ontologyID: 'ACI',
  //   versionID: '121.0',
  //   ontologyDescription: 'Last version of ACI ontology'
  // },
];

const dataKG = [
  // {
  //   title: 'KG1',
  //   description: 'First version of ACI knowledge graph'
  // },
];

const dataDataset = [
  // {
  //   title: 'DS1',
  //   description: 'First version of ACI dataset'
  // },
  // {
  //   title: 'DS2',
  //   description: 'Second version of ACI dataset'
  // },

];


export default class Home extends React.Component {
  render() {

    return (
      <div style={{ height: 'calc(99vh - 25px)', overflow: 'auto', marginRight: '-1vw' }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}><img src={logo} alt="logo" style={isChrome ? { height: 100 } : { maxHeight: 100 }} /></div>
        {<LastLoadedList
          ontology title="Recent Ontologies"
          data={dataOntologies}
          path="/open/ontology/info"
          open={this.props.openOntology} />}
        {<LastLoadedList
          title="Recent Knowledge Graphs"
          data={dataKG}
          path="/kg"
          open={() => null} />}
        {<LastLoadedList
          title="Recent Datasets"
          data={dataDataset}
          path="/dataset"
          open={() => null} />}
        <MainMenuDescriptions />
      </div>
    );
  }
}
