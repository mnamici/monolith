import React from 'react'
import { getClasses } from '../api/KgApi';
import { Table } from 'antd';
import { NavLink } from 'react-router-dom'

export default class KnowledgeGraphClasses extends React.Component {
    state = {
        data: []
    }

    componentDidMount() {
        getClasses(this.props.kg.kgIri, this.loaded)
    }

    loaded = (data) => {
        this.converData(data)
    }

    converData(receivedData) {
        let data = []
        for (let i = 0; i < receivedData.length; i++) {
            data.push({
                key: i,
                value: <NavLink to={'/open/kg/instances/?classIri=' + receivedData[i]}>{receivedData[i]}</NavLink>
            })
        }
        this.setState({ data })
    }

    render() {
        return (
            <div style={{ padding: 8 }}>
                <h1 id="title">Knowledge Graph Classes</h1>
                <Table
                    columns={[{ dataIndex: 'value' }]}
                    showHeader={false}
                    pagination={false}
                    dataSource={this.state.data}
                />
            </div>
        )
    }
}