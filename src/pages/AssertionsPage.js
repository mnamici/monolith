import React from 'react';
import { Popover } from 'antd';
import AssertionsList from './AssertionsList';
import { getMappingAssertion } from '../api/MastroApi';
import Entity from "./Entity";


export default class AssertionsPage extends React.Component {
    _isMounted = false;
    state = {
        data: null
    }

    componentDidMount() {
        this._isMounted = true;
        // console.log(this.props)
        if (this.props.current !== undefined)
            getMappingAssertion(
                this.props.ontology.name,
                this.props.ontology.version,
                this.props.mappingID,
                this.props.current,
                this.loaded)
    }

    componentWillReceiveProps(props) {
        // console.log(props)
        if (props.current !== undefined)
            getMappingAssertion(
                props.ontology.name,
                props.ontology.version,
                props.mappingID,
                props.current,
                this.loaded)
    }

    componentWillUnmount() {
        this._isMounted = false
    }

    loaded = (data) => {
        // console.log(data)
        this._isMounted && this.setState({ data: data })
    }

    render() {
        // console.log(this.state.data)
        if (this.state.data === null || this.state.data.length === 0) return null
        return (
            <div>
                <div style={{ textAlign: 'center', padding: '16px 0px 16px 0px' }}>
                    <h1><Entity entity={this.state.data[0].currentEntity} predicateType={this.state.data[0].currentEntity.entityType}/></h1>
                    <Popover content={this.state.data[0].currentEntity.entityIRI}>
                        <h3>{this.state.data[0].currentEntity.entityPrefixIRI}</h3>
                    </Popover>
                </div>


                <AssertionsList list={this.state.data} />
            </div>
        );
    }
}
