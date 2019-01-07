import React from 'react';
import { Upload, Icon, message, Button } from 'antd';
// import reqwest from 'reqwest'

const request = require('ajax-request');

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

      // reqwest({
      //   url: 'http://192.168.0.59:8080/mws-x/rest/file',
      //   method: 'put',
      //   contentType: 'application/json',
      //   data: JSON.stringify(json),
      //   headers: {
      //     'Authorization': 'Basic bWFzdHJvOmRhc2lsYWI='
      //   },
      //   success: () => {
      //     message.success('upload successfully.');
      //   },
      //   error: () => {
      //     message.error('upload failed.');
      //   },
      // });
      // TEST UPLOAD
      request({
        url: 'http://192.168.0.59:8080/mws-x/rest/file',
        method: 'PUT',
        data: json,
        headers: {
          'Authorization': 'Basic bWFzdHJvOmRhc2lsYWI='
        },
      }, function (err, res, body) {
        message.success('upload successfully.');

      });
    })
  }

  this.setState({ loading: false });
  return false;
}

class UploadFile extends React.Component {
  state = {
    loading: false,
  };

  render() {
    return (
      <div>
        <Upload beforeUpload={beforeUpload.bind(this)}>
          <Button>
            <Icon type="plus" /> Upload
              </Button>
        </Upload>
      </div>

    );
  }
}

export default UploadFile;