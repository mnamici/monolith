import React from 'react';
import { Button } from 'antd';
// import reqwest from 'reqwest'

const request = require('ajax-request');

class UploadFile extends React.Component {
  state = {
    loading: false,
  };

  download = () => {
    // TEST DOWNLOAD
    request({
      url: 'http://192.168.0.59:8080/mws-x/rest/file?name=tbox.owl',
      method: 'GET',
      headers: {
        'Authorization': 'Basic bWFzdHJvOmRhc2lsYWI='
      },
      json: true
    }, function (err, res, body) {
      const text = atob(body.content)
      var element = document.createElement('a');
      element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
      element.setAttribute('download', body.fileName);

      element.style.display = 'none';
      document.body.appendChild(element);

      element.click();

      document.body.removeChild(element);

    });
  }

  render() {
    return (
      <div>
        <Button icon='download' onClick={this.download}>
          Download
        </Button>
      </div>

    );
  }
}

export default UploadFile;