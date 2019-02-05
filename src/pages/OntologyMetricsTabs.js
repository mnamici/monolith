import React from 'react';
import { Card, List } from 'antd';
import MapItem from './MapItem';

class OntologyMetricsTabs extends React.Component {
    state = {
        tabKey: this.props.titles[0].key,
    }

    onTabChange = (key, type) => {
        // console.log(key, type);
        this.setState({ [type]: key });
    }

    render() {

        const tabList = this.props.titles;
        const data = this.props.data;

        const contentList = {};
        if (Array.isArray(data)) {
            if(data.length === 0 ) return null
            for (let i = 0; i < tabList.length; i++) {
                contentList[tabList[i].key] = <List
                    grid={{ gutter: 0, column: 1 }}
                    dataSource={data}
                    renderItem={item => (
                        <List.Item>
                            {
                                item.mapKey !== undefined ? // single tab pairs
                                    <MapItem mapKey={item.mapKey} mapValue={item.mapValue} /> :
                                    <p>{item.content}</p> //single value (descriptions)
                            }
                        </List.Item>
                    )}
                />
            }
        }
        else {
            for (let key in data) {
                contentList[key] = <List
                    grid={{ gutter: 0, column: 1 }}
                    dataSource={data[key]}
                    renderItem={item => (
                        <List.Item >
                            {
                                item.mapKey !== undefined ? // single tab pairs
                                    <MapItem mapKey={item.mapKey} mapValue={item.mapValue} /> :
                                    <p>{item}</p> //single value
                            }
                        </List.Item>
                    )}
                />
            }
        }

        return (
            <div>
                <Card
                    style={{ width: '100%' }}
                    tabList={tabList}
                    activeTabKey={this.state.tabKey}
                    onTabChange={(key) => { this.onTabChange(key, 'tabKey'); }}
                >
                    {contentList[this.state.tabKey]}
                </Card>
            </div>
        );
    }
}

export default OntologyMetricsTabs;