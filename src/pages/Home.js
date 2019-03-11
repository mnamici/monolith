import React from 'react';
import LastLoadedList from './LastLoadedList'
import MainMenuDescriptions from './MainMenuDescriptions'
import logo from '../scritta.svg'

const dataOntologies = [
  {
    ontologyID: 'ACI',
    versionID: '1.0',
    ontologyDescription: 'First version of ACI ontology'
  },
  {
    ontologyID: 'ISTAT',
    versionID: '1.0',
    ontologyDescription: 'First version of ISTAT ontology'
  },
  {
    ontologyID: 'ACI',
    versionID: '121.0',
    ontologyDescription: 'Last version of ACI ontology'
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
      <div style={{ height: 'calc(96vh - 21px)', overflowX: 'hidden', overflowY: 'auto' }}>
        <img src={logo} alt="logo" style={{ maxHeight: 100 }} />
        <LastLoadedList
          ontology title="Last Loaded Ontologies"
          data={dataOntologies}
          path="/open/ontology/info"
          open={this.props.openOntology} />
        <LastLoadedList
          title="Last Loaded Knowledge Graphs"
          data={dataKG}
          path="/kg"
          open={() => null} />
        <LastLoadedList
          title="Last Loaded Datasets"
          data={dataDataset}
          path="/dataset"
          open={() => null} />
        <MainMenuDescriptions />
      </div>
    );
  }
}

export default Home;