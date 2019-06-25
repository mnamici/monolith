import React from 'react'
import { Select, Tabs, Switch } from 'antd';
import { renders } from '../utils/utils'
import Datasources from './Datasources';

const Option = Select.Option;
export default class Settings extends React.Component {
    state = { currentTab: 'datasource' }

    handleChange = (value) => {
        localStorage.setItem('renderEntity', value)
    }

    tabClick = (key) => {
        this.setState({ currentTab: key })
    }

    changePopoverAxioms = (e) => {
        localStorage.setItem('popoverAxioms',e)
    }

    render() {
        const popoverAxioms = localStorage.getItem('popoverAxioms') === 'true';

        return (
            <div style={{ padding: 8 }}>
                <Tabs onTabClick={this.tabClick}>
                    <Tabs.TabPane
                        tab='Datasources'
                        key='datasource'>
                        <Datasources />

                    </Tabs.TabPane>
                    <Tabs.TabPane
                        tab='Rendering'
                        key='rendering'>
                        <Select
                            style={{ width: 250, padding: 6 }}
                            defaultValue={localStorage.getItem('renderEntity') || renders[0]}
                            onChange={this.handleChange}>
                            {renders.map(r => <Option value={r} key={r}>{r}</Option>)}
                        </Select>
                        <div>
                            <span style={{ padding: '0px 10px', color: 'rgb(255, 255, 255, 0.75)' }}>
                                Popover Axioms
                            </span>
                            <Switch defaultChecked={popoverAxioms} onChange={this.changePopoverAxioms}/>
                        </div>
                    </Tabs.TabPane>
                </Tabs>
            </div>
        )
    }
}