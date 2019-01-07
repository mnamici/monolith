import React from 'react';
import { Layout } from 'antd';
import SearchList from './SearchList';
import SQLViewsPage from './SQLViewsPage';

const {
    Sider, Content,
} = Layout;

class SQLViewsPane extends React.Component {
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
                    <SearchList />

                </Sider>
                <Layout>
                    <Content >
                        <div style={{ padding: '0px 12px 0px 12px', background: '#fff', minHeight: '100%' }}>
                            <SQLViewsPage />
                        </div>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}


export default SQLViewsPane;