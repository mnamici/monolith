import React from 'react';
import { Layout } from 'antd';
import SearchTree from './FastSearchTree';
import SearchIndividuals from './SearchIndividuals';
import ClassPage from './ClassPage';
import ObjectPropertyPage from './ObjectPropertyPage';
import DataPropertyPage from './DataPropertyPage';

import { Route, Redirect } from 'react-router'

import { predicateTypes } from '../utils/utils'

const { Header, Content } = Layout;

class OntologyWiki extends React.Component {
    state = {
        collapsed: false,
    };

    componentDidMount() {
        // console.log("WM " + this.props.match.params.entityID, this.props.match.params.predicateType)
        this.setState({
            current: this.props.match.params.entityID,
            predicateType: this.props.match.params.predicateType,
        })
    }

    componentWillReceiveProps(props) {
        // console.log("RP " + props.match.params.entityID, props.match.params.predicateType)
        this.setState({
            current: props.match.params.entityID,
            predicateType: props.match.params.predicateType,
        })
    }

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    onHandle = (entityID, predicateType) => {
        this.setState({
            current: entityID,
            predicateType: predicateType,
        })


    }
    render() {
        // console.log("RENDER: ",this.state)
        return (
            <Layout>
                <Header style={{ backgroundColor: 'white', display:'flex', justifyContent: 'center', lineHeight:1.5}}>
                    <div style={{ display: 'inline-flex'}}>
                        <SearchTree ontology={this.props.ontology} onHandle={this.onHandle} />
                        <SearchIndividuals style={{ display: 'inherit' }} />
                        
                    </div>

                </Header>
                {/* <Sider
                    width={400}
                    style={{ background: '#fff' }}
                    collapsed={this.state.collapsed}
                >
                    <Icon
                        style={{display: "inherit", cursor: "pointer",  transition: "color .3s"}}
                        theme="filled"
                        type={this.state.collapsed ? 'caret-right' : 'caret-left'}
                        onClick={this.toggle}
                    />

                    <SearchIndividuals style={{ margin: '16px 8px 16px 0px'  }}/>
                    <SearchTree ontology={this.props.ontology} onHandle={this.onHandle} />

                </Sider> */}
                <Layout>
                    <Content >
                        <div style={{background: '#fff', minHeight: '100%' }}>
                            {
                                this.state.predicateType === undefined &&
                                this.state.current === undefined &&
                                <h3 style={{ textAlign: 'center', marginBottom: 0 }}>Search or select something</h3>
                            }
                            <Route exact path="/open/ontology/wiki/:predicateType?/:entityID?" render={(props) => (
                                this.state.current !== props.match.params.entityID && this.state.current !== undefined ?
                                    <Redirect push to={"/open/ontology/wiki/" + this.state.predicateType + "/" + this.state.current} />
                                    : null
                                // this.props.match.params.predicateType
                            )} />
                            <Route exact path={"/open/ontology/wiki/" + predicateTypes.c + "/:entityID"} render={(props) => (
                                <ClassPage {...props} ontology={this.props.ontology} />
                            )} />
                            <Route exact path={"/open/ontology/wiki/" + predicateTypes.op + "/:entityID"} render={(props) => (
                                <ObjectPropertyPage {...props} ontology={this.props.ontology} />
                            )} />
                            <Route exact path={"/open/ontology/wiki/" + predicateTypes.dp + "/:entityID"} render={(props) => (
                                <DataPropertyPage {...props} ontology={this.props.ontology} />
                            )} />
                        </div>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default OntologyWiki;