import React from 'react';
import { List, Collapse } from 'antd';
import Entity from './Entity'

const Panel = Collapse.Panel;

class CollapsibleList extends React.Component {
    render() {
        if(this.props.list === null) return "";
        return (
            <div>
                <Collapse defaultActiveKey="1">
                    <Panel header={this.props.title} key="1">
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