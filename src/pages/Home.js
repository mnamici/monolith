import React from 'react';
import LastLoadedList from './LastLoadedList'
import MainMenuDescriptions from './MainMenuDescriptions'
import logo  from '../scritta.svg'

const dataOntologies = [
  {
    title: 'ACI-1.0',
    description: 'First version of ACI ontology'
  },
  {
    title: 'ISTAT-1.0',
    description: 'First version of ISTAT ontology'
  },
  {
    title: 'ACI-121.0',
    description: 'Last version of ACI ontology'
  },
];

const dataKG = [
  {
    title: 'KG1',
    description: 'First version of ACI knowledge graph'
  },
];

const dataDataset = [
  {
    title: 'DS1',
    description: 'First version of ACI dataset'
  },
  {
    title: 'DS2',
    description: 'Second version of ACI dataset'
  },

];


class Home extends React.Component {
  render() {
    return (
      <div style={{ height: 'calc(94vh - 14px)', overflowX: 'hidden', overflowY: 'auto' }}>
        <img src={logo} alt="logo" style={{maxHeight: 100}}/>
        <LastLoadedList title="Last Loaded Ontologies" data={dataOntologies} path="/open/ontology/info" />
        <LastLoadedList title="Last Loaded Knowledge Graphs" data={dataKG} path="/kg" />
        <LastLoadedList title="Last Loaded Datasets" data={dataDataset} path="/dataset" />
        <MainMenuDescriptions />
      </div>
    );
  }
}

export default Home;