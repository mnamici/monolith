import React from 'react';
import { Button } from 'antd';
import { downloadOntologyFile, downloadMappingFile } from '../api/MastroApi';
import { saveFileInfo } from '../utils/utils'

export default class DownloadFile extends React.Component {
  state = {
    loading: false,
  };

  download = () => {
    if (this.props.mapping)
      downloadMappingFile(this.props.ontology.name, this.props.ontology.version, this.props.mapping, saveFileInfo)
    else if (this.props.ontology)
      downloadOntologyFile(this.props.ontology.name, this.props.ontology.version, saveFileInfo)
  }

  render() {
    return (
      <div style={{ margin: 'auto' }}>
        <Button icon='download' onClick={this.download}>
          Download
        </Button>
      </div>

    );
  }
}
