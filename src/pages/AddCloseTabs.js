import React from 'react';
import { Tabs, Icon } from 'antd';
import MastroSPARQLTabPane from './MastroSPARQLTabPane'

const TabPane = Tabs.TabPane;

const newQueryID = 'new_'
class AddCloseTabs extends React.Component {
  constructor(props) {
    super(props);
    this.newTabIndex = 0;
    const panes = props.panes;
    this.state = {
      activeKey: null,
      panes,
    };
  }

  componentWillReceiveProps(props) {
    if (props.panes.length === 0) {
      const panes = []
      this.newTabIndex++;
      const activeKey = newQueryID + this.newTabIndex
      const title = newQueryID + this.newTabIndex
      panes.push({
        title: <span><Icon type='file'/>{title}</span>,
        content: <MastroSPARQLTabPane
          ontology={props.ontology}
          mappings={props.mappings}
          num={activeKey}
          query={{}} 
          new  
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

  add = (query) => {
    const panes = this.state.panes;
    this.newTabIndex++
    const activeKey = newQueryID + this.newTabIndex
    const title = query.queryID || newQueryID + this.newTabIndex
    panes.push({
      title: <span><Icon type='file'/>{title}</span>,
      content: <MastroSPARQLTabPane
        ontology={this.props.ontology}
        mappings={this.props.mappings}
        num={activeKey}
        query={query} 
        new  
        />,
      key: activeKey
    });
    this.setState({ panes, activeKey });
  }

  remove = (targetKey) => {
    let activeKey = this.state.activeKey;
    let lastIndex;
    this.state.panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const panes = this.state.panes.filter(pane => pane.key !== targetKey);
    if (lastIndex >= 0 && activeKey === targetKey) {
      activeKey = panes[lastIndex].key;
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

export default AddCloseTabs;