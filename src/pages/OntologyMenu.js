import React from 'react';
import { Link } from 'react-router-dom'
import { Menu, Icon } from 'antd';
//import ClosableMenuItem from './ClosableMenuItem'

const SubMenu = Menu.SubMenu;
const MenuItem = Menu.Item;


class OntologyMenu extends React.Component {
    state = {
        currMenu: ['info']
    }

    componentWillReceiveProps(props) {
        let currMenu = [props.select]
        if(currMenu[0] === 'mapping') currMenu = ['mappings']
        this.setState({currMenu: currMenu})
    }

    render() {
        return (
            <Menu selectedKeys={this.state.currMenu} style={{ paddingTop: 0, minHeight: '90vh' }} theme="light" mode="vertical">
                <MenuItem key="info" style={{ marginTop: 0 }}>
                    <Link to="/open/ontology/info" >
                        <Icon type="info" />
                        <span>Info</span>
                    </Link>
                </MenuItem>
                <SubMenu
                    key="doc"
                    title={<span><Icon type="book" /><span>Documentation</span></span>}
                >
                    <MenuItem key="wiki">
                        <Link to="/open/ontology/wiki" >
                            <span>Wiki</span>
                        </Link>
                    </MenuItem>
                    <MenuItem key="graphol">
                        <Link to="/open/ontology/graphol" >
                            <span>Graphol</span>
                        </Link>
                    </MenuItem>
                </SubMenu>
                <MenuItem key="mappings">
                    <Link to="/open/ontology/mappings" >
                        <Icon type="to-top" />
                        <span>Mappings</span>
                    </Link>
                </MenuItem>
                {/* <SubMenu
                    key="sparql"
                    title={<span><Icon type="database" /><span>Sparql</span></span>}
                > */}

                <MenuItem key="endpoint">
                    <Link to="/open/ontology/endpoint">
                        <Icon type="database" />
                        <span>Endpoint</span>
                    </Link>
                </MenuItem>

                {/* <MenuItem key="spaqlink">
                        <Link to="/open/ontology/sparqling"><span>Sparqling</span></Link>
                    </MenuItem> */}
                {/* </SubMenu> */}

                <MenuItem key="dataQuality">
                    <Link to="/open/ontology/dataQuality">
                        <Icon type="gold" />
                        <span>Data Quality</span>
                    </Link>
                </MenuItem>
            </Menu>
        )
    }
}

export default OntologyMenu;