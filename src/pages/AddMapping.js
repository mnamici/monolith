import React from 'react'
import {
    Drawer, Form, Button, Col, Row, Input, Icon, Spin, Select,
} from 'antd';

import { postMapping, getDatasources, getMappingInfo } from '../api/MastroApi'
import UploadFile from './UploadFile';

class DrawerForm extends React.Component {
    state = { datasources: [], visible: false, loading: true };

    componentDidMount() {
        getDatasources(this.loaded)
    }

    loaded = (datasources) => {
        this.setState({ loading: false, datasources })
    }

    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };

    onClose = () => {
        this.setState({
            visible: false,
        });
        this.props.rerender()
    };

    submit = () => {
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                const mapping = {
                    mappingID: values.id,
                    mappingVersion: values.version,
                    mappingDescription: values.description
                }
                postMapping(this.props.current.name, this.props.current.version, mapping, this.onClose)
            }
        });


    }

    uploaded = () => {
        const mapping = null
        getMappingInfo(this.props.current.name, this.props.current.version, mapping, this.loadedInfo)
    }

    loadedInfo = (mappingInfo) => {
        this.props.form.setFieldsValue({
            id: mappingInfo.mapping.mappingID
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            this.state.loading ? <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 36 }}> <Spin size='large' /></div> :
                <div>
                    <Button type='primary' style={{ height: 270, width: '100%' }} onClick={this.showDrawer}>
                        <Icon type="plus" /> Add Mapping
                    </Button>
                    <Drawer
                        title="Create a new mapping"
                        width='40vw'
                        onClose={this.onClose}
                        visible={this.state.visible}
                        style={{
                            overflow: 'auto',
                            height: 'calc(100% - 108px)',
                            paddingBottom: '108px',
                        }}
                    >
                        <div style={{ paddingBottom: 12 }}>
                            <UploadFile type='mapping' current={this.props.current} rerender={this.uploaded} />
                        </div>

                        <Form layout="vertical">
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item label="ID">
                                        {getFieldDecorator('id', {
                                            rules: [
                                                { required: true, message: 'Please enter version id' },
                                                { pattern: /^[A-Za-z][A-Za-z0-9_]*$/, message: 'You can use only letters numbers and underscore.' }],
                                        })(<Input placeholder="Please enter mapping id" />)}
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={16}>
                                <Col span={24}>
                                    <Form.Item label="Version">
                                        {getFieldDecorator('version', {
                                            rules: [
                                                {
                                                    required: false,
                                                    message: 'Please enter mapping version',
                                                },
                                            ],
                                        })(<Input placeholder="Please enter mapping version" />)}
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={16}>
                                <Col span={24}>
                                    <Form.Item label="Description">
                                        {getFieldDecorator('description', {
                                            rules: [
                                                {
                                                    required: false,
                                                    message: 'Please enter mapping description',
                                                },
                                            ],
                                        })(<Input.TextArea rows={4} placeholder="Please enter mapping description" />)}
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item label="Datasource">
                                        {getFieldDecorator('datasource', {
                                            rules: [
                                                { required: true, message: 'Please enter a datasource' }],
                                        })(
                                            <Select>
                                                {this.state.datasources.map(item => (
                                                    <Select.Option key={item.id} value={item.id} >
                                                        {item.id}
                                                    </Select.Option>))}
                                            </Select>
                                        )}
                                    </Form.Item>
                                </Col>

                            </Row>
                        </Form>
                        <div
                            style={{
                                position: 'absolute',
                                left: 0,
                                bottom: 0,
                                width: '100%',
                                borderTop: '1px solid #e9e9e9',
                                padding: '10px 16px',
                                textAlign: 'right',
                            }}
                        >
                            <Button onClick={this.onClose} style={{ marginRight: 8 }}>
                                Cancel
              </Button>
                            <Button onClick={this.submit} type="primary">
                                Submit
              </Button>
                        </div>
                    </Drawer>
                </div>
        );
    }
}

const AddMapping = Form.create()(DrawerForm);

export default AddMapping;