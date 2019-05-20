import { message } from 'antd'
import axios from 'axios';

import * as fakeData from './fakeData'

const fakeCalls = true

function manageError(err) {
    if (err.response === undefined)
        reportError('No message provided');
    else {
        reportError(err.response.data);
        if (err.response.status === 401) { localStorage.removeItem('headers'); window.location.reload() }
    }
    console.error(err)
}

function reportError(error) {
    console.error(error)
    const trace = error.stackTrace ? 'Exception in ' + error.stackTrace[0].methodName + ' ' + error.stackTrace[0].className : null
    message.error(error.message ||
        trace ||
        error)
}

export function getKnowledgeGraphs(callback) {
    if (fakeCalls) return callback(fakeData.kgs)
    const url = localStorage.getItem('mastroUrl') + '/knowledgeGraphs'
    const method = 'GET'
    axios({
        url: url,
        method: method,
        headers: JSON.parse(localStorage.getItem('headers')),
    }).then(function (response) {
        callback(response.data)
    }).catch(function (err) {
        manageError(err)
    });
}

export function postKnowledgeGraph(kg, callback) {
    if (fakeCalls) return callback(fakeData.kgs)
    const url = localStorage.getItem('mastroUrl') + '/knowledgeGraphs'
    const method = 'POST'
    axios({
        url: url,
        method: method,
        data: kg,
        headers: JSON.parse(localStorage.getItem('headers')),
    }).then(function (response) {
        callback(response.data)
    }).catch(function (err) {
        manageError(err)
    });
}

export function deleteKnowledgeGraph(kgIri, callback) {
    if (fakeCalls) return callback(fakeData.kgs)
    const url = localStorage.getItem('mastroUrl') + '/knowledgeGraph'
    const method = 'DELETE'
    axios({
        url: url,
        method: method,
        data: kgIri,
        headers: JSON.parse(localStorage.getItem('headers')),
    }).then(function (response) {
        callback(response.data)
    }).catch(function (err) {
        manageError(err)
    });
}

export function getKnowledgeGraphInfo(kgIri, callback) {
    if (fakeCalls) return callback(fakeData.kgs[0])
    const url = localStorage.getItem('mastroUrl') + '/knowledgeGraph'
    const method = 'GET'
    axios({
        url: url,
        method: method,
        headers: JSON.parse(localStorage.getItem('headers')),
        params: { iri: kgIri }
    }).then(function (response) {
        callback(response.data)
    }).catch(function (err) {
        manageError(err)
    });
}

export function patchKnowledgeGraphFile(kgFile, callback) {
    if (fakeCalls) return callback(fakeData.kgs[0])
    const url = localStorage.getItem('mastroUrl') + '/knowledgeGraph/file'
    const method = 'PATCH'
    axios({
        url: url,
        method: method,
        headers: JSON.parse(localStorage.getItem('headers')),
        data: kgFile
    }).then(function (response) {
        callback(response.data)
    }).catch(function (err) {
        manageError(err)
    });
}

export function downloadKnowledgeGraph(kgIri, format, callback) {
    if (fakeCalls) return
    const url = localStorage.getItem('mastroUrl') + '/knowledgeGraph/file'
    const method = 'GET'
    axios({
        url: url,
        method: method,
        headers: JSON.parse(localStorage.getItem('headers')),
        params: { iri: kgIri, format: format }
    }).then(function (response) {
        callback(response.data)
    }).catch(function (err) {
        manageError(err)
    });
}

export function patchKnowledgeGraphUnion(kgUnion, callback) {
    if (fakeCalls) return callback(fakeData.kgs[0])
    const url = localStorage.getItem('mastroUrl') + '/knowledgeGraph/union'
    const method = 'PATCH'
    axios({
        url: url,
        method: method,
        headers: JSON.parse(localStorage.getItem('headers')),
        data: kgUnion
    }).then(function (response) {
        callback(response.data)
    }).catch(function (err) {
        manageError(err)
    });
}

