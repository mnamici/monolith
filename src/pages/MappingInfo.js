import React from 'react';
import { List, Card } from 'antd';

import DownloadFile from './DownloadFile'
import MapItem from './MapItem';
import { getMappingInfo } from '../api/MastroApi';


class MappingInfo extends React.Component {

    state = {
        data: {
            mapping: {},
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
        const data = this.state.data;
        const elements = [
            <Card title="Description"> {data.mapping.mappingDescription} </Card>,
            <Card title="Database">
                <MapItem mapKey="URL" mapValue={data.mappingDBConnections[0].jdbcURL} />
                <MapItem mapKey="User" mapValue={data.mappingDBConnections[0].dbUser} />
                <MapItem mapKey="Password" mapValue={data.mappingDBConnections[0].dbPassword} />
            </Card>,
            <Card title="Templates"> {data.mappingTemplates.map((item, index) => <p key={index}>{item}</p>)} </Card>,
        ]
        return (
            <div>
                <div style={{ textAlign: 'center', padding: 16 }}>
                    <h1 >{data.mapping.mappingID}</h1>
                </div>
                <List
                    grid={{ gutter: 12, column: 2 }}
                    dataSource={elements}
                    renderItem={item => (
                        <List.Item>
                            {item}
                        </List.Item>
                    )}
                />
                <div style={{ float: "right" }}>
                    <DownloadFile />
                </div>

            </div>
        );
    }
}

export default MappingInfo;