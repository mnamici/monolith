import React from 'react';
import { Tabs, Icon } from 'antd';
import MastroSPARQLTabPane from './MastroSPARQLTabPane'

const TabPane = Tabs.TabPane;

const newQueryID = 'new_'
export default class AddCloseTabs extends React.Component {
  constructor(props) {
    super(props);
    this.newTabIndex = 0;
    this.state = {
      activeKey: null,
      panes: [],
    };
  }

  componentWillReceiveProps(props) {
    if (props.mappings === undefined || props.catalog === undefined) return
    if (this.state.panes.length === 0) {
      const panes = []
      this.newTabIndex++;
      const activeKey = newQueryID + this.newTabIndex
      const title = newQueryID + this.newTabIndex
      panes.push({
        title: <span key={title}><Icon type='file' />{title+"*"}</span>,
        content: <MastroSPARQLTabPane
          ontology={props.ontology}
          mappings={props.mappings}
          num={activeKey}
          query={{ queryID: title }}
          new
          renameTab={this.renameTab}
        />,
        key: activeKey
      });
      this.setState({ panes, activeKey });
    }
    for (let i = 0; i < props.catalog.length; i++)
      if (props.catalog[i].queryID === props.open) {
        this.add(props.catalog[i])
        break
      }
  }

  onChange = (activeKey) => {
    this.setState({ activeKey });
  }

  onEdit = (targetKey, action) => {
    this[action](targetKey);
  }

  renameTab = (oldTitle, newTitle) => {
    let panes = [...this.state.panes]
    for (let pane of panes) {
      if (pane.title.key === oldTitle) {
        pane.title = <span key={newTitle}><Icon type='file' />{newTitle}</span>
      }
    }
    this.setState({ panes: panes })
    this.props.refreshCatalog()
  }

  add = (query) => {
    const panes = this.state.panes;
    this.newTabIndex++
    const activeKey = newQueryID + this.newTabIndex
    const title = query.queryID || newQueryID + this.newTabIndex
    if (query.queryID !== undefined)
      panes.push({
        title: <span key={title}><Icon type='file' />{title}</span>,
        content: <MastroSPARQLTabPane
          ontology={this.props.ontology}
          mappings={this.props.mappings}
          num={activeKey}
          query={query}
          renameTab={this.renameTab}
        />,
        key: activeKey
      });
    else {
      panes.push({
        title: <span key={title}><Icon type='file' />{title+"*"}</span>,
        content: <MastroSPARQLTabPane
          ontology={this.props.ontology}
          mappings={this.props.mappings}
          num={activeKey}
          query={{ queryID: title }}
          new
          renameTab={this.renameTab}
        />,
        key: activeKey
      });
    }
    this.setState({ panes, activeKey });
  }

  remove = (targetKey) => {
    let activeKey = this.state.activeKey;
    let lastIndex;
    this.state.panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
      if (lastIndex === -1) {
        lastIndex = 0;
      }
    });
    const panes = this.state.panes.filter(pane => pane.key !== targetKey);
    if (panes.length > 0 && activeKey === targetKey) {
      activeKey = panes[lastIndex].key;
    }

    if (panes.length === 0) {
      this.newTabIndex = 0
    }

    this.setState({ panes, activeKey });
  }

  render() {
    return (
      <Tabs
        onChange={this.onChange}
        activeKey={this.state.activeKey}
        type="editable-card"
        onEdit={this.onEdit}
      >
        {this.state.panes.map(pane => <TabPane tab={pane.title} key={pane.key} closable={pane.closable}>{pane.content}</TabPane>)}
      </Tabs>
    );
  }
}