export function patchKnowledgeGraphUnionOntology(kgOntologyUnion, callback) {
    if (fakeCalls) return callback(fakeData.kgs[0])
    const url = localStorage.getItem('mastroUrl') + '/knowledgeGraph/union/ontology'
    const method = 'PATCH'
    axios({
        url: url,
        method: method,
        headers: JSON.parse(localStorage.getItem('headers')),
        data: kgOntologyUnion
    }).then(function (response) {
        callback(response.data)
    }).catch(function (err) {
        manageError(err)
    });
}

export function patchKnowledgeGraphUnionQueryOBDA(kgOBDAQueryUnion, callback) {
    if (fakeCalls) return callback(fakeData.kgs[0])
    const url = localStorage.getItem('mastroUrl') + '/knowledgeGraph/union/queryOBDA'
    const method = 'PATCH'
    axios({
        url: url,
        method: method,
        headers: JSON.parse(localStorage.getItem('headers')),
        data: kgOBDAQueryUnion
    }).then(function (response) {
        callback(response.data)
    }).catch(function (err) {
        manageError(err)
    });
}

export function patchKnowledgeGraphUnionQueryKg(kgQueryUnion, callback) {
    if (fakeCalls) return callback(fakeData.kgs[0])
    const url = localStorage.getItem('mastroUrl') + '/knowledgeGraph/union/queryKg'
    const method = 'PATCH'
    axios({
        url: url,
        method: method,
        headers: JSON.parse(localStorage.getItem('headers')),
        data: kgQueryUnion
    }).then(function (response) {
        callback(response.data)
    }).catch(function (err) {
        manageError(err)
    });
}

export function getQueryCatalogKg(kgIri, callback) {
    if (fakeCalls) return callback(fakeData.queryCatalog)
    const url = localStorage.getItem('mastroUrl') + '/knowledgeGraph/query/catalog'
    const method = 'GET'
    axios({
        url: url,
        method: method,
        params: { iri: kgIri },
        headers: JSON.parse(localStorage.getItem('headers')),
    }).then(function (response) {
        callback(response.data)
    }).catch(function (err) {
        manageError(err)
    });
}

export function downloadQueryCatalogKg(kgIri, callback) {
    if (fakeCalls) return
    const url = localStorage.getItem('mastroUrl') + '/knowledgeGraph/query/catalog/export'
    const method = 'GET'
    axios({
        url: url,
        method: method,
        params: { iri: kgIri },
        headers: JSON.parse(localStorage.getItem('headers')),
    }).then(function (response) {
        callback(response.data)
    }).catch(function (err) {
        manageError(err)
    });
}

export function uploadQueryCatalogKg(kgIri, file, callback) {
    if (fakeCalls) return callback(fakeData.queryCatalog)
    const url = localStorage.getItem('mastroUrl') + '/knowledgeGraph/query/catalog/import'
    const method = 'POST'
    axios({
        url: url,
        method: method,
        params: { iri: kgIri, additive: true },
        data: file,
        headers: JSON.parse(localStorage.getItem('headers')),
    }).then(function (response) {
        callback(response.data)
    }).catch(function (err) {
        manageError(err)
    });
}

export function postInQueryCatalog(kgIri, query, callback) {
    if (fakeCalls) return callback(fakeData.queryCatalog)
    const url = localStorage.getItem('mastroUrl') + '/knowledgeGraph/query/catalog'
    const method = 'POST'
    axios({
        url: url,
        method: method,
        params: { iri: kgIri },
        data: query,
        headers: JSON.parse(localStorage.getItem('headers')),
    }).then(function (response) {
        callback()
        if (response.data === 1)
            throw ErrorEvent()
    }).catch(function (err) {
        manageError(err)
    });
}

export function putInQueryCatalog(kgIri, query, callback, callbackError) {
    if (fakeCalls) return callback(fakeData.queryCatalog)
    const url = localStorage.getItem('mastroUrl') + '/knowledgeGraph/query/catalog' + query.queryID
    const method = 'PUT'
    axios({
        url: url,
        method: method,
        params: { iri: kgIri },
        data: query,
        headers: JSON.parse(localStorage.getItem('headers')),
    }).then(function (response) {
        callback()
        if (response.data === 1)
            throw ErrorEvent()
    }).catch(function (err) {
        callbackError()
        // manageError(err)
    });
}

