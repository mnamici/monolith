import React from 'react';
import { Switch, Button, Progress, List, Popover, Modal, message } from 'antd';
import YASQE from 'yasgui-yasqe'
import '../css/yasqe.min.css'
import { Input } from 'antd';
// import Results from './ResultsInfiniteList';
// import Results from './ResultsGriddle';
import Results from './ResultsTable'
import QueryExecutionReport from './QueryExecutionReport';
import MappingSelector from './MappingSelector'
import {
    startMastro as startMastroAPI,
    stopMastro as stopMastroAPI,
    getMastroStatus,
    startQuery,
    getQueryStatus,
    startNewQuery,
    postInQueryCatalog,
    putInQueryCatalog
} from '../api/MastroApi';

const { TextArea } = Input;

const POLLING_TIME = 1000

export default class MastroSPARQLTabPane extends React.Component {
    state = {
        modalVisible: false,
        modalConfirmLoading: false,
        reasoning: true,
        enableRun: false,
        // QUERY STATUS
        loading: false,
        selectedMappingID: null,
        status: {},
        interval: 0,
        //      MASTRO STATUS
        enabledStartMastro: true,
        loadingMastro: false,
        intervalMastro: 0,
        runningMappingIDs: []
    }

    componentWillUnmount() {
        this.stopPolling()
        this.stopPollingMastro()
    }

    componentDidMount() {
        const currMappingID = this.props.mappings[0] !== undefined && this.props.mappings[0].mappingID
        this.setState({
            oldQueryID: this.props.query.queryID,
            newQueryID: this.props.query.queryID,
            new: this.props.new,
            selectedMappingID: currMappingID
        })
        this.props.mappings.forEach(mapping => {
            getMastroStatus(this.props.ontology.name, this.props.ontology.version, mapping.mappingID, this.checkMastroStatus.bind(this))
        });
        this.changeDescription({ target: { value: this.props.query.queryDescription } })
        this.yasqe = YASQE(document.getElementById('sparql_' + this.props.num),
            {
                // Disable share link
                createShareLink: null,
                sparql: {
                    // Disable query execution button
                    showQueryButton: false
                }
            });
        this.props.query.queryCode !== undefined && this.yasqe.setValue(this.props.query.queryCode)
        this.yasqe.refresh();
    }

    componentDidUpdate() {
        this.yasqe.refresh();
    }

    startMastro = () => {
        startMastroAPI(this.props.ontology.name, this.props.ontology.version, this.state.selectedMappingID, this.startPollingMastro.bind(this))
        this.setState({ loadingMastro: true })

    }

    stopMastro = () => {
        this.stopPollingMastro()
        stopMastroAPI(this.props.ontology.name, this.props.ontology.version, this.state.selectedMappingID, (mapId) => {
            this.setState({runningMappingIDs: this.state.runningMappingIDs.filter(mid => mapId !== mid)})
        })
    }

    pollingMastro() {
        getMastroStatus(this.props.ontology.name, this.props.ontology.version, this.state.selectedMappingID, this.checkMastroStatus.bind(this))
    }

    startPollingMastro() {
        this.setState({ intervalMastro: setInterval(this.pollingMastro.bind(this), 1000) })
    }

    stopPollingMastro() {
        clearInterval(this.state.intervalMastro)
        this.setState({ loadingMastro: false, intervalMastro: 0 })
    }

    checkMastroStatus(status, mappingID) {
        if (status.status === 'ERROR') {
            this.stopPollingMastro()
        }

        if (status.status === 'RUNNING') {
            const newRunningMappingIDs = [...this.state.runningMappingIDs]
            if (!this.state.runningMappingIDs.includes[mappingID]) {
                newRunningMappingIDs.push(mappingID)
            }
            if (this.state.intervalMastro !== 0) {
                message.success('MASTRO IS FUCKING RUNNING!')
            }
            this.setState({ enabledStartMastro: false, runningMappingIDs: newRunningMappingIDs, enableRun: true })
            this.stopPollingMastro()
        }
    }

    showModal = () => {
        this.setState({
            modalVisible: true,
        });
    }

    showOverwriteModal = () => {
        this.setState({
            overwirteModalVisible: true,
        });
    }

    handleOk = () => {
        this.setState({
            modalConfirmLoading: true,
        });
        this.save()
    }

    handleOkOverwrite = () => {
        const query = {
            queryID: this.state.newQueryID,
            queryDescription: this.state.queryDescription || '',
            queryCode: this.yasqe.getValue()
        }
        putInQueryCatalog(this.props.ontology.name, this.props.ontology.version, query, () => {
            this.props.renameTab(this.state.oldQueryID, this.state.newQueryID)
            this.setState({
                modalVisible: false,
                overwirteModalVisible: false,
                modalConfirmLoading: false,
                oldQueryID: this.state.newQueryID
            })
        })
    }

    handleCancel = () => {
        this.setState({
            modalVisible: false,
            modalConfirmLoading: false
        });
    }

    handleCancelOverwrite = () => {
        this.setState({
            overwirteModalVisible: false,
            modalConfirmLoading: false
        });
    }

    onSelectMapping(value, enableRun) {
        this.setState({ selectedMappingID: value, enableRun: enableRun })
    }

