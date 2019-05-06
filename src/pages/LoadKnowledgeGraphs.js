import React from 'react'
import { NavLink } from 'react-router-dom'
import { List, Card, Divider as h1, Popover, Spin } from 'antd';
import UploadFile from './UploadFile';
import { getKnowledgeGraphs, downloadKnowledgeGraph, deleteKnowledgeGraph } from '../api/MastroApi';
import { saveFileInfo, dateFormat } from '../utils/utils';
import moment from 'moment'

export default class LoadKnowledgeGraphs extends React.Component {
    _isMounted = false;
    state = {
        data: [],
        loading: true
    }

    componentDidMount() {
        this._isMounted = true;
        this.requestKnowledgeGraphs()
    }

    componentWillUnmount() {
        this._isMounted = false
    }

    requestKnowledgeGraphs() {
        this._isMounted && this.setState({ loading: true })
        getKnowledgeGraphs(
            this.loaded)
    }

    loaded = (data) => {
        if (data === undefined)
            data = []
        this._isMounted && this.setState({
            data: data,
            loading: false
        });
    }

    render() {
        return (
            this.state.loading ? <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 36 }}> <Spin size='large' /></div> :

                <div>
                    <div style={{ textAlign: 'center', padding: 6 }}>
                        <h1>Knowledge Graphs</h1>
                    </div>
                    <List
                        style={{ height: 'calc(100vh - 99px)', overflow: 'auto' }}
                        className='bigCards'
                        rowKey="mappingsView"
                        grid={{ gutter: 12, lg: 3, md: 2, sm: 1, xs: 1 }}
                        dataSource={['', ...this.state.data]}
                        renderItem={item =>
                            item ? (
                                <List.Item key={item.mappingID}>
                                    <Card hoverable actions={[
                                        <NavLink to={"/open/kg/info/" + item.mappingID}>
                                            <Popover content={
                                                <div>
                                                    <p>{item.kgTriples + " triples"}</p>
                                                </div>
                                            } placement="bottom">
                                                <span>
                                                    metrics
                                        </span>
                                            </Popover>
                                        </NavLink>,
                                        <span onClick={
                                            () => downloadKnowledgeGraph(
                                                this.props.ontology.name,
                                                this.props.ontology.version,
                                                item.mappingID,
                                                saveFileInfo)
                                        }>
                                            download
                                    </span>,
                                        <span onClick={
                                            () => deleteKnowledgeGraph(
                                                this.props.ontology.name,
                                                this.props.ontology.version,
                                                item.mappingID,
                                                this.requestKnowledgeGraphs.bind(this))
                                        }>
                                            delete
                                    </span>
                                    ]}>
                                        <NavLink to={"/open/kg/info"} onClick={() => this.props.open(item.kgIri)}>
                                            <Card.Meta key={item.kgIri}
                                                title={item.kgTitle[0].content + ' ' + item.kgIri}
                                                description={item.mappingDescription}
                                            />
                                            <div className='ant-card-meta-description'>{moment(item.kgLastModifiedTs).format(dateFormat)}</div>
                                        </NavLink>
                                    </Card>
                                </List.Item>
                            ) : (
                                    <List.Item>
                                        <UploadFile type='mapping' current={this.props.ontology} rerender={this.requestKnowledgeGraphs.bind(this)} />
                                        {/* <Button type="dashed" onClick={() => console.log("Add version of ontology")}>
                                        <Icon type="plus" />
                                        Add Ontology Version
                                    </Button> */}
                                    </List.Item>
                                )
                        }
                    />
                </div>
        );
    }
}