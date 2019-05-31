import React from 'react'
import { getInstances } from '../api/KgApi';
import { Table } from 'antd';
import { getUrlVars } from '../utils/utils';
import { NavLink } from 'react-router-dom'

export default class KnowledgeGraphInstances extends React.Component {
    state = {
        data: []
    }

    componentDidMount() {
        getInstances(this.props.kg.kgIri, getUrlVars()['classIri'], this.loaded)
    }

    loaded = (data) => {
        this.converData(data)
    }

    converData(receivedData) {
        let data = []
        for (let i = 0; i < receivedData.length; i++) {
            data.push({
                key: i,
                value: <NavLink to={'/open/kg/navigation/?iri=' + receivedData[i]}>{receivedData[i]}</NavLink>
            })
        }
        this.setState({ data })
    }

    render() {
        return (
            <div style={{ padding: 8 }}>
                <h1 id="title">Instances</h1>
                <Table
                    columns={[{ dataIndex: 'value' }]}
                    showHeader={false}
                    dataSource={this.state.data}
                />
            </div>
        )
    }
}