import React from 'react';
import { NavLink } from 'react-router-dom'
import { List, Card, Divider, Popover, Select } from 'antd';
import UploadFile from './UploadFile';
import { downloadOntologyFile, deleteOntologyVersion } from '../api/MastroApi';
import { saveFileInfo } from '../utils/utils';

const Option = Select.Option
export default class OntologyVersionsList extends React.Component {
    state = {
        data: []
    }

    getData(props) {
        var list = [];
        for (let i = 0; i < this.props.data.length; i++) {
            if (this.props.data[i].ontologyID === this.props.current) {
                list = [...this.props.data[i].ontologyVersions];
                break;
            }
        }
        return list;
    }

    componentDidMount() {
        this.setState({
            data: this.getData(this.props.data)
        })
    }

    componentWillReceiveProps(props) {
        this.setState({
            data: this.getData(props.data)
        })
    }


    delete(ontologyID, versionID) {
        deleteOntologyVersion(ontologyID, versionID, this.props.rerender)
        this.props.close({
            name: ontologyID,
            version: versionID
        })
    }

    changeSort = (value) => {
        if (value === 'name')
            this.setState({
                data: this.getData(this.props.data).sort(function (a, b) {
                    var x = a.versionID.toLowerCase();
                    var y = b.versionID.toLowerCase();
                    if (x < y) { return -1; }
                    if (x > y) { return 1; }
                    return 0;
                })
            })
        else if (value === 'date')
            this.setState({
                data: this.getData(this.props.data)
            })
    }

    render() {

        return (
            <div>
                <Divider>choose or add a version</Divider>
                <Select defaultValue='date' onChange={this.changeSort} style={{ padding: 6 }}>
                    <Option value='date' >
                        Sort by date
                    </Option>
                    <Option value='name' >
                        Sort by version
                    </Option>
                </Select>
                <List
                    className='bigCards'
                    rowKey="ontologyVersionsView"
                    grid={{ gutter: 12, lg: 3, md: 2, sm: 1, xs: 1 }}
                    dataSource={['', ...this.state.data]}
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
                                        () => downloadOntologyFile(item.ontologyID, item.versionID, saveFileInfo)
                                    }>
                                        download
                                    </span>,
                                    <span onClick={
                                        () => this.delete(item.ontologyID, item.versionID)
                                    }>
                                        delete
                                    </span>
                                ]}>
                                    <NavLink to={"/open/ontology/info/"} onClick={() => this.props.open(item.ontologyID, item.versionID)}>
                                        <Card.Meta key={item.versionID}
                                            avatar={<img alt="" src={item.avatar} />}
                                            title={
                                                <div>
                                                    <div style={{overflow: 'hidden', textOverflow: 'ellipsis'}}>
                                                        {item.ontologyID}
                                                    </div>
                                                    <div style={{overflow: 'hidden', textOverflow: 'ellipsis', direction: 'rtl', textAlign: 'left'}}>
                                                        {item.versionID}
                                                    </div>
                                                </div>
                                            }
                                            description={item.versionDescription[0] !== undefined ? item.versionDescription[0].content : ""}
                                        /></NavLink>
                                </Card>
                            </List.Item>
                        ) : (
                                <List.Item>
                                    <UploadFile current={this.props.current} rerender={this.props.rerender} type='owl' />
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
