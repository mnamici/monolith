import React from 'react';
import { Upload, Icon, message, Button } from 'antd';
import { uploadFile } from '../api/MastroApi';

function getBase64(file, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => {
    let index = reader.result.indexOf('base64,')
    let base64 = reader.result.substr(index + 'base64,'.length)
    callback(base64)
  });
  reader.readAsDataURL(file);
}

function beforeUpload(file) {
  this.setState({ loading: true });
  const validFormat = file.type === 'application/rdf+xml';
  if (!validFormat) {
    message.error('You can only upload OWL file!');
  }

  else {
    getBase64(file, (file64) => {
      let json = {
        content: file64,
        fileType: ".owl",
        fileName: file.name
      }

      uploadFile(json, this.props.current, () => {
        message.success('upload successfully.');
        this.props.rerender()
        this.setState({ loading: false });
      })
    })
  }

  
  return false;
}

class UploadFile extends React.Component {
  state = {
    loading: false,
  };

  render() {
    return (
      <div>
        <Upload beforeUpload={beforeUpload.bind(this)} fileList={[]}>
          <Button loading={this.state.loading}>
            <Icon type={this.state.loading?"loading":"plus"} /> {this.state.loading?"Uploading":"Upload"}
              </Button>
        </Upload>
      </div>

    );
  }
}

export default UploadFile;