import React from 'react';
import { Menu, Icon, Button } from 'antd';
import { deleteFromQueryCatalog } from '../api/MastroApi';

const MenuItem = Menu.Item;

export default class QueryCatalog extends React.Component {

    downloadCatalog = () => {
        console.log("DOWNLOAD")
    }

    uploadCatalog = () => {
        console.log("UPLOAD")
    }

    getClosableMenuItem(item) {
        return (
            <MenuItem className='catalogQuery' key={item}>
                {/* <Link to={'/open/ontology/endpoint/' + item}> */}
                <div>
                    <span style={{ width: 150 }} onClick={() => this.props.open(item)}>{item}</span>
                    <span style={{ float: "right" }} onClick={() => deleteFromQueryCatalog(
                        this.props.ontology.name,
                        this.props.ontology.version,
                        item,
                        this.props.refreshCatalog
                    )}>
                        <Icon type="minus-circle" />
                    </span>
                </div>
                {/* </Link> */}
            </MenuItem>
        );
    }

    render() {
        return (
            <div>
                <h3 style={{ display: 'flex', justifyContent: 'center', paddingTop: 8, marginBottom: 0 }}>Query Catalog</h3>
                <div style={{ display: 'flex', justifyContent: 'space-around', margin: 8 }}>
                    <Button ghost shape='circle' icon='download' onClick={this.downloadCatalog}/>
                    <Button ghost shape='circle' icon='upload' onClick={this.uploadCatalog}/>
                </div>
                <Menu style={{ backgroundColor: 'transparent', minHeight: 'calc(100vh - 97px)' }} theme='dark' mode="inline">
                    {this.props.catalog && this.props.catalog.map(item => this.getClosableMenuItem(item.queryID))}
                </Menu>

            </div>
        )
    }
}
