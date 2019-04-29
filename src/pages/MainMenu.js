import React from 'react';
import { NavLink } from 'react-router-dom'
import { Menu, Icon, Drawer } from 'antd';
//import ClosableMenuItem from './ClosableMenuItem'

const MenuItem = Menu.Item;


export default class MainMenu extends React.Component {
    state = {
        visible: false
    }

    getClosableMenuItem(item, path) {
        return (
            <MenuItem key={item.name + "-" + item.version}>
                {/* <Popover content={<small>{item.version}</small>} placement='right'> */}
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', direction: 'rtl', textAlign: 'left' }}>
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

    toggleDrawer = () => {
        this.setState({ visible: !this.state.visible })
    }

    render() {

        const ontos = this.props.open.ontologies.map(item => this.getClosableMenuItem(item, "/open/ontology/info"));
        const kgs = this.props.open.kgs.map(item => this.getClosableMenuItem(item, "/kg"));
        const dss = this.props.open.dss.map(item => this.getClosableMenuItem(item, "/dataset"));

        const openSubMenus = !this.props.collapsed ? ["ontology", ",kg", "dataset"] : []
        const selected = this.props.current === undefined ? [] : [this.props.current.name + "-" + this.props.current.version]

        const mastroUrl = localStorage.getItem('mastroUrl')
        const helpUrl = mastroUrl ? mastroUrl.substring(0, mastroUrl.length - 9) + "HelpPage" : '/'

        const h = !this.props.collapsed ? '272px' : '279px'
        const w = !this.props.collapsed ? 200 : null

        const styleMenuItem = { paddingRight: 0, margin: 0 }
        const styleSpan = { borderLeft: 'solid 1px white' }
        const styleIcon = { margin: '0px 8px' }

        return (
            <div>
                <Drawer
                    title='Open Projects'
                    visible={this.state.visible}
                    onClose={this.toggleDrawer}
                    width='50vw'
                >
                    <Menu
                        theme="dark"
                        className='mainMenu'
                        mode="inline"
                    >
                        {ontos}
                        {kgs}
                        {dss}
                    </Menu>
                </Drawer>
                <Menu
                    defaultOpenKeys={openSubMenus}
                    selectedKeys={selected}
                    style={{ height: `calc(100vh - ${h})`, width: w, overflow: 'auto' }}
                    theme="dark"
                    className='mainMenu'
                    mode="vertical">
                    {/* <MenuItem key='open'>
                        <span onClick={this.toggleDrawer} >
                            <Icon type='right' />
                            <span>Opened Projects</span>
                        </span>
                    </MenuItem> */}
                    <MenuItem
                        key="ontology"
                        style={!this.props.collapsed ? styleMenuItem : {}}
                    >
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <NavLink
                                to="/ontology"
                                activeStyle={{ fontWeight: "bold"}}
                                style={{ color: 'rgba(255, 255, 255, 0.75)' }}
                            >
                                <span>
                                    <Icon type="block" />
                                    <span>Ontology</span>
                                </span>
                            </NavLink>

                            {!this.props.collapsed && <span style={styleSpan} className='mainMenuArrow' onClick={this.toggleDrawer}>
                                <Icon style={styleIcon} type='right' />
                            </span>}
                        </div>
                    </MenuItem>

                    <MenuItem
                        key="kg"
                        style={!this.props.collapsed ? styleMenuItem : {}}
                    >
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <NavLink
                                to="/kg"
                                activeStyle={{ fontWeight: "bold"}}
                                style={{ color: 'rgba(255, 255, 255, 0.75)' }}
                            >
                                <span><Icon type="deployment-unit" /><span>Knowledge Graph</span></span>
                            </NavLink>
                            {!this.props.collapsed && <span style={styleSpan} className='mainMenuArrow' onClick={this.toggleDrawer} >
                                <Icon style={styleIcon} type='right' />
                            </span>}
                        </div>
                    </MenuItem>
                    <MenuItem
                        key="dataset"
                        style={!this.props.collapsed ? styleMenuItem : {}}
                    >
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <NavLink
                                to="/dataset"
                                activeStyle={{ fontWeight: "bold"}}
                                style={{ color: 'rgba(255, 255, 255, 0.75)' }}
                            >
                                <span><Icon type="table" /><span>Dataset</span></span>
                            </NavLink>
                            {!this.props.collapsed && <span style={{ borderLeft: 'solid 1px white' }} className='mainMenuArrow' onClick={this.toggleDrawer} >
                                <Icon style={styleIcon} type='right' />
                            </span>}
                        </div>
                    </MenuItem>

                </Menu>
                <Menu
                    className='mainMenu'
                    theme="dark"
                    mode="inline">
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
