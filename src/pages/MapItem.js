import React from 'react';
import { Row, Col } from 'antd';


class MapItem extends React.Component {
    render() {
        return (

            // <Table
            //     showHeader={false}
            //     pagination={false}
            //     columns={[{key: 'k', dataIndex: 'k'},{key: 'v', dataIndex: 'v'}]}
            //     rowKey={record => record.mapKey}
            //     dataSource={[{
            //         key: this.props.mapKey,
            //         k: this.props.mapKey,
            //         v: this.props.mapValue
            //         }]}
            // >

            <Row>
                <Col span={12}>{this.props.mapKey}</Col>
                <Col span={12}>{this.props.mapValue}</Col>
            </Row>
            // </Table>
        );
    }
}

export default MapItem;