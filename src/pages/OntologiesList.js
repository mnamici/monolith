import React from 'react';
import { List, Card, Divider } from 'antd';
import Ellipsis from 'ant-design-pro/lib/Ellipsis'
import AddOntology from './AddOntology';
import { deleteOntology } from '../api/MastroApi';

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
                                    <span onClick={
                                        () => {
                                            deleteOntology(item.ontologyID)
                                            this.props.rerender()
                                        }
                                    }>
                                        delete
                                    </span>
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
                                    <AddOntology rerender={this.props.rerender}/>
                                </List.Item>
                            )
                    }
                />
            </div>
        );
    }
}

export default OntologiesList;