import React from 'react';
import UploadFile from './UploadFile';
import { List, Card, Icon, Button, Modal, Radio, Input, } from 'antd';
import { dateFormat } from '../utils/utils';
const moment = require('moment')

export default class ImportKnowledgeGraph extends React.Component {
    state = {
        selected: new Set(),
        visible: false,
        modalRadioValue: 'data',
        modalNamedGraphValue: ''
    }

    selectCard(fileName) {
        let selected = Object.assign(this.state.selected)

        if (selected.has(fileName)) {
            selected.delete(fileName)
        }
        else {
            selected.add(fileName)
        }

        this.setState({ selected })
    }

    showModal = () => {
        this.setState({ visible: true })
    }

    singleImport(fileName) {
        let selected = new Set()
        selected.add(fileName)
        this.setState({ selected, visible: true })
    }
    onChangeModalRadio = (e) => {
        this.setState({ modalRadioValue: e.target.value })
    }

    onChangeModalInputNamedGraph = (e) => {
        this.setState({ modalNamedGraphValue: e.target.value })
    }

    resetStatus = () => {
        this.setState({ selected: new Set() })
    }

    render() {
        const data = [
            {
                fileName: 'pippo.rdf',
                imported: true,
                uploadDate: Date.now(),
                numberOfTriples: 1987,
                importingTime: 1,
            },
            {
                fileName: 'pluto.rdf',
                imported: false,
                uploadDate: Date.now() - 100000000,
                numberOfTriples: -1,
                importingTime: -1,
            },
            {
                fileName: 'paperino.rdf',
                imported: true,
                uploadDate: (Date.now() - 10000000000),
                numberOfTriples: 19872131,
                importingTime: 198,
            }
        ]

        return (
            <div>
                <Modal
                    title='Import Settings'
                    closable={false}
                    visible={this.state.visible}
                    onOk={() => console.log()}
                    onCancel={() => this.setState({ visible: false })}>
                    <div>
                        <p>{`Import rdf files into ${this.props.kg.kgIri}`}</p>
                        <ul>
                            {[...this.state.selected].map(item => <li key={item}>{item}</li>)}
                        </ul>
                        <Radio.Group onChange={this.onChangeModalRadio} value={this.state.modalRadioValue}>
                            <Radio value={'data'}>From data</Radio>
                            <Radio value={'default'}>The default graph</Radio>
                            <Radio value={'named'}>Named graph</Radio>
                        </Radio.Group>
                        <Input
                            disabled={this.state.modalRadioValue !== 'named'}
                            placeholder='http://example.com/graph'
                            value={this.state.modalNamedGraphValue}
                            onChange={this.onChangeModalInputNamedGraph}
                        />
                    </div>

                </Modal>
                <div style={{ textAlign: 'center', padding: 6 }}>
                    <h1>Import in Knowledge Graph</h1>
                </div>
                <div style={{ height: 44, padding: 6 }}>
                    {this.state.selected.size > 0 && <div style={{ display: 'flex' }}>
                        <Button style={{ marginRight: 6 }} onClick={this.showModal}>
                            Import
                        </Button>
                        <Button style={{ marginRight: 6 }} onClick={this.resetStatus}>
                            Reset Status
                        </Button>
                        <Button>
                            Delete
                        </Button>
                    </div>}
                </div>
                <List
                    style={{ height: 'calc(100vh - 99px)', overflow: 'auto' }}
                    className='bigCards'
                    rowKey="mappingsView"
                    grid={this.props.drawer ? { column: 1 } : { gutter: 12, lg: 3, md: 2, sm: 1, xs: 1 }}
                    dataSource={['', ...data]}
                    renderItem={item =>
                        item ? (
                            <List.Item key={item.fileName} style={{ paddingBottom: 6 }}>
                                <Card
                                    hoverable
                                    style={this.state.selected.has(item.fileName) ? { backgroundColor: 'var(--highlight-gray)' } : {}}
                                    actions={[
                                        <span
                                            onClick={() => this.singleImport(item.fileName)}>
                                            import
                                        </span>,
                                        <span>
                                            delete
                                        </span>
                                    ]}>
                                    <div
                                        onClick={() => this.selectCard(item.fileName)}>
                                        <div>
                                            <Card.Meta
                                                avatar={item.imported &&
                                                    <Icon
                                                        style={{ fontSize: '2em', color: 'var(--highlight)' }}
                                                        type="check-circle" />}
                                                key={item.fileName}
                                                title={item.fileName}
                                                description={item.imported &&
                                                    `Imported ${item.numberOfTriples} in ${item.importingTime} ms`}
                                            />
                                            <div className='ant-card-meta-description'>
                                                {moment(item.uploadDate).format(dateFormat)}
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </List.Item>
                        ) : (
                                <List.Item>
                                    <UploadFile type='kg' current={this.props.kg} />
                                </List.Item>
                            )
                    }
                />
            </div>
        )
    }
}