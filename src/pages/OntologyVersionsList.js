import React from 'react';
import { NavLink } from 'react-router-dom'
import { List, Card, Divider, Popover } from 'antd';
import Ellipsis from 'ant-design-pro/lib/Ellipsis'
import UploadFile from './UploadFile';
import { deleteOntologyVersion } from '../api/MastroApi';

class OntologyVersionsList extends React.Component {

    render() {
        var list = [];
        for (let i = 0; i < this.props.data.length; i++) {
            if (this.props.data[i].ontologyID === this.props.current) {
                list = [...this.props.data[i].ontologyVersions, ''];
                break;
            }
        }
        return (
            <div>
                <Divider>Choose or add a version</Divider>
                <List
                    rowKey="ontologyVersionsView"
                    grid={{ gutter: 24, lg: 3, md: 2, sm: 1, xs: 1 }}
                    dataSource={list}
                    renderItem={item =>
                        item ? (
                            <List.Item key={item.versionID}>
                                <Card hoverable actions={[
                                    <Popover content={
                                        <div>
                                            <p>{item.numClasses + " classes"}</p>
                                            <p>{item.numObjectProperties + " object properties"}</p>
                                            <p>{item.numDataProperties + " data properties"}</p>
                                            <p>{item.numAxioms + " axioms"}</p>
                                        </div>
                                    } placement="bottom">
                                        <span>
                                            info
                                        </span>
                                    </Popover>,
                                    <span onClick={
                                        () => deleteOntologyVersion(item.ontologyID, item.versionID, this.props.rerender)
                                    }>
                                        delete
                                    </span>
                                ]}>
                                    <Card.Meta key={item.versionID}
                                        avatar={<img alt="" src={item.avatar} />}
                                        title={
                                            <NavLink to={"/open/ontology/info/"} onClick={() => this.props.open(item.ontologyID,item.versionID)}>
                                                {item.ontologyID + "-" + item.versionID}
                                            </NavLink>

                                        }
                                        description={
                                            <Ellipsis>
                                                {item.versionDescription}
                                            </Ellipsis>
                                        }
                                    />
                                </Card>
                            </List.Item>
                        ) : (
                                <List.Item>
                                    <UploadFile current={this.props.current} rerender={this.props.rerender}/>
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

export default OntologyVersionsList;