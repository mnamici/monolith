import React from 'react';
import UploadFile from './UploadFile';

export default class ImportKnowledgeGraph extends React.Component {
    render() {
        return (
            <div style={{ padding: 8 }}>
                <UploadFile type='kg' current={this.props.kg} />
            </div>
        )
    }
}