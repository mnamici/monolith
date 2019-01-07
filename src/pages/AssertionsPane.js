import React from 'react';
import { Layout } from 'antd';
import SearchTree from './SearchTree'
import AssertionsPage from './AssertionsPage'

const {
    Sider, Content,
} = Layout;

class AssertionsPane extends React.Component {
    state = {
        current: 'info',
    }

    handleClick = (e) => {
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
    }

    render() {
        return (
            <Layout >
                <Sider
                    // width={200} 
                    style={{ background: '#fff' }}
                >
                    <SearchTree />

                </Sider>
                <Layout>
                    <Content >
                        <div style={{ padding: '0px 12px 0px 12px', background: '#fff', minHeight: '100%' }}>
                            <AssertionsPage />
                        </div>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}


export default AssertionsPane;