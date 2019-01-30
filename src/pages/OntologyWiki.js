import React from 'react';
import { Layout } from 'antd';
import SearchTree from './SearchTree';
import SearchIndividuals from './SearchIndividuals';
import ClassPage from './ClassPage';
const { Content, Sider } = Layout;

class OntologyWiki extends React.Component {
    state = {
        collapsed: false,
    };

    toggle = () => {
        this.setState({
          collapsed: !this.state.collapsed,
        });
      }
    render() {
        const contents = [<ClassPage/>];
        return (
            <Layout style={{ margin: '0px -12px 0px 0px' }}>
                <Sider
                    // width={200} 
                    style={{ background: '#fff' }}
                    collapsed={this.state.collapsed}
                >
                    {/* <Icon
                        style={{display: "inherit", cursor: "pointer",  transition: "color .3s"}}
                        theme="filled"
                        type={this.state.collapsed ? 'caret-right' : 'caret-left'}
                        onClick={this.toggle}
                    /> */}
                        
                    <SearchIndividuals/>
                    <SearchTree ontology={this.props.ontology}/>
                    
                </Sider>
                <Layout>
                    <Content >
                        <div style={{ padding: '0px 0px 0px 0px', background: '#fff', minHeight: '100%' }}>
                            {contents[0]}
                        </div>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default OntologyWiki;