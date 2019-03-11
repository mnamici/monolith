import React from 'react';
import { Menu, Icon } from 'antd';
//import ClosableMenuItem from './ClosableMenuItem'

const MenuItem = Menu.Item;



class QueryCatalog extends React.Component {


    getClosableMenuItem(item) {
        return (
            <MenuItem className='catalogQuery' key={item} onClick={() => this.props.open(item)}>
                {/* <Link to={'/open/ontology/endpoint/' + item}> */}
                {item}
                <span href={"#delete?q=" + item} style={{ float: "right" }} onClick={() => console.log("Delete " + item)}>
                    <Icon type="minus-circle" />
                </span>
                {/* </Link> */}
            </MenuItem>
        );
    }

    render() {

        const queries = this.props.catalog.map(item => this.getClosableMenuItem(item.queryID));

        return (
            <div>
                <h3 style={{display: 'flex', justifyContent: 'center', paddingTop: 8}}>Query Catalog</h3>
                <Menu style={{ backgroundColor: 'transparent' }} theme='dark' mode="inline">
                    {queries}
                </Menu>
            </div>
        )
    }
}

export default QueryCatalog;