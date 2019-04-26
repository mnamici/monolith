import React from 'react';
import { Layout, Drawer, Button } from 'antd';
import SearchList from './FastSearchList';
import SQLViewsPage from './SQLViewsPage';

const {
    Content,
} = Layout;

export default class SQLViewsPane extends React.Component {
    state = {
        current: null,
        visible: true
    }

    toggle = () => {
        this.setState({
            visible: !this.state.visible,
        });
    }

    onHandle = (viewID) => {
        this.setState({
            current: viewID,
            visible: false
        })
    }

    render() {
        return (
            <Layout >
                <Drawer title='SQL Views' visible={this.state.visible} onClose={this.toggle} width={'50vw'}>
                    <SearchList ontology={this.props.ontology} mappingID={this.props.mappingID} onHandle={this.onHandle} />
                </Drawer>
                {/* <Header style={{ backgroundColor: 'transparent', display: 'flex', justifyContent: 'center', lineHeight: 1.5, height: 32 }}>
                    <div style={{ display: 'inline-flex' }}>
                        <SearchList ontology={this.props.ontology} mappingID={this.props.mappingID} onHandle={this.onHandle} />
                    </div>

                </Header> */}
                {/* <Sider
                    // width={200} 
                    style={{ background: '#fff' }}
                >
                    <SearchList />

                </Sider> */}
                <Layout>
                    <Content >
                        <div style={{ height: 'calc(94vh - 72px)', overflowY: 'auto', paddingRight: 12 }}>
                            <Button type='primary' style={{ float: 'right', margin: 8 }} icon='menu-fold' onClick={this.toggle} />
                            {this.state.current !== null &&
                                <SQLViewsPage ontology={this.props.ontology} mappingID={this.props.mappingID} viewID={this.state.current} />
                            }
                        </div>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}