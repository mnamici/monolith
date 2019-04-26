import React from 'react';
import { Layout, Drawer, Button } from 'antd';
import SearchTree from './FastSearchTree'
import AssertionsPage from './AssertionsPage'

const {
    Content,
} = Layout;

export default class AssertionsPane extends React.Component {
    state = {
        current: null,
        visible: true
    }

    toggle = () => {
        this.setState({
            visible: !this.state.visible,
        });
    }

    onHandle = (entityID) => {
        this.setState({
            current: entityID,
            visible: false
        })
    }

    render() {
        return (
            <Layout >
                {/* <Header style={{ backgroundColor: 'transparent', display: 'flex', justifyContent: 'center', lineHeight: 1.5, height: 32 }}>
                    <div style={{ display: 'inline-flex' }}>
                        <SearchTree ontology={this.props.ontology} onHandle={this.onHandle} />
                    </div>

                </Header> */}
                <Drawer title='Ontology Entities' visible={this.state.visible} onClose={this.toggle} width={'50vw'}>
                    <SearchTree ontology={this.props.ontology} onHandle={this.onHandle} />
                </Drawer>
                {/* <Sider
                    // width={200} 
                    style={{ background: '#fff' }}
                >
                    <SearchTree ontology={this.props.ontology}/>

                </Sider> */}
                <Layout>
                    <Content >
                        <div style={{ height: 'calc(94vh - 72px)', overflowY: 'auto', paddingRight: 12 }}>
                            <Button type='primary' style={{ float: 'right', margin: 8 }} icon='menu-fold' onClick={this.toggle} />
                            {this.state.current !== null &&
                                <AssertionsPage
                                    ontology={this.props.ontology}
                                    mappingID={this.props.mappingID}
                                    current={this.state.current}
                                />}
                        </div>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

