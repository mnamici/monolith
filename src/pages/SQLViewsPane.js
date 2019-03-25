import React from 'react';
import { Layout } from 'antd';
import SearchList from './FastSearchList';
import SQLViewsPage from './SQLViewsPage';

const {
    Header, Content,
} = Layout;

export default class SQLViewsPane extends React.Component {
    state = {
        current: null
    }

    onHandle = (viewID) => {
        this.setState({
            current: viewID,
        })
    }

    render() {
        return (
            <Layout >
                <Header style={{ backgroundColor: 'transparent', display: 'flex', justifyContent: 'center', lineHeight: 1.5, height: 32 }}>
                    <div style={{ display: 'inline-flex' }}>
                        <SearchList ontology={this.props.ontology} mappingID={this.props.mappingID} onHandle={this.onHandle} />
                    </div>

                </Header>
                {/* <Sider
                    // width={200} 
                    style={{ background: '#fff' }}
                >
                    <SearchList />

                </Sider> */}
                <Layout>
                    <Content >
                        <div style={{ height: 'calc(94vh - 96px)', overflowY: 'scroll', paddingRight: 12 }}>
                            {this.state.current !== null &&
                                <SQLViewsPage ontology={this.props.ontology} mappingID={this.props.mappingID} viewID={this.state.current}/>
                            }
                        </div>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}