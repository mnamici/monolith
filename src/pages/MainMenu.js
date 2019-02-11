import React from 'react';
import { NavLink } from 'react-router-dom'
import { Menu, Icon, Popover } from 'antd';
//import ClosableMenuItem from './ClosableMenuItem'

const SubMenu = Menu.SubMenu;
const MenuItem = Menu.Item;


class MainMenu extends React.Component {

    getClosableMenuItem(item, path) {
        return (
            <MenuItem key={item.name + "-" + item.version}>
                <Popover content={<small>{item.version}</small>} placement='right'>
                    <div>
                        <NavLink
                            to={path}
                            onClick={() => this.props.setcurrent(item)}
                            activeStyle={{ fontWeight: "bold", color: "white" }}
                            style={{ color: 'rgba(255, 255, 255, 0.65)' }}
                        >
                            {item.name}
                        </NavLink>
                        <span style={{ float: "right" }} onClick={() => this.props.close(item)}>
                            <Icon type="close" style={{ color: 'rgba(255, 255, 255, 0.65)' }} />
                        </span>
                    </div>
                </Popover>
            </MenuItem>
        );
    }

    render() {
        const ontos = this.props.open.ontologies.map(item => this.getClosableMenuItem(item, "/open/ontology/info"));
        const kgs = this.props.open.kgs.map(item => this.getClosableMenuItem(item, "/kg"));
        const dss = this.props.open.dss.map(item => this.getClosableMenuItem(item, "/dataset"));

        return (
            <Menu defaultSelectedKeys={["ontology"]} theme="dark" mode="inline">

                <SubMenu
                    key="ontology"
                    title={
                        <NavLink
                            to="/ontology"
                            activeStyle={{ fontWeight: "bold", color: "white" }}
                            style={{ color: 'rgba(255, 255, 255, 0.65)' }}
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
                            style={{ color: 'rgba(255, 255, 255, 0.65)' }}
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
                            style={{ color: 'rgba(255, 255, 255, 0.65)' }}
                        >
                            <span><Icon type="table" /><span>Dataset</span></span>
                        </NavLink>}
                >
                    {dss}
                </SubMenu>
                {/* <Menu.Divider/> */}
                <SubMenu
                    key="admin"
                    title={
                        <NavLink
                            to="/admin"
                            activeStyle={{ fontWeight: "bold", color: "white" }}
                            style={{ color: 'rgba(255, 255, 255, 0.65)' }}
                        >
                            <Icon type="user" />
                            <span>Administration</span>
                        </NavLink>}
                />
                <SubMenu
                    key="sett"
                    title={
                        <NavLink
                            to="/settings"
                            activeStyle={{ fontWeight: "bold", color: "white" }}
                            style={{ color: 'rgba(255, 255, 255, 0.65)' }}
                        >
                            <Icon type="setting" />
                            <span>Settings</span>
                        </NavLink>
                    } />
                <SubMenu
                    key="help"
                    title={
                        <a
                            href="http://192.168.0.59:8080/mws/HelpPage" target="_blank" rel="noopener noreferrer"
                            // to="/help" 
                            // activeStyle={{ fontWeight: "bold", color: "white" }} 
                            style={{ color: 'rgba(255, 255, 255, 0.65)' }}
                        >
                            <Icon type="question-circle" />
                            <span>Help</span>
                        </a>
                    } />
                <SubMenu
                    key="Logout"
                    title={
                        <NavLink
                            to="/logout"
                            activeStyle={{ fontWeight: "bold", color: "white" }}
                            style={{ color: 'rgba(255, 255, 255, 0.65)' }}
                        >
                            <Icon type="logout" />
                            <span>Logout</span>
                        </NavLink>
                    } />
            </Menu>
        )
    }
}

export default MainMenu;