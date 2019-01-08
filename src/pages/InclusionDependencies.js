import React from 'react';
import { List, Card, } from 'antd';
import MapItem from './MapItem';

class InclusionDependencies extends React.Component {
    render() {

        return (
            <div>
                <Card title="Inclusion Dependencies">
                    <List
                        grid={{ gutter: 4, column: 1 }}
                        dataSource={this.props.ids}
                        renderItem={item => (
                            <List.Item>
                                <Card>
                                    <MapItem mapKey={<b>Included</b>} mapValue={<b>Including</b>} key="h"/>
                                    <MapItem mapKey={<u>{item.includedView.sqlViewID}</u>} mapValue={<u>{item.includingView.sqlViewID}</u>} key="v"/>
                                    {item.inclusionMap.map((e, i) =>
                                        <MapItem mapKey={e.leftHandTerm} mapValue={e.rightHandTerm} key={i}/>
                                    )}
                                </Card>
                            </List.Item>
                        )}
                    />

                </Card>
            </div>
        );
    }
}

export default InclusionDependencies;