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
                    <NavLink to={path}>{item}</NavLink>
                    <a href={"#close?q=" + item} style={{ float: "right" }} onClick={() => console.log("Closing " + item)}>
                        <Icon type="close" />
                    </a>
                </div>
            </MenuItem>
        );
    }

    render() {

        const ontolgies = this.props.open.ontologies.map(item => this.getClosableMenuItem(item,"/open/ontology/info"));
        const kgs = this.props.open.kgs.map(item => this.getClosableMenuItem(item,"/kg"));
        const dss = this.props.open.dss.map(item => this.getClosableMenuItem(item,"/dataset"));

        return (
            <Menu defaultSelectedKeys={["ontology"]} theme="dark" mode="inline">

                <SubMenu
                    key="ontology"
                    title={
                        <NavLink to="/ontology" activeStyle={{fontWeight: "bold", color: "white"}}>
                            <span><Icon type="block" /><span>Ontology</span></span>
                        </NavLink>}
                >
                    {ontolgies}
                </SubMenu>

                <SubMenu
                    key="kg"
                    title={
                        <NavLink to="/kg" activeStyle={{fontWeight: "bold", color: "white"}}>
                            <span><Icon type="deployment-unit" /><span>Knowledge Graph</span></span>
                        </NavLink>}
                >
                    {kgs}
                </SubMenu>
                <SubMenu
                    key="dataset"
                    title={
                        <NavLink to="/dataset" activeStyle={{fontWeight: "bold", color: "white"}}>
                            <span><Icon type="table" /><span>Dataset</span></span>
                        </NavLink>}
                >
                    {dss}
                </SubMenu>
                {/* <Menu.Divider/> */}
                <MenuItem key="admin">
                    <Icon type="user" />
                    <span>Administration</span>
                </MenuItem>
                <MenuItem key="sett">
                    <Icon type="setting" />
                    <span>Settings</span>
                </MenuItem>
                <MenuItem key="help">
                    <Icon type="question-circle" />
                    <span>Help</span>
                </MenuItem>
                <MenuItem key="Logout">
                    <Icon type="logout" />
                    <span>Logout</span>
                </MenuItem>
            </Menu>
        )
    }
}

export default MainMenu;