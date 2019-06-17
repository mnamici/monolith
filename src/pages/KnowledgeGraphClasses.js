import React from 'react'
import { getClasses } from '../api/KgApi';
import { List, Card } from 'antd';
import KnowledgeGraphInstances from './KnowledgeGraphInstances';

export default class KnowledgeGraphClasses extends React.Component {
    state = {
        data: [],
        expanded: {}
    }

    componentDidMount() {
        getClasses(this.props.kg.kgIri, this.loaded)
    }

    loaded = (data) => {
        this.setState({ data })
    }

    expandClass(className) {
        let expanded = { ...this.state.expanded }
        expanded[className] = !expanded[className]

        this.setState({ expanded })
    }

    render() {
        const receivedData = this.state.data
        let data = []
        for (let i = 0; i < receivedData.length; i++) {
            data.push(<div>
                <span className='link' onClick={() => this.expandClass(receivedData[i])} style={{ background: 'transparent' }}>
                    {receivedData[i]}
                </span>
                {this.state.expanded[receivedData[i]] && <KnowledgeGraphInstances kg={this.props.kg} kgClass={receivedData[i]} />}
            </div>
            )
        }
        return (
            <List
                className='kgInstancesCard'
                style={{margin: '0px 6px'}}
                grid={{ column: 1, gutter: 6 }}
                dataSource={data}
                renderItem={(item, index) =>
                    <List.Item key={index}>
                        <Card title={item} style={{ background: 'transparent' }} />
                    </List.Item>

                } />
        )
    }
}