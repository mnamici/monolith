import React from 'react'
import {
    Drawer, Form, Button, Col, Row, Input, Icon, Divider,
} from 'antd';

import { postKnowledgeGraph } from '../api/KgApi'
import { regexIri } from '../utils/utils';

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

    submit = () => {
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                const kg = {
                    kgIri: values.iri,
                    kgTitle: [{ lang: '', content: values.title }],
                    kgCreator: { name: localStorage.getItem('username') },
                    kgPublisher: {
                        agentIri: values.publisherAgentIRI,
                        agentLabels: [{ lang: '', content: values.publisherAgentLabel }],
                        agentWebsite: values.publisherAgentWebsite,
                        agentEmail: values.publisherAgentEmail,
                        agentAddress: values.publisherAgentAddress,
                    },
                    kgContributors: [{ name: localStorage.getItem('username') }],
                    kgRightsHolder: {
                        agentIri: values.rightsHolderAgentIRI,
                        agentLabels: [{ lang: '', content: values.rightsHolderAgentLabel }],
                        agentWebsite: values.rightsHolderAgentWebsite,
                        agentEmail: values.rightsHolderAgentEmail,
                        agentAddress: values.rightsHolderAgentAddress,
                    },
                    kgCreationTs: Date.now(),
                    kgLastModifiedTs: Date.now(),
                    kgDescriptions: [{ lang: '', content: values.description }],
                }
                postKnowledgeGraph(kg, this.onClose)
            }
        });


    }

    getAgentForm(id) {
        const { getFieldDecorator } = this.props.form;

        return (
            <div>
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item label="IRI">
                            {getFieldDecorator(`${id}AgentIRI`, {
                                rules: [
                                    { required: false, message: 'Please enter agent IRI', },
                                    { pattern: regexIri, message: 'Not a valid IRI' }
                                ],
                            })(<Input placeholder='Please enter agent IRI' />)}
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item label="Label">
                            {getFieldDecorator(`${id}AgentLabel`, {
                                rules: [
                                    { required: false, message: 'Please enter agent label', },
                                ],
                            })(<Input placeholder='Please enter agent label' />)}
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item label="Website">
                            {getFieldDecorator(`${id}AgentWebsite`, {
                                rules: [
                                    { required: false, message: 'Please enter agent label', },
                                ],
                            })(<Input placeholder='Please enter agent website' />)}
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item label="Email">
                            {getFieldDecorator(`${id}AgentEmail`, {
                                rules: [
                                    { type: 'email', required: false, message: 'Please enter agent email', },
                                ],
                            })(<Input placeholder='Please enter agent email' />)}
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item label="Address">
                            {getFieldDecorator(`${id}AgentAddress`, {
                                rules: [
                                    { required: false, message: 'Please enter agent address', },
                                ],
                            })(<Input placeholder='Please enter agent address' />)}
                        </Form.Item>
                    </Col>
                </Row>
            </div>
        )
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Button type='primary' style={{ height: 270, width: '100%' }} onClick={this.showDrawer}>
                    <Icon type="plus" /> Add Knowledge Graph
                </Button>
                <Drawer
                    title="Create a new knowledge graph"
                    width='40vw'
                    onClose={this.onClose}
                    visible={this.state.visible}
                    style={{
                        overflow: 'auto',
                        height: 'calc(100vh - 108px)',
                        paddingBottom: '108px',
                    }}
                >
                    <Form layout="vertical">
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label="Knowledge Graph IRI">
                                    {getFieldDecorator('iri', {
                                        rules: [
                                            { required: true, message: 'Please enter knowledge graph iri' },
                                            { pattern: regexIri, message: 'Not a valid IRI' }],
                                    })(<Input placeholder="Please enter knowledge graph IRI" />)}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item label="Title">
                                    {getFieldDecorator('title', {
                                        rules: [
                                            {
                                                required: true,
                                                message: 'Please enter knowledge graph title',
                                            },
                                        ],
                                    })(<Input placeholder="Please enter knowledge graph title" />)}
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
                                                message: 'Please enter knowledge graph description',
                                            },
                                        ],
                                    })(<Input.TextArea rows={4} placeholder="Please enter knowledge graph description" />)}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Divider>Publisher</Divider>
                        {this.getAgentForm('publisher')}
                        <Divider>Rights Holder</Divider>
                        {this.getAgentForm('rightsHolder')}
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
                            background: 'var(--light)'

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

const AddKnowledgeGraph = Form.create()(DrawerForm);

export default AddKnowledgeGraph;