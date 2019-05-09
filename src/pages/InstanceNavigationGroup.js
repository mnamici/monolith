import React from 'react'
import { getInstancePage } from '../api/MastroApi';
import { Spin } from 'antd';
import InstanceNavigationSubjectTable from './InstanceNavigationSubjectTable';
import InstanceNavigationObjectTable from './InstanceNavigationObjectTable';
import { Link } from 'react-router-dom'

var resource;

// function renderDescription(ob) {
//     var html = ob.description !== undefined ? '' + ob.description.replace(/&lt;/g, "<").replace(/&gt;/g, ">") : '';
//     return html.replace(/<a/g, '<aa').replace(/<\/a/g, '</aa')
//         .replace(/text-decoration: underline; color:#0000ff;/g, "color:#000000;");
// }

function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = decodeURIComponent(hash[1]);
    }
    return vars;
}


function renderFormats() {
    const ar = { 'RDF/XML': '.rdf', 'N-TRIPLES': '.ntriples', 'N3/Turtle': '.n3' };//, 'TTL':'.ttl'};
    let html = []
    for (let element in ar) {
        html.push(<a href={window.location.href + ar[element]} key={element}>{element + ' '}</a>)
    };

    return (
        <div>
            {html}
        </div>
    )
}

function renderType(ob) {
    if (ob.type === undefined) return '';
    else {
        var type = <Link to={'?iri=' + encodeURIComponent(ob.type)}>{renderShortIRI(ob.type_short)}</Link>
        return type;
    }
}

function renderShortIRI(iri) {
    if (iri === 'other_types')
        return 'Other...';

    if (iri === undefined)
        return '';
    else if (iri.indexOf("http:") >= 0)
        return iri;
    else if (iri.indexOf(":") >= 0) {
        let render = iri.split(/(\w+):(.+)/g)
        return (
            <div>
                <small>{render[1]}:</small>
                {render[2]}
            </div>
        )
    }
    else return iri;
}


export default class InstanceNavigation extends React.Component {

    state = {
        data: {},
        loading: true
    }

    componentDidMount() {
        resource = getUrlVars()["iri"];
        getInstancePage(this.loaded)
    }

    componentWillReceiveProps() {
        resource = getUrlVars()["iri"];
        getInstancePage(this.loaded)
    }

    loaded = (data) => {
        this.setState({ data, loading: false })
    }

    render() {
        if (this.state.loading) return <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 36 }}> <Spin size='large' /></div>
        const ob = this.state.data.title
        var label = ob.label;
        if (label === undefined) {
            label = ob.iri_short;
        }
        return (
            <div style={{ padding: 8 }}>
                <div style={{ float: "right" }}>
                    <div id="formats">{renderFormats()}</div>
                </div>
                <h1 id="title">{label}</h1>
                <h3 id="iri">{resource}</h3>
                <h2 id="type">{renderType(ob)}</h2>

                <InstanceNavigationSubjectTable
                    subjects={this.state.data.subjects}
                    renderShortIRI={renderShortIRI} />
                <InstanceNavigationObjectTable
                    objects={this.state.data.objects}
                    renderShortIRI={renderShortIRI} />
            </div>
        )

    }
}