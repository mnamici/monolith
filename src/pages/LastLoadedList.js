import React from 'react';
import { List, Card, Divider } from 'antd';
import { NavLink } from 'react-router-dom'

export default class LastLoadedList extends React.Component {
    render() {
        return (
            <div>
                <Divider>{this.props.title}</Divider>
                <List
                    grid={{ gutter: 16, lg: 4, md: 2, sm: 1, xs: 1 }}
                    dataSource={this.props.data}
                    renderItem={item => (
                        <List.Item>
                            <NavLink to={this.props.path} onClick={() => this.props.open(item.ontologyID, item.versionID)}>
                                <Card hoverable >
                                    <Card.Meta
                                        avatar={item.icon}
                                        title={this.props.ontology?item.ontologyID + '-' + item.versionID:item.title} 
                                        description={this.props.ontology?item.ontologyDescription: item.description} />
                                </Card>
                            </NavLink>
                        </List.Item>
                    )}
                />
            </div>
        );
    }
}
