import React from 'react';
import { Menu, Icon } from 'antd';
//import ClosableMenuItem from './ClosableMenuItem'

const SubMenu = Menu.SubMenu;
const MenuItem = Menu.Item;


class MainMenu extends React.Component {

    getClosableMenuItem(item){
        return (
            <MenuItem key={item}>
                <div>
                    {item}
                    <a href={"#close?q="+item} style={{float:"right"}} onClick={() => console.log("Closing "+item)}>
                        <Icon type="close" />
                    </a>
                </div>
            </MenuItem>
        );
    }

    render() {

        const ontolgies = this.props.open.ontologies.map( item => this.getClosableMenuItem(item));
        const kgs = this.props.open.kgs.map( item => this.getClosableMenuItem(item));
        const dss = this.props.open.dss.map( item => this.getClosableMenuItem(item));

        return (
            <Menu theme="dark" defaultSelectedKeys={['o']} mode="inline">
                <SubMenu
                    key="o"
                    title={<span><Icon type="block" /><span>Ontology</span></span>}
                >
                    {ontolgies}
                </SubMenu>
                    
                <SubMenu
                    key="kg"
                    title={<span><Icon type="deployment-unit" /><span>Knowledge Graph</span></span>}
                >
                    {kgs}
                </SubMenu>
                <SubMenu
                    key="ds"
                    title={<span><Icon type="table" /><span>Dataset</span></span>}
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