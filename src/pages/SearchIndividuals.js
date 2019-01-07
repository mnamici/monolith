import React from 'react';
import {Input } from 'antd';

const Search = Input.Search;

class SearchIndividuals extends React.Component {
  
  onSearch = (e) => {
    console.log(`Searched ${e}`)
  }

  render() {
    
    return (
      <div>
        <Search style={{ margin: '16px 8px 16px 0px' }} placeholder="Search for Individuals" onSearch={this.onSearch}/>
      </div>
    );
  }
}

export default SearchIndividuals;