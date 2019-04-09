import React from 'react';
import { Layout } from 'antd';
import SearchTree from './FastSearchTree'
import AssertionsPage from './AssertionsPage'

const {
    Header, Content,
} = Layout;

export default class AssertionsPane extends React.Component {
    state = {
        current: null
    }

    onHandle = (entityID) => {
        this.setState({
            current: entityID,
        })
    }

    render() {
        return (
            <Layout >
                <Header style={{ backgroundColor: 'transparent', display: 'flex', justifyContent: 'center', lineHeight: 1.5, height: 32 }}>
                    <div style={{ display: 'inline-flex' }}>
                        <SearchTree ontology={this.props.ontology} onHandle={this.onHandle} />
                    </div>

                </Header>
                {/* <Sider
                    // width={200} 
                    style={{ background: '#fff' }}
                >
                    <SearchTree ontology={this.props.ontology}/>

                </Sider> */}
                <Layout>
                    <Content >
                        <div style={{ height: 'calc(94vh - 96px)', overflowY: 'auto', paddingRight: 12 }}>
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

