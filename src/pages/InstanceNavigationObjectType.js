import React from 'react'
import { Link } from 'react-router-dom'
import { getObjectType } from '../api/MastroApi';
import { Spin } from 'antd';


export default class InstanceNavigationObjectType extends React.Component {
    state = {
        data: {},
        loading: true,
        page: 0
    }

    componentDidMount() {
        // this.props.predicate
        // this.props.type
        getObjectType(this.loaded)
    }

    loaded = (data) => {
        this.setState({ data, loading: false })
    }

    nextPage = () => {
        this.setState({ page: this.state.page + 1 })
    }

    previousPage = () => {
        this.setState({ page: this.state.page - 1 })
    }

    render() {
        if (this.state.loading) return <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 36 }}> <Spin size='large' /></div>
        const obj = this.state.data
        const pages = this.props.pages

        var values = [];
        for (var j = 0; j < obj.object_triples[0].subjects.length; j++) {
            var iri = obj.object_triples[0].subjects[j].subject_resource;//.replace(iriSie,local);
            var label = obj.object_triples[0].subjects[j].subject_label;
            values.push(
                <li key={j}>
                    <Link to={'?iri=' + encodeURIComponent(iri)}>
                        {this.props.renderShortIRI(obj.object_triples[0].subjects[j].subject_resource_short)}
                    </Link>
                    {label !== undefined && <div>
                        <font>&#8618; </font>
                        <small>{label}</small>
                    </div>}
                </li>
            )
        }

        return (
            <div>
                {pages > 1 && <div style={{ float: 'right' }}>
                    {this.state.page !== 0 && <button className="ant-btn" onClick={this.previousPage}>&lt;</button>}
                    {<button className="ant-btn" style={pages > this.state.page + 1 ? {} : { visibility: 'hidden' }} onClick={this.nextPage}>&gt;</button>}
                    <br /><small style={{float: 'right'}}>{this.state.page + 1} of {pages}</small>
                </div>}
                <ul>
                    {values}
                </ul>
            </div>
        )
    }
}