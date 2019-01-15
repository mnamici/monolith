import React from 'react';
import { List, Card, Divider, Button, Icon } from 'antd';
import Ellipsis from 'ant-design-pro/lib/Ellipsis'

class OntologiesList extends React.Component {
   
    render() {
        return (
            <div>
                <Divider>Choose or add an ontology</Divider>
                <List
                    rowKey="ontologiesView"
                    grid={{ gutter: 24, lg: 3, md: 2, sm: 1, xs: 1 }}
                    dataSource={[...this.props.data, '']}
                    renderItem={item =>
                        item ? (
                            <List.Item key={item.ontologyID}>
                                <Card hoverable actions={[
                                    <a href={"#delete?q="+item.ontologyID} onClick={
                                        () => console.log("Delete "+item.ontologyID)
                                    }>
                                        delete
                                    </a>
                                ]}>
                                    <Card.Meta key={item.ontologyID}
                                        avatar={<img alt="" src={item.avatar} />}
                                        title={item.ontologyID}
                                        description={
                                            <Ellipsis>
                                                {item.ontologyDescription}
                                            </Ellipsis>
                                        }
                                        onClick={
                                            () => {
                                                this.props.next(item.ontologyID);
                                            }
                                        }
                                    />
                                </Card>
                            </List.Item>
                        ) : (
                                <List.Item>
                                    <Button type="dashed" onClick={() => console.log("Add ontology")}>
                                        <Icon type="plus" />
                                        Add Ontology
                                    </Button>
                                </List.Item>
                            )
                    }
                />
            </div>
        );
    }
}

export default OntologiesList;