

import React from 'react';
import { List, Collapse } from 'antd';
import KeyDependencies from './KeyDependencies';
import InclusionDependencies from './InclusionDependencies';
import Denials from './Denials';


const Panel = Collapse.Panel;

class Dependencies extends React.Component {
    render() {

        return (
            <div>
                <Collapse defaultActiveKey="0">
                    <Panel header="Dependencies" key="1">
                        <List
                            grid={{ gutter: 12, column: 1 }}
                            dataSource={[
                                <KeyDependencies keys={this.props.dependencies.keyDependencies} />,
                                <InclusionDependencies ids={this.props.dependencies.inclusionDependencies} />,
                                <Denials dens={this.props.dependencies.denials} />
                            ]}
                            renderItem={item => (
                                <List.Item>
                                    {item}
                                </List.Item>
                            )}
                        />
                    </Panel>
                </Collapse>
            </div>
        );
    }
}

export default Dependencies;