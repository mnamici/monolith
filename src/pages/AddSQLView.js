import React from 'react';
import { Form, Button } from 'antd';
import TextArea from 'antd/lib/input/TextArea';


class AddSQLViewForm extends React.Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
            }
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };

        return (
            <Form {...formItemLayout} onSubmit={this.handleSubmit} style={{ maxWidth: 800 }}>
                <Form.Item label='Name'>
                    {getFieldDecorator('name', {
                        rules: [{
                            required: true, message: 'Please select sql view name',
                        }],
                    })(
                        <TextArea autosize={{ minRows: 1 }} />
                    )}
                </Form.Item>
                <Form.Item label='SQL Code'>
                    {getFieldDecorator('code', {
                        rules: [{
                            required: true, message: 'Please select sql view name',
                        }],
                    })(
                        <TextArea autosize={{ minRows: 8 }} />
                    )}
                </Form.Item>
                <Form.Item label='Description'>
                    {getFieldDecorator('description', {
                        rules: [{
                            required: false,
                        }],
                    })(
                        <TextArea autosize={{ minRows: 1 }} />
                    )}
                </Form.Item>
                <Form.Item {...tailFormItemLayout} style={{ marginTop: 24 }}>
                    <Button type="primary" htmlType="submit">Save</Button>
                </Form.Item>
            </Form>
        )
    }
}
const WrappedSQLViewForm = Form.create({ name: 'visit' })(AddSQLViewForm);

export default WrappedSQLViewForm