import React from 'react';
import { Button } from 'antd';
import { downloadOntologyFile, downloadMappingFile } from '../api/MastroApi';
import { saveFileInfo } from '../utils/utils'
import { downloadKnowledgeGraph } from '../api/KgApi';

export default class DownloadFile extends React.Component {

  download = () => {
    if (this.props.mapping)
      downloadMappingFile(this.props.ontology.name, this.props.ontology.version, this.props.mapping, saveFileInfo)
    else if (this.props.ontology)
      downloadOntologyFile(this.props.ontology.name, this.props.ontology.version, saveFileInfo)
    else if (this.props.kg)
      downloadKnowledgeGraph(this.props.kg.kgIri, "RDF", saveFileInfo)
  }

  render() {
    return (
      <div style={{ margin: 'auto' }}>
        <Button type='primary' icon='download' onClick={this.download}>
          {this.props.title || 'Download'}
        </Button>
      </div>

    );
  }
}
