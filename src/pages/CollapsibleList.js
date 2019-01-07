import React from 'react';
import { List, Collapse } from 'antd';
import Entity from './Entity'

const Panel = Collapse.Panel;

class CollapsibleList extends React.Component {
    render() {

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
                                            <div style={{display:'inline'}}>
                                                <Entity entity={e}/>
                                                {item.length !== i+1 && ", "/*not last one*/} 
                                            </div>)
                                        :
                                        item.entityID === undefined ?
                                            <p style={{wordWrap:'break-word'}}>{item}</p>
                                            :
                                            <Entity entity={item} />}

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