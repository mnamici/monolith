import React from 'react';
import { List, Card, Icon, Divider } from 'antd';

class MainMenuDescriptions extends React.Component {
    render() {
        const data = [
            {
              icon: <Icon type="block" />,
              title: 'Ontology',
              description: 'Here you can load an ontology (OWL file)'
            },
            {
              icon: <Icon type="deployment-unit"/>,
              title: 'Knowledge Graph',
              description: 'Here you can load a knowledge graph '
            },
            {
              icon: <Icon type="table" />,
              title: 'Dataset',
              description: 'Here you can load a dataset'
            },
          ];

        return (
            <div>
                <Divider>Help</Divider>
                <List
                    grid={{ gutter: 16, column: 4 }}
                    dataSource={data}
                    renderItem={item => (
                        <List.Item>
                            <Card >
                                <Card.Meta avatar={item.icon} title={item.title} description={item.description}/>
                            </Card>
                        </List.Item>
                    )}
                />
            </div>
        );
    }
}

export default MainMenuDescriptions;