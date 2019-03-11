import React from 'react';
import { Select, Popover, Button, } from 'antd';

const Option = Select.Option;

class MappingSelector extends React.Component {
    state = {
        enabledStart: true,
        loading: false,
        selected: this.props.mappings[0] !== undefined && this.props.mappings[0].mappingID
    }

    onSelection(value) {
        this.setState({ selected: value.mappingID })
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

    disableStart(e) {
        this.setState({ enabledStart: !e.target.checked })
    }

    start() {
        console.log('STARTin')
        this.setState({ loading: true })
    }

    render() {
        if (this.props.mappings[0] === undefined) return null
        const mappings = this.props.mappings.map(item => this.getOptions(item));
        return (
            <div styles={this.props.style}>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignContent: 'center', width: 'calc(200px - 1vw)' }}>
                    <Button
                        style={{ backgroundColor: '#151e30', border: 'unset', margin: 1 }}
                        type='primary'
                        disabled={!this.state.enabledStart}
                        shape='circle'
                        icon='play-circle'
                        loading={this.state.loading}
                        onClick={this.start.bind(this)}
                    />
                    <Select
                        style={{ paddingRight: 4 }}
                        defaultValue={
                            this.props.mappings[0].mappingID
                        }
                        onChange={this.onSelection.bind(this)}>
                        {mappings}
                    </Select>
                </div>
                {/* <Checkbox style={{}} onChange={this.disableStart.bind(this)}>autostart</Checkbox> */}
            </div>


        )
    }
}

export default MappingSelector;