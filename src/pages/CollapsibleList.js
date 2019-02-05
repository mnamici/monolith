import React from 'react';
import { List, Collapse } from 'antd';
import Entity from './Entity'
import { predicateTypes } from './FastSearchTree'

const Panel = Collapse.Panel;

class CollapsibleList extends React.Component {
    state = {activeKey: []}

    componentWillReceiveProps(props) {
        var opened = props.title
        if(props.list === null || props.list.length === 0) opened = []
        this.setState({activeKey: opened})
    }

    onChange(activeKey) {
        this.setState({ activeKey });
    }

    render() {
        return (
            <div>
                <Collapse activeKey={this.state.activeKey} onChange={this.onChange.bind(this)}>
                    <Panel header={this.props.title} key={this.props.title}>
                        <List
                            grid={{ gutter: 0, column: 1 }}
                            dataSource={this.props.list}
                            renderItem={item => (
                                <List.Item>
                                    {Array.isArray(item)?
                                        item.map((e,i) => 
                                            <div style={{display:'inline'}} key={i}>
                                                <Entity predicateType={this.props.predicateType} entity={e}/>
                                                {item.length !== i+1 && ", "/*not last one*/} 
                                            </div>)
                                        :
                                        item.entityID === undefined ?
                                            item.property !== undefined ? 
                                            <Entity predicateType={predicateTypes.op} entity={item.property}/>
                                            :
                                            <p style={{wordWrap:'break-word'}}>{item}</p>
                                            :
                                            <Entity predicateType={this.props.predicateType} entity={item} />}

                                </List.Item>
                            )}
                        />
                    </Panel>
                </Collapse>

            </div>
        );
    }
}

export default CollapsibleList;