export function deleteFromQueryCatalogKg(kgIri, queryID, callback) {
    if (fakeCalls) return callback(fakeData.queryCatalog)
    const url = localStorage.getItem('mastroUrl') + '/knowledgeGraph/query/catalog' + queryID
    const method = 'DELETE'
    axios({
        url: url,
        method: method,
        params: { iri: kgIri },
        headers: JSON.parse(localStorage.getItem('headers')),
    }).then(function (response) {
        callback()
        if (response.data === 1)
            throw ErrorEvent()
    }).catch(function (err) {
        manageError(err)
    });
}

export function startNewQuery(kgIri, query, callback) {
    if (fakeCalls) return callback('pippoQuery')
    const url = localStorage.getItem('mastroUrl') + '/knowledgeGraph/query/start'
    const method = 'POST'
    axios({
        url: url,
        method: method,
        params: { iri: kgIri },
        data: query,
        headers: JSON.parse(localStorage.getItem('headers')),
    }).then(function (response) {
        callback(response.data.executionId)
    }).catch(function (err) {
        manageError(err)
    });
}

export function startQuery(kgIri, queryID, callback) {
    if (fakeCalls) return callback('pippoQuery')
    const url = localStorage.getItem('mastroUrl') + '/knowledgeGraph/query/catalog/' + queryID + '/start'
    const method = 'POST'
    axios({
        url: url,
        method: method,
        params: { iri: kgIri },
        headers: JSON.parse(localStorage.getItem('headers')),
    }).then(function (response) {
        callback(response.data.executionId)
    }).catch(function (err) {
        manageError(err)
    });
}

export function getQueryStatus(kgIri, queryID, callback, errorCall) {
    if (fakeCalls) { return callback(fakeData.queryStatus()) }
    const url = localStorage.getItem('mastroUrl') + '/knowledgeGraph/query/' + queryID + '/status'
    const method = 'GET'
    axios({
        url: url,
        method: method,
        params: { iri: kgIri },
        headers: JSON.parse(localStorage.getItem('headers')),
    }).then(function (response) {
        callback(response.data)
    }).catch(function (err) {
        manageError(err)
        errorCall()
    });
}

export function getQueryResults(kgIri, executionID, page, pageSize, callback, errorCall) {
    if (fakeCalls) { return fakeData.queryResults(callback) }
    const url = localStorage.getItem('mastroUrl') + '/knowledgeGraph/query/' + executionID + '/results'
    const method = 'GET'
    axios({
        url: url,
        method: method,
        params: { iri: kgIri, pagesize: pageSize, pagenumber: page },
        headers: JSON.parse(localStorage.getItem('headers')),
    }).then(function (response) {
        callback(response.data)
    }).catch(function (err) {
        manageError(err)
        errorCall()
    });
}

export function downloadQueryResults(kgIri, executionID, callback) {
    if (fakeCalls) { return fakeData.queryResults(callback) }
    const url = localStorage.getItem('mastroUrl') + '/knowledgeGraph/query/' + executionID + '/exportFile'
    const method = 'GET'
    axios({
        url: url,
        method: method,
        params: { iri: kgIri },
        headers: JSON.parse(localStorage.getItem('headers')),
    }).then(function (response) {
        callback(response.data)
    }).catch(function (err) {
        manageError(err)
    });
}

export function getPrefixes(kgIri, callback) {
    if (fakeCalls) { return callback([]) }
    const url = localStorage.getItem('mastroUrl') + '/knowledgeGraph/prefixes'
    const method = 'GET'
    axios({
        url: url,
        params: { iri: kgIri },
        method: method,
        headers: JSON.parse(localStorage.getItem('headers')),
    }).then(function (response) {
        callback(response.data)
    }).catch(function (err) {
        manageError(err)
    });
}




export function getInstancePage(kgIri, iri, callback) {
    return callback(fakeData.instancePage)
}

export function getSubjectType(kgIri, iri, predicate, page, callback) {
    return callback(fakeData.getSubjectPredicatePageType)
}

export function getObjectType(kgIri, iri, predicate, page, callback) {
    return callback(fakeData.getObjectPredicatePageType)
}