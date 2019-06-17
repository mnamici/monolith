import React from 'react';
import { NavLink } from 'react-router-dom'
import { Menu, Icon } from 'antd';
//import ClosableMenuItem from './ClosableMenuItem'

const MenuItem = Menu.Item;

export default class MainMenu extends React.Component {
    type = ['Ontologies', 'Knowledge Graphs', 'Datasets']

    state = {
        type: 0
    }

    render() {

        const selected = this.props.current === undefined ? [] : [this.props.current.name + "-" + this.props.current.version]

        const mastroUrl = localStorage.getItem('mastroUrl')
        const helpUrl = mastroUrl ? mastroUrl.substring(0, mastroUrl.length - 9) + "HelpPage" : '/'

        const h = !this.props.collapsed ? '272px' : '279px'
        const w = !this.props.collapsed ? 200 : null

        const styleMenuItem = { paddingRight: 0, margin: 0 }

        return (
            <div>
                <Menu
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
                                activeStyle={{ fontWeight: "bold" }}
                                style={{ color: 'rgba(255, 255, 255, 0.75)' }}
                            >
                                <span>
                                    <Icon type="block" />
                                    <span>Ontology</span>
                                </span>
                            </NavLink>

                        </div>
                    </MenuItem>

                    <MenuItem
                        key="kg"
                        style={!this.props.collapsed ? styleMenuItem : {}}
                    >
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <NavLink
                                to="/kg"
                                activeStyle={{ fontWeight: "bold" }}
                                style={{ color: 'rgba(255, 255, 255, 0.75)' }}
                            >
                                <span><Icon type="deployment-unit" /><span>Knowledge Graph</span></span>
                            </NavLink>
                        </div>
                    </MenuItem>
                    <MenuItem
                        key="dataset"
                        style={!this.props.collapsed ? styleMenuItem : {}}
                    >
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <NavLink
                                to="/dataset"
                                activeStyle={{ fontWeight: "bold" }}
                                style={{ color: 'rgba(255, 255, 255, 0.75)' }}
                            >
                                <span><Icon type="table" /><span>Dataset</span></span>
                            </NavLink>
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
