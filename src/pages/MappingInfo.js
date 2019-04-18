import React from 'react';
import { List, Card, Icon, Spin } from 'antd';

import DownloadFile from './DownloadFile'
import { getMappingInfo } from '../api/MastroApi';
import ListMapItem from './ListMapItem';
import ListItem from './ListItem';


export default class MappingInfo extends React.Component {
    _isMounted = false;
    state = {
        data: {
            mappingDBConnections: [{}]
        },
        showPassword: false,
        loading: false

    }

    componentDidMount() {
        this._isMounted = true
        this.requestMappingInfo()
    }

    componentWillUnmount() {
        this._isMounted = false
    }

    requestMappingInfo() {
        this.setState({ loading: true })
        getMappingInfo(
            this.props.ontology.name,
            this.props.ontology.version,
            this.props.mappingID,
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
        if (this.state.loading) return <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 36 }}> <Spin size='large' /></div>

        const data = this.state.data
        const db = [
            {
                mapKey: "name",
                mapValue: data.mappingDBConnections[0].name
            },
            {
                mapKey: "URL",
                mapValue: data.mappingDBConnections[0].jdbcURL
            },
            {
                mapKey: "User",
                mapValue: data.mappingDBConnections[0].dbUser
            },
            {
                mapKey: "Password",
                mapValue: <div>
                    <span>{this.state.showPassword ? data.mappingDBConnections[0].dbPassword : '......'}</span>
                    <Icon
                        type={this.state.showPassword ? 'eye-invisible' : 'eye'}
                        style={{ float: 'right' }}
                        onClick={() => this.setState((state) => state.showPassword = !state.showPassword)} />
                </div>
            },
        ]
        const elements = [
            <Card className='mappingCard' title="Database">
                <ListMapItem data={db} />
            </Card>,
            <Card className='mappingCard' title="Templates">
                <ListItem data={data.mappingTemplates} />
            </Card>,
        ]
        return (
            <div style={{ paddingRight: '1vw' }}>
                <div style={{ textAlign: 'center', padding: 16 }}>
                    <h1 >{this.props.mappingID}</h1>
                </div>
                <Card title="Description" className='description'>
                    {/* <ListItem data={data.mapping?[data.mapping.mappingDescription]:[]} /> */}
                    <p style={{ color: 'rgba(255, 255, 255, 0.85)' }}>{data.mapping && data.mapping.mappingDescription}</p>
                </Card>,
                <List
                    grid={{ gutter: 12, column: 2 }}
                    dataSource={elements}
                    renderItem={item => (
                        <List.Item>
                            {item}
                        </List.Item>
                    )}
                />
                <div style={{ display: 'flex', paddingTop: 12 }}>
                    <DownloadFile ontology={this.props.ontology} mapping={this.props.mappingID} />
                </div>

            </div>
        );
    }
}
