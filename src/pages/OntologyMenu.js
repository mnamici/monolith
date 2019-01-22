import React from 'react';
import { NavLink } from 'react-router-dom'
import { Menu, Icon } from 'antd';
//import ClosableMenuItem from './ClosableMenuItem'

const SubMenu = Menu.SubMenu;
const MenuItem = Menu.Item;


class OntologyMenu extends React.Component {

    render() {
        return (
            <Menu style={{ paddingTop: 0, minHeight: '90vh' }} theme="light" defaultSelectedKeys={['info']} mode="vertical">
                <MenuItem key="info" style={{ marginTop: 0 }}>
                    <NavLink to="/open/ontology/info">
                        <Icon type="info" />
                        <span>Info</span>
                    </NavLink>
                </MenuItem>
                <SubMenu
                    key="doc"
                    title={<span><Icon type="book" /><span>Documentation</span></span>}
                >
                    <MenuItem key="wiki">
                        <NavLink to="/open/ontology/wiki">
                            <span>Wiki</span>
                        </NavLink>
                    </MenuItem>
                    <MenuItem key="graphol">
                        <NavLink to="/open/ontology/graphol">
                            <span>Graphol</span>
                        </NavLink>
                    </MenuItem>
                </SubMenu>
                <MenuItem key="mappings">
                    <NavLink to="/open/ontology/mappings">
                        <Icon type="to-top" />
                        <span>Mappings</span>
                    </NavLink>
                </MenuItem>
                <SubMenu
                    key="sparql"
                    title={<span><Icon type="database" /><span>Sparql</span></span>}
                >

                    <MenuItem key="endpoint">
                        <NavLink to="/open/ontology/endpoint"><span>Endpoint</span> </NavLink>
                    </MenuItem>

                    {/* <MenuItem key="spaqlink">
                        <NavLink to="/open/ontology/sparqling"><span>Sparqling</span></NavLink>
                    </MenuItem> */}
                </SubMenu>

                <MenuItem key="dataQuality">
                    <NavLink to="/open/ontology/dataQuality">
                        <Icon type="gold" />
                        <span>Data Quality</span>
                    </NavLink>
                </MenuItem>
            </Menu>
        )
    }
}

export default OntologyMenu;