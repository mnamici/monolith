import React from 'react';
import { Upload, Icon, message, Button } from 'antd';
import { uploadOntologyFile, uploadMappingFile } from '../api/MastroApi';
import { getBase64 } from '../utils/utils'

function beforeUpload(file) {
  this.setState({ loading: true });
  console.log(file)
  if (this.props.type === 'owl') {
    const validFormat = file.name.endsWith('.owl') || file.name.endsWith('.graphol')
    if (!validFormat) {
      message.error('You can only upload OWL or GRAPHOL file! Found '+file.type);
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
          this.setState({ loading: false });
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
          this.setState({ loading: false });
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
    return (
      <div>
        <Upload beforeUpload={beforeUpload.bind(this)} fileList={[]}>
          <Button loading={this.state.loading}>
            <Icon type={this.state.loading ? "loading" : "plus"} /> {this.state.loading ? "Uploading" : "Upload"}
          </Button>
        </Upload>
      </div>

    );
  }
}
