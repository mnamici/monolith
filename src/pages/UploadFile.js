import React from 'react';
import { Upload, Icon, message, Button } from 'antd';
import { uploadOntologyFile, uploadMappingFile } from '../api/MastroApi';
import { getBase64 } from '../utils/utils'

function beforeUpload(file) {
  this.setState({ loading: true });
  if (this.props.type === 'owl') {
    const validFormat = file.name.endsWith('.owl') || file.name.endsWith('.graphol')
    if (!validFormat) {
      message.error('You can only upload OWL or GRAPHOL file! Found ' + file.type);
      this.setState({ loading: false });
    }

    else {
      getBase64(file, (file64) => {
        let json = {
          content: file64,
          fileType: file.name.endsWith('.owl') ? ".owl" : '.graphol',
          fileName: file.name
        }

        uploadOntologyFile(json, this.props.current, (success) => {
          if (success) {
            message.success('upload successfully.');
            this.props.rerender()
          }
          else this.setState({ loading: false });
        })
      })
    }
  }

  else if (this.props.type === 'mapping') {
    const validFormat = file.type === 'text/xml';
    if (!validFormat) {
      message.error('You can only upload a mapping file! Found: ' + file.type);
      this.setState({ loading: false });
    }

    else {
      getBase64(file, (file64) => {
        let json = {
          content: file64,
          fileType: ".xml",
          fileName: file.name
        }

        uploadMappingFile(this.props.current.name, this.props.current.version, json, (success) => {
          if (success) {
            message.success('upload successfully.');
            this.props.rerender()
          }
          else this.setState({ loading: false });
        })
      })
    }
  }

  return false;
}

export default class UploadFile extends React.Component {
  state = {
    loading: false,
  };

  render() {
    const title = this.props.type === 'mapping' ? 'Add Mapping' : 'Add Ontology Version'
    return (
      <div style={{ height: 249, width: '100%' }}>
        <Upload className='bigUpload' beforeUpload={beforeUpload.bind(this)} fileList={[]}>
          <Button style={{ height: 249, width: '100%' }} type='primary' loading={this.state.loading}>
            <Icon type={this.state.loading ? "loading" : "plus"} /> {this.state.loading ? "Uploading" : title}
          </Button>
        </Upload>
      </div>

    );
  }
}
