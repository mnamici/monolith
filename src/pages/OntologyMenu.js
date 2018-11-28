import React from 'react';
import { Menu, Icon } from 'antd';
//import ClosableMenuItem from './ClosableMenuItem'

const SubMenu = Menu.SubMenu;
const MenuItem = Menu.Item;


class OntologyMenu extends React.Component {

    render() {
        return (
            <Menu style={{ paddingTop: 0}} theme="light" defaultSelectedKeys={['o']} mode="vertical">
                <MenuItem key="info">
                    <Icon type="info" />
                    <span>Info</span>
                </MenuItem>
                <SubMenu
                    key="doc"
                    title={<span><Icon type="book" /><span>Documentation</span></span>}
                >
                    <MenuItem key="wiki">
                        <span>Wiki</span>
                    </MenuItem>
                    <MenuItem key="graphol">
                        <span>Graphol</span>
                    </MenuItem>
                </SubMenu>
                <MenuItem key="mappings">
                    <Icon type="to-top" />
                    <span>Mappings</span>
                </MenuItem>
                <SubMenu
                    key="sparql"
                    title={<span><Icon type="database" /><span>Sparql</span></span>}
                >
                    <MenuItem key="endpoint">
                        <span>Endpoint</span>
                    </MenuItem>
                    <MenuItem key="spaqlink">
                        <span>Sparqling</span>
                    </MenuItem>
                </SubMenu>
                <MenuItem key="dataQuality">
                    <Icon type="gold" />
                    <span>Data Quality</span>
                </MenuItem>
            </Menu>
        )
    }
}

export default OntologyMenu;