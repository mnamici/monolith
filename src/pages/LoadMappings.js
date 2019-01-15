import React from 'react'
import { NavLink } from 'react-router-dom'
import { List, Card, Divider, Popover } from 'antd';
import Ellipsis from 'ant-design-pro/lib/Ellipsis'
import UploadFile from './UploadFile';

const data = [

    {
        "mappingID": "MAPPING 1",
        "mappingDescription": "Wonderful mappings",
        "mappingDate": "25/12/0",
        "numAssertions": 20,
        "numViews": 23,
        "numKeyDependencies": 34,
        "numInclusionDependencies": 34,
        "numDenials": 34,
    },
    {
        "mappingID": "MAPPING 2",
        "mappingDescription": "Added some dependencies",
        "mappingDate": "25/12/0122",
        "numAssertions": 20,
        "numViews": 23,
        "numKeyDependencies": 12122134,
        "numInclusionDependencies": 3212124,
        "numDenials": 312124,
    },

]

class LoadMappings extends React.Component {

    render() {
        return (
            <div style={{ padding: 2 }}>
                <Divider>Choose or add a mapping</Divider>
                <List
                    rowKey="mappingsView"
                    grid={{ gutter: 24, lg: 3, md: 2, sm: 1, xs: 1 }}
                    dataSource={[...data, '']}
                    renderItem={item =>
                        item ? (
                            <List.Item key={item.mappingID}>
                                <Card hoverable actions={[
                                    <Popover content={
                                        <div>
                                            <p>{item.numAssertions + " assertions"}</p>
                                            <p>{item.numViews + " views"}</p>
                                            <p>{item.numKeyDependencies + item.numInclusionDependencies + item.numDenials + " dependencies"}</p>
                                        </div>
                                    } placement="bottom">
                                        <a href={"#info?q=" + item.mappingID}>
                                            info
                                        </a>
                                    </Popover>,
                                    <a href={"#delete?q=" + item.mappingID} onClick={
                                        () => console.log("Delete " + item.mappingID)
                                    }>
                                        delete
                                    </a>
                                ]}>
                                    <Card.Meta key={item.mappingID}
                                        avatar={<img alt="" src={item.avatar} />}
                                        title={
                                            <NavLink to="/open/ontology/mapping/info">
                                                {item.mappingID}
                                            </NavLink>
                                        }
                                        description={
                                            <Ellipsis>
                                                {item.mappingDescription}
                                            </Ellipsis>
                                        }
                                        onClick={
                                            () => {
                                                console.log("Open Mapping page")
                                            }
                                        }
                                    />
                                </Card>
                            </List.Item>
                        ) : (
                                <List.Item>
                                    <UploadFile />
                                    {/* <Button type="dashed" onClick={() => console.log("Add version of ontology")}>
                                        <Icon type="plus" />
                                        Add Ontology Version
                                    </Button> */}
                                </List.Item>
                            )
                    }
                />
            </div>
        );
    }
}

export default LoadMappings;