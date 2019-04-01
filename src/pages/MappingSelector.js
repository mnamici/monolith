import React from 'react';
import { Select, Popover, Button, Icon, message, } from 'antd';
import { startMastro, stopMastro, getMastroStatus } from '../api/MastroApi';

const Option = Select.Option;

export default class MappingSelector extends React.Component {
    state = {
        enabledStart: true,
        loading: false,
        interval: 0,
        runningMappingIDs: []
    }

    componentWillReceiveProps(props) {
        props.mappings.forEach(mapping => {
            getMastroStatus(props.ontology.name, props.ontology.version, mapping.mappingID, this.checkStatus.bind(this))
        });

    }

    componentWillUnmount() {
        this.stopPolling()
    }

    getOptions(item) {

        const running = this.state.runningMappingIDs.includes(item.mappingID)

        const style = running ? { color: '#52c41a' } : {}

        return <Option value={item.mappingID} key={item.mappingID}>
            <Popover content={
                <div>
                    <p>{item.mappingID}</p>
                    <small>{item.mappingDescription}</small>
                </div>
            } placement='right'>
                <div className='mapping' style={style}>
                    {running && <Icon type='thunderbolt' />}
                    {item.mappingID}
                </div>
            </Popover>
        </Option>
    }

    start() {
        startMastro(this.props.ontology.name, this.props.ontology.version, this.props.selected, this.startPolling.bind(this))
        this.setState({ loading: true })

    }

    stop() {
        this.stopPolling()
        stopMastro(this.props.ontology.name, this.props.ontology.version, this.props.selected, () => {
            this.componentWillReceiveProps(this.props)
        })
    }

    polling() {
        getMastroStatus(this.props.ontology.name, this.props.ontology.version, this.props.selected, this.checkStatus.bind(this))
    }

    startPolling() {
        this.setState({ interval: setInterval(this.polling.bind(this), 1000) })
    }

    stopPolling() {
        clearInterval(this.state.interval)
        this.setState({ loading: false, interval: 0 })
    }

    checkStatus(status, mappingID) {
        if (status.status === 'ERROR') {
            this.stopPolling()
        }

        if (status.status === 'RUNNING') {
            const newRunningMappingIDs = [...this.state.runningMappingIDs]
            if (!this.state.runningMappingIDs.includes[mappingID]) {
                newRunningMappingIDs.push(mappingID)
            }
            if (this.state.interval !== 0)
                message.success('MASTRO IS FUCKING RUNNING!')
            this.setState({ enabledStart: false, runningMappingIDs: newRunningMappingIDs })
            this.stopPolling()
        }
    }

    render() {
        if (this.props.mappings[0] === undefined) return null
        const mappings = this.props.mappings.map(item => this.getOptions(item));
        const disableStart = this.state.runningMappingIDs.includes(this.props.selected);
        return (
            <div>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignContent: 'center' }}>
                    <h3>Choose mapping:</h3>
                    <Select
                        style={{ paddingLeft: 8 }}
                        defaultValue={
                            this.props.mappings[0].mappingID
                        }
                        onChange={this.props.onSelection}
                        disabled={this.state.loading}>
                        {mappings}
                    </Select>
                    <Button.Group style={{ margin: '0px 10px' }}>
                        <Button
                            type="primary"
                            icon="play-circle"
                            loading={this.state.loading}
                            onClick={this.start.bind(this)}
                            disabled={disableStart}
                        >
                            Start Mastro
                        </Button>
                        <Button
                            type="danger"
                            icon="stop"
                            onClick={this.stop.bind(this)}
                            disabled={!disableStart}
                        >
                            Stop Mastro
                        </Button>
                    </Button.Group>
                </div>
            </div>


        )
    }
}
