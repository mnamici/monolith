import React from 'react';
import { Select } from 'antd';

const Option = Select.Option;

class MappingSelector extends React.Component {
    handleChange(value) {
        console.log(`selected ${value}`);
    }

    getOptions(item) {
        return <Option value={item} key={item}> {item} </Option>
    }

    render() {
        const mappings = this.props.mappings.map(item => this.getOptions(item.mappingID));
        return (
            <Select size="large" defaultValue={this.props.mappings[0].mappingID} onChange={this.handleChange}>
                {mappings}
            </Select>
        )
    }
}

export default MappingSelector;