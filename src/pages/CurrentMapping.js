import React from 'react';
import { Layout, Menu } from 'antd';

const {
    Header, Content,
} = Layout;

class CurrentMapping extends React.Component {
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
            <Layout>
                <Header style={{ background: '#fff' }}>
                    <Menu
                        onClick={this.handleClick}
                        selectedKeys={[this.state.current]}
                        mode="horizontal"
                    >
                        <Menu.Item key="info">
                            Mapping Info
                        </Menu.Item>
                        <Menu.Item key="assertions">
                            Assertions
                        </Menu.Item>
                        <Menu.Item key="views">
                            SQL Views
                        </Menu.Item>
                        <Menu.Item key="dependencies">
                            Dependencies
                        </Menu.Item>
                    </Menu>
                </Header>
                <Content style={{ background: '#fff' }}>
                    {this.props.children}
                </Content>
            </Layout>

        );
    }
}

export default CurrentMapping;