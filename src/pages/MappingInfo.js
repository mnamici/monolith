import React from 'react';
import { List, Card } from 'antd';

import DownloadFile from './DownloadFile'
import { getMappingInfo } from '../api/MastroApi';
import ListMapItem from './ListMapItem';
import ListItem from './ListItem';


class MappingInfo extends React.Component {

    state = {
        data: {
            mapping: { mappingDescription: "" },
            mappingDBConnections: [{}],
            mappingTemplates: []
        }
    }

    componentDidMount() {
        this.requestMappings()
    }

    requestMappings() {
        getMappingInfo(
            this.props.ontology.name,
            this.props.ontology.version,
            this.props.mappingID,
            this.loaded)
    }

    loaded = (data) => {
        if (data === undefined)
            data = []
        this.setState((state) => ({
            data: data
        }));
    }

    render() {
        const data = this.state.data
        const db = [
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
                mapValue: data.mappingDBConnections[0].dbPassword
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
                    <h1 >{data.mapping.mappingID}</h1>
                </div>
                <Card title="Description" className='description'>
                    <ListItem data={[data.mapping.mappingDescription]} />
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

export default MappingInfo;