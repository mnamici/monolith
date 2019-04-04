import React from 'react'
import {
    Drawer, Form, Button, Col, Row, Input, Icon,
} from 'antd';

import { putOntology } from '../api/MastroApi'

class DrawerForm extends React.Component {
    state = { visible: false };

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

    validate(name) {
        if (name === '')
            return false;

        return true;
    }

    submit = () => {
        if (!this.validate(this.props.form.getFieldValue('name'))) return;

        const ontology = {
            ontologyID: this.props.form.getFieldValue('name'),
            ontologyDescription: this.props.form.getFieldValue('description'),
            ontologyVersions: [],
            ontologyOwner: {
                name: localStorage.getItem('username'),
                roles: null
            }
        }
        putOntology(ontology, this.onClose)
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Button type='primary' style={{height: 247, width: '100%'}} onClick={this.showDrawer}>
                    <Icon type="plus" /> Add Ontology
                </Button>
                <Drawer
                    title="Create a new ontology"
                    width={720}
                    onClose={this.onClose}
                    visible={this.state.visible}
                    style={{
                        overflow: 'auto',
                        height: 'calc(100% - 108px)',
                        paddingBottom: '108px',
                    }}
                >
                    <Form layout="vertical" hideRequiredMark>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label="Ontology">
                                    {getFieldDecorator('name', {
                                        rules: [{ required: true, message: 'Please enter ontology name' }],
                                    })(<Input placeholder="Please enter ontology name" />)}
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
                                                message: 'Please enter ontology description',
                                            },
                                        ],
                                    })(<Input.TextArea rows={4} placeholder="Please enter ontology description" />)}
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

const AddOntology = Form.create()(DrawerForm);

export default AddOntology;