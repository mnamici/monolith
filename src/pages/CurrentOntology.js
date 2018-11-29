import React from 'react';
import { Layout, Icon } from 'antd';
import OntologyMenu from './OntologyMenu'
import OntologyInfo from './OntologyInfo';
const { Content, Sider } = Layout;

class CurrentOntology extends React.Component {
    state = {
        collapsed: false,
    };

    toggle = () => {
        this.setState({
          collapsed: !this.state.collapsed,
        });
      }
    render() {
        const contents = [<OntologyInfo/>];
        return (
            <Layout style={{ margin: '0px 0px 0px -24px' }}>
                <Sider
                    // width={200} 
                    style={{ background: '#fff' }}
                    collapsed={this.state.collapsed}
                >
                    <Icon
                        style={{display: "inherit", cursor: "pointer",  transition: "color .3s"}}
                        theme="filled"
                        type={this.state.collapsed ? 'caret-right' : 'caret-left'}
                        onClick={this.toggle}
                    />
                    <OntologyMenu />
                </Sider>
                <Layout>
                    <Content >
                        <div style={{ padding: 24, background: '#fff', minHeight: '80vh' }}>
                            {contents[0]}
                        </div>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default CurrentOntology;