import React from 'react';
import { Collapse } from 'antd';
import Assertion from './Assertion';

const Panel = Collapse.Panel;

class AssertionsList extends React.Component {
    render() {

        return (
            <div>
                <Collapse defaultActiveKey="0">
                    {this.props.list.map((item, index) => 
                        <Panel header={item.mappingDescription} key={index}>
                            <Assertion assertion={item}/>
                        </Panel>
                    )}
                    
                </Collapse>

            </div>
        );
    }
}

export default AssertionsList;