    start() {
        if (!this.state.new)
            startQuery(
                this.props.ontology.name,
                this.props.ontology.version,
                this.state.selectedMappingID,
                this.state.oldQueryID,
                this.state.reasoning,
                this.startPolling.bind(this))
        else {
            const query = {
                queryID: this.state.oldQueryID,
                queryDescription: this.state.queryDescription || '',
                queryCode: this.yasqe.getValue()
            }
            startNewQuery(
                this.props.ontology.name,
                this.props.ontology.version,
                this.state.selectedMappingID,
                query,
                this.state.reasoning,
                this.startPolling.bind(this))
        }

    }

    stop() {
        this.stopPolling()
    }

    polling() {
        getQueryStatus(this.props.ontology.name, this.props.ontology.version, this.state.selectedMappingID, this.state.executionID, this.checkStatus.bind(this))
    }

    startPolling(executionID) {
        this.setState({ executionID: executionID, interval: setInterval(this.polling.bind(this), POLLING_TIME), showResults: true, loading: true })
    }

    stopPolling() {
        clearInterval(this.state.interval)
        this.setState({ loading: false })
    }

    checkStatus(status) {
        this.setState({ status: status })
        if (status.status === 'FINISHED') {
            this.stopPolling()
        }
    }

    manageError() {
        this.stopPolling()
    }

    save() {
        const query = {
            queryID: this.state.newQueryID,
            queryDescription: this.state.queryDescription || '',
            queryCode: this.yasqe.getValue()
        }

        const alreadyInCatalog = this.props.catalog.filter(query => query.queryID === this.state.newQueryID).length === 1

        if (alreadyInCatalog) {
            this.showOverwriteModal()
        }

        else if (this.props.new) {
            postInQueryCatalog(this.props.ontology.name, this.props.ontology.version, query, () => {
                this.props.renameTab(this.state.oldQueryID, this.state.newQueryID, true)
                this.setState({
                    modalVisible: false,
                    modalConfirmLoading: false,
                    oldQueryID: this.state.newQueryID
                })

            })
        }
        else {
            putInQueryCatalog(this.props.ontology.name, this.props.ontology.version, query, () => {
                this.props.renameTab(this.state.oldQueryID, this.state.newQueryID)
                this.setState({
                    modalVisible: false,
                    modalConfirmLoading: false,
                    oldQueryID: this.state.newQueryID
                })
            })
        }
    }

    changeQueryID = (e) => {
        this.setState({ newQueryID: e.target.value })
    }

    changeDescription = (e) => {
        this.setState({ queryDescription: e.target.value })
    }

    toggleReasoning = () => {
        this.setState({ reasoning: !this.state.reasoning })
    }

    render() {
        const elements = [
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <MappingSelector
                    mappings={this.props.mappings}
                    onSelection={this.onSelectMapping.bind(this)}
                    selected={this.state.selectedMappingID}
                    loadingMastro={this.state.loadingMastro}
                    runningMappingIDs={this.state.runningMappingIDs}
                    startMastro={this.startMastro}
                    stopMastro={this.stopMastro}

                />
            </div>,
            <Progress percent={this.state.status.percentage} />,
            <div id={"sparql_" + this.props.num} />,
            <TextArea
                style={{ margin: '12px 0px 12px 0px' }}
                placeholder="Description"
                autosize
                value={this.state.queryDescription}
                onChange={this.changeDescription}
            />,
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                    <Button.Group>
                        <Button
                            type="primary"
                            icon="play-circle"
                            loading={this.state.loading}
                            onClick={this.start.bind(this)}
                            disabled={!this.state.enableRun}
                        >
                            Run</Button>
                        <Button
                            type="danger"
                            icon="stop"
                            onClick={this.stop.bind(this)}
                            disabled={!this.state.loading}
                        >Stop</Button>
                    </Button.Group>
                    <span style={{ padding: '0px 10px', color: 'rgb(255, 255, 255, 0.75)' }}>Reasoning</span>
                    <Popover content='Toggle Reasoning'>
                        <Switch checked={this.state.reasoning} onClick={this.toggleReasoning} disabled={!this.state.enableRun} />
                    </Popover>
                </div>
                <Button
                    type='primary'
                    icon="save"
                    onClick={this.showModal}
                >
                    Store in catalog
                </Button>
            </div>
        ]

        if (this.state.showResults) {
            elements.push(
                <Results
                    ontology={this.props.ontology}
                    mappingID={this.state.selectedMappingID}
                    executionID={this.state.executionID}
                    numberOfResults={this.state.status.numResults}
                    running={this.state.loading}
                />,
                <QueryExecutionReport
                    ontology={this.props.ontology}
                    mappingID={this.state.selectedMappingID}
                    executionID={this.state.executionID}
                    running={this.state.loading}
                    status={this.state.status} />)
        }

        return (
            <div style={{ padding: '0px 12px 8px 8px', height: 'calc(100vh - 81px)', overflow: 'auto' }}>
                <List
                    grid={{ gutter: 8, column: 1 }}
                    dataSource={elements}
                    renderItem={item => (
                        <List.Item>
                            {item}
                        </List.Item>
                    )}
                />
                <Modal title="Insert query ID"
                    visible={this.state.modalVisible}
                    onOk={this.handleOk}
                    confirmLoading={this.state.modalConfirmLoading}
                    onCancel={this.handleCancel}
                >
                    <Input placeholder='Specify query ID' value={this.state.newQueryID} onChange={this.changeQueryID} />
                </Modal>
                <Modal
                    visible={this.state.overwirteModalVisible}
                    onOk={this.handleOkOverwrite}
                    onCancel={this.handleCancelOverwrite}
                >
                    Overwrite query?
                </Modal>
            </div>
        );
    }
}

