import React from 'react';
import { Tree, Input } from 'antd';

const { TreeNode } = Tree;
const Search = Input.Search;

const gData = [
  {
    title: "Classes",
    key: "Classes",
    children: [
      {
        title: "Course",
        key: "Course",
      },
      {
        title: "Person",
        key: "Person",
        children: [
          {
            title: "Student",
            key: "Student",
          },
          {
            title: "Professor",
            key: "Professor",
          },
        ]
      },
    ]
  },
  {
    title: "Object Properties",
    key: "Object Properties",
    children: [
      {
        title: "attends",
        key: "attends",
      },
      {
        title: "takes",
        key: "takes",
      },
    ]
  },
  {
    title: "Data Properties",
    key: "Data Properties",
    children: [
      {
        title: "courseName",
        key: "courseName",
      },
      {
        title: "fullName",
        key: "fullName",
      },
      {
        title: "enrollmentYear",
        key: "enrollmentYear",
      }
    ]
  },
]

const dataList = [];
const generateList = (data) => {
  for (let i = 0; i < data.length; i++) {
    const node = data[i];
    const key = node.key;
    dataList.push({ key, title: key });
    if (node.children) {
      generateList(node.children, node.key);
    }
  }
};
generateList(gData);

const getParentKey = (key, tree) => {
  let parentKey;
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    if (node.children) {
      if (node.children.some(item => item.key === key)) {
        parentKey = node.key;
      } else if (getParentKey(key, node.children)) {
        parentKey = getParentKey(key, node.children);
      }
    }
  }
  return parentKey;
};

class SearchTree extends React.Component {
  state = {
    expandedKeys: [],
    searchValue: '',
    autoExpandParent: true,
  }

  onExpand = (expandedKeys) => {
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  }

  onChange = (e) => {
    const value = e.target.value;
    const expandedKeys = dataList.map((item) => {
      if (item.title.indexOf(value) > -1) {
        return getParentKey(item.key, gData);
      }
      return null;
    }).filter((item, i, self) => item && self.indexOf(item) === i);
    this.setState({
      expandedKeys,
      searchValue: value,
      autoExpandParent: true,
    });
  }

  render() {
    const { searchValue, expandedKeys, autoExpandParent } = this.state;
    const loop = data => data.map((item) => {
      const index = item.title.indexOf(searchValue);
      const beforeStr = item.title.substr(0, index);
      const afterStr = item.title.substr(index + searchValue.length);
      const title = index > -1 ? (
        <span>
          {beforeStr}
          <span style={{ color: '#f50' }}>{searchValue}</span>
          {afterStr}
        </span>
      ) : <span>{item.title}</span>;
      if (item.children) {
        let selectable=item.key!=="Classes"&&item.key!=="Object Properties"&&item.key!=="Data Properties";
        return (
          <TreeNode key={item.key} title={title} selectable={selectable}>
            {loop(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode key={item.key} title={title} />;
    });
    return (
      <div>
        <Search style={{ margin: '0px 8px 8px 0px' }} placeholder="Search for Entities" onChange={this.onChange} />
        <Tree
          onExpand={this.onExpand}
          expandedKeys={expandedKeys}
          autoExpandParent={autoExpandParent}
        >
          {loop(gData)}
        </Tree>
      </div>
    );
  }
}

export default SearchTree;