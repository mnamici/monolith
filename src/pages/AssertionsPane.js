import React from 'react';
import { Layout } from 'antd';
import SearchTree from './FastSearchTree'
import AssertionsPage from './AssertionsPage'

const {
    Header, Content,
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
             <Header style={{ backgroundColor: 'white', display:'flex', justifyContent: 'center', lineHeight:1.5}}>
                    <div style={{ display: 'inline-flex'}}>
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