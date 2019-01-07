import React from 'react';
import { Layout, Icon } from 'antd';
import OntologyMenu from './OntologyMenu'

const { Content, Sider } = Layout;

class CurrentOntology extends React.Component {
    state = {
        collapsed: true,
    };

    toggle = () => {
        this.setState({
          collapsed: !this.state.collapsed,
        });
      }
    render() {
        return (
            <Layout style={{ margin: '0px -24px -10px -24px', minHeight:'100%' }}>
                <Sider
                    // width={200} 
                    style={{ background: '#fff' }}
                    collapsed={this.state.collapsed}
                >   
                    <OntologyMenu />
                    <div>
                        <Icon
                            style={{display: "inherit", cursor: "pointer",  transition: "color .3s"}}
                            theme="filled"
                            type={this.state.collapsed ? 'caret-right' : 'caret-left'}
                            onClick={this.toggle}
                        />
                    </div>
                    
                </Sider>
                <Layout>
                    <Content >
                        <div style={{ padding: '0px 12px 0px 12px', background: '#fff', minHeight: '100%'}}>
                            {this.props.children}
                        </div>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default CurrentOntology;