import React from 'react';
import { Link } from 'react-router-dom'
import { Menu, Icon } from 'antd';
//import ClosableMenuItem from './ClosableMenuItem'

const MenuItem = Menu.Item;



class QueryCatalog extends React.Component {
    

    getClosableMenuItem(item) {
        return (
            <MenuItem key={item}>
                <Link to={'/open/ontology/endpoint/'+item}>
                    {item}
                    <span href={"#delete?q=" + item} style={{ float: "right" }} onClick={() => console.log("Delete " + item)}>
                        <Icon type="close" style={{ color: 'red' }}/>
                    </span>
                </Link>
            </MenuItem>
        );
    }

    render() {

        const queries = this.props.catalog.map(item => this.getClosableMenuItem(item.queryID));

        return (
            <Menu style={{ minHeight: '50vh', backgroundColor: 'transparent' }} theme='dark' mode="inline">
                {queries}
            </Menu>
        )
    }
}

export default QueryCatalog;