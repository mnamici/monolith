import React from 'react';
import { Menu, Icon } from 'antd';
import { deleteFromQueryCatalog } from '../api/MastroApi';
//import ClosableMenuItem from './ClosableMenuItem'

const MenuItem = Menu.Item;



class QueryCatalog extends React.Component {


    getClosableMenuItem(item) {
        return (
            <MenuItem className='catalogQuery' key={item}>
                {/* <Link to={'/open/ontology/endpoint/' + item}> */}
                <div>
                    <span style={{width: 150}} onClick={() => this.props.open(item)}>{item}</span>
                    <span style={{ float: "right" }} onClick={() => deleteFromQueryCatalog(
                        this.props.ontology.name,
                        this.props.ontology.version,
                        item,
                        this.props.refreshCatalog
                    )}>
                        <Icon type="minus-circle"/>
                    </span>
                </div>
                {/* </Link> */}
            </MenuItem>
        );
    }

    render() {
        return (
            <div>
                <h3 style={{ display: 'flex', justifyContent: 'center', paddingTop: 8 }}>Query Catalog</h3>
                <Menu style={{ backgroundColor: 'transparent' }} theme='dark' mode="inline">
                    {this.props.catalog && this.props.catalog.map(item => this.getClosableMenuItem(item.queryID))}
                </Menu>
            </div>
        )
    }
}

export default QueryCatalog;