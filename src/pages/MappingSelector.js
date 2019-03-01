import React from 'react';
import { Select, Popover } from 'antd';

const Option = Select.Option;

class MappingSelector extends React.Component {

    handleChange(value) {
        console.log(`selected ${value}`);
    }

    getOptions(item) {
        return <Option value={item.mappingID} key={item.mappingID}>
            <Popover content={
                <div>
                    <p>{item.mappingID}</p>
                    <small>{item.mappingDescription}</small>
                </div>
            } placement='right'>
                <div className='mapping'>
                    {item.mappingID}
                </div>
            </Popover>
        </Option>
    }

    render() {
        if (this.props.mappings[0] === undefined) return null
        const mappings = this.props.mappings.map(item => this.getOptions(item));
        return (
            <Select
                style={{ width: 'calc(200px - 1vw)', paddingBottom: 4 }}
                defaultValue={
                    this.props.mappings[0].mappingID
                }
                onChange={this.handleChange}>
                {mappings}
            </Select>
        )
    }
}

export default MappingSelector;