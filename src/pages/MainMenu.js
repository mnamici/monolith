import React from 'react';
import { NavLink } from 'react-router-dom'
import { Menu, Icon } from 'antd';
//import ClosableMenuItem from './ClosableMenuItem'

const SubMenu = Menu.SubMenu;
const MenuItem = Menu.Item;


class MainMenu extends React.Component {

    getClosableMenuItem(item, path) {
        return (
            <MenuItem key={item}>
                <div>
                    <NavLink to={path} activeStyle={{ fontWeight: "bold", color: "white" }} style={{ color: 'rgba(255, 255, 255, 0.65)' }}>{item}</NavLink>
                    <span style={{ float: "right" }} onClick={() => console.log("Closing " + item)}>
                        <Icon type="close" style={{ color: 'rgba(255, 255, 255, 0.65)' }} />
                    </span>
                </div>
            </MenuItem>
        );
    }

    render() {

        const ontolgies = this.props.open.ontologies.map(item => this.getClosableMenuItem(item, "/open/ontology/info"));
        const kgs = this.props.open.kgs.map(item => this.getClosableMenuItem(item, "/kg"));
        const dss = this.props.open.dss.map(item => this.getClosableMenuItem(item, "/dataset"));

        return (
            <Menu defaultSelectedKeys={["ontology"]} theme="dark" mode="inline">

                <SubMenu
                    key="ontology"
                    title={
                        <NavLink to="/ontology" activeStyle={{ fontWeight: "bold", color: "white" }} style={{ color: 'rgba(255, 255, 255, 0.65)' }}>
                            <span><Icon type="block" /><span>Ontology</span></span>
                        </NavLink>}
                >
                    {ontolgies}
                </SubMenu>

                <SubMenu
                    key="kg"
                    title={
                        <NavLink to="/kg" activeStyle={{ fontWeight: "bold", color: "white" }} style={{ color: 'rgba(255, 255, 255, 0.65)' }}>
                            <span><Icon type="deployment-unit" /><span>Knowledge Graph</span></span>
                        </NavLink>}
                >
                    {kgs}
                </SubMenu>
                <SubMenu
                    key="dataset"
                    title={
                        <NavLink to="/dataset" activeStyle={{ fontWeight: "bold", color: "white" }} style={{ color: 'rgba(255, 255, 255, 0.65)' }}>
                            <span><Icon type="table" /><span>Dataset</span></span>
                        </NavLink>}
                >
                    {dss}
                </SubMenu>
                {/* <Menu.Divider/> */}
                <SubMenu
                    key="admin"
                    title={
                        <NavLink to="/admin" activeStyle={{ fontWeight: "bold", color: "white" }} style={{ color: 'rgba(255, 255, 255, 0.65)' }}>
                            <Icon type="user" />
                            <span>Administration</span>
                        </NavLink>}
                />
                <SubMenu
                    key="sett"
                    title={
                        <NavLink to="/settings" activeStyle={{ fontWeight: "bold", color: "white" }} style={{ color: 'rgba(255, 255, 255, 0.65)' }}>
                            <Icon type="setting" />
                            <span>Settings</span>
                        </NavLink>
                    } />
                <SubMenu
                    key="help"
                    title={
                        <NavLink to="/help" activeStyle={{ fontWeight: "bold", color: "white" }} style={{ color: 'rgba(255, 255, 255, 0.65)' }}>
                            <Icon type="question-circle" />
                            <span>Help</span>
                        </NavLink>
                    } />
                <SubMenu
                    key="Logout"
                    title={
                        <NavLink to="/logout" activeStyle={{ fontWeight: "bold", color: "white" }} style={{ color: 'rgba(255, 255, 255, 0.65)' }}>
                            <Icon type="logout" />
                            <span>Logout</span>
                        </NavLink>
                    } />
            </Menu>
        )
    }
}

export default MainMenu;