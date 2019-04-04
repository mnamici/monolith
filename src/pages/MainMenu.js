import React from 'react';
import { NavLink } from 'react-router-dom'
import { Menu, Icon } from 'antd';
//import ClosableMenuItem from './ClosableMenuItem'

const SubMenu = Menu.SubMenu;
const MenuItem = Menu.Item;


export default class MainMenu extends React.Component {

    getClosableMenuItem(item, path) {
        return (
            <MenuItem key={item.name + "-" + item.version}>
                {/* <Popover content={<small>{item.version}</small>} placement='right'> */}
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <div style={{ textOverflow: 'ellipsis', overflow: 'hidden' }}>
                        <NavLink
                            to={path}
                            onClick={() => this.props.setcurrent(item)}
                            activeStyle={{ fontWeight: "bold", color: "white" }}
                            style={{ color: 'rgba(255, 255, 255, 0.75)' }}
                        >
                            {item.name + " " + item.version.split("/").pop()}
                        </NavLink>
                    </div>
                    <span style={{ float: "right" }} onClick={() => this.props.close(item)}>
                        <Icon type="close" style={{ color: 'rgba(255, 255, 255, 0.75)' }} />
                    </span>
                </div>
                {/* </Popover> */}
            </MenuItem>
        );
    }

    render() {

        const ontos = this.props.open.ontologies.map(item => this.getClosableMenuItem(item, "/open/ontology/info"));
        const kgs = this.props.open.kgs.map(item => this.getClosableMenuItem(item, "/kg"));
        const dss = this.props.open.dss.map(item => this.getClosableMenuItem(item, "/dataset"));

        const openSubMenus = !this.props.collapsed ? ["ontology", ",kg", "dataset"] : []
        const selected = this.props.current === undefined ? [] : [this.props.current.name + "-" + this.props.current.version]

        const mastroUrl = localStorage.getItem('mastroUrl')
        const helpUrl = mastroUrl.substring(0, mastroUrl.length - 9) + "HelpPage"

        const h = !this.props.collapsed ? '272px' : '279px'
        return (
            <div>
                <Menu defaultOpenKeys={openSubMenus} selectedKeys={selected} style={{ height: `calc(100vh - ${h})`, overflow: 'auto' }} theme="dark" mode="inline">

                    <SubMenu
                        key="ontology"
                        title={
                            <NavLink
                                to="/ontology"
                                activeStyle={{ fontWeight: "bold", color: "white" }}
                                style={{ color: 'rgba(255, 255, 255, 0.75)' }}
                            >
                                <span><Icon type="block" /><span>Ontology</span></span>
                            </NavLink>}
                    >
                        {ontos}
                    </SubMenu>

                    <SubMenu
                        key="kg"
                        title={
                            <NavLink
                                to="/kg"
                                activeStyle={{ fontWeight: "bold", color: "white" }}
                                style={{ color: 'rgba(255, 255, 255, 0.75)' }}
                            >
                                <span><Icon type="deployment-unit" /><span>Knowledge Graph</span></span>
                            </NavLink>}
                    >
                        {kgs}
                    </SubMenu>
                    <SubMenu
                        key="dataset"
                        title={
                            <NavLink
                                to="/dataset"
                                activeStyle={{ fontWeight: "bold", color: "white" }}
                                style={{ color: 'rgba(255, 255, 255, 0.75)' }}
                            >
                                <span><Icon type="table" /><span>Dataset</span></span>
                            </NavLink>}
                    >
                        {dss}
                    </SubMenu>

                </Menu>
                <Menu theme="dark" mode="inline">
                    <MenuItem key="admin">
                        <NavLink
                            to="/admin"
                            activeStyle={{ fontWeight: "bold", color: "white" }}
                            style={{ color: 'rgba(255, 255, 255, 0.75)' }}
                        >
                            <Icon type="user" />
                            <span>Administration</span>
                        </NavLink>
                    </MenuItem>

                    <MenuItem key="sett">
                        <NavLink
                            to="/settings"
                            activeStyle={{ fontWeight: "bold", color: "white" }}
                            style={{ color: 'rgba(255, 255, 255, 0.75)' }}
                        >
                            <Icon type="setting" />
                            <span>Settings</span>
                        </NavLink>
                    </MenuItem>
                    <MenuItem key="help">
                        <a
                            href={helpUrl} target="_blank" rel="noopener noreferrer"
                            // to="/help" 
                            // activeStyle={{ fontWeight: "bold", color: "white" }} 
                            style={{ color: 'rgba(255, 255, 255, 0.75)' }}
                        >
                            <Icon type="question-circle" />
                            <span>Help</span>
                        </a>
                    </MenuItem>
                    <MenuItem key="Logout">
                        <div
                            style={{ color: 'rgba(255, 255, 255, 0.75)' }}
                            onClick={this.props.logout}
                        >
                            <Icon type="logout" />
                            <span>
                                <span>Logout </span>
                                <span style={{ fontWeight: 'bold' }}>{localStorage.getItem('username')}</span>
                            </span>
                        </div>
                    </MenuItem>
                </Menu>
            </div>

        )
    }
}
