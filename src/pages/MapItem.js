import React from 'react';
import { Row, Col } from 'antd';


class MapItem extends React.Component {
    render() {
        return (
            <Row>
                <Col span={12}>{this.props.mapKey}</Col>
                <Col span={12}>{this.props.mapValue}</Col>
            </Row>
        );
    }
}

export default MapItem;