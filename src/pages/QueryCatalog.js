import React from 'react';
import { Menu, Icon } from 'antd';
//import ClosableMenuItem from './ClosableMenuItem'

const MenuItem = Menu.Item;



class QueryCatalog extends React.Component {

    getClosableMenuItem(item){
        return (
            <MenuItem key={item}>
                <div>
                    {item}
                    <a href={"#delete?q="+item} style={{float:"right"}} onClick={() => console.log("Delete "+item)}>
                        <Icon type="close" />
                    </a>
                </div>
            </MenuItem>
        );
    }

    render() {

        const queries = this.props.queryCatalog.map( item => this.getClosableMenuItem(item.queryID));

        return (
            <Menu theme="light" mode="inline">
                {queries}
            </Menu>
        )
    }
}

export default QueryCatalog;