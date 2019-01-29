import { message } from 'antd'
import axios from 'axios';

const mastroUrl = 'http://192.168.0.59:8080/mws/rest/mwsx'
const headers = {
    'Authorization': 'Basic bWFzdHJvOmRhc2lsYWI='
}

function reportError(msg) {
    console.error(msg)
    message.error(msg)
}

export function getOntologies(callback) {
    const url = mastroUrl + '/owlOntology'
    const method = 'GET'
    axios({
        url: url,
        method: method,
        headers: headers,
    }).then(function (response) {
        callback(response.data)
    }).catch(function (err) {
        reportError('Error calling ' + method + ' ' + url)
    });
}

export function putOntology(ontology, callback) {
    const url = mastroUrl + '/owlOntology'
    const method = 'PUT'
    axios({
        url: url,
        method: method,
        data: ontology,
        headers: headers,
    }).then(function (response) {
        callback(response.data)
    }).catch(function (err) {
        reportError('Error calling ' + method + ' ' + url)
    });
}

export function deleteOntology(ontologyID, callback) {
    const url = mastroUrl + '/owlOntology/' + ontologyID
    const method = 'DELETE'
    axios({
        url: url,
        method: method,
        headers: headers,
    }).then(function (response) {
        callback(response.data)
    }).catch(function (err) {
        reportError('Error calling ' + method + ' ' + url)
    });
}

export function deleteOntologyVersion(ontologyID, version, callback) {
    const url = mastroUrl + '/owlOntology/' + ontologyID + '/version'
    const method = 'DELETE'
    axios({
        url: url,
        method: method,
        data: version,
        headers: headers
    }).then(function (response) {
        callback(response.data)
    }).catch(function (err) {
        reportError('Error calling ' + method + ' ' + url)
    });
}

export function uploadFile(file, ontologyID, callback) {
    const url = mastroUrl + '/owlOntology/' + ontologyID
    const method = 'PUT'
    axios({
        url: url,
        method: method,
        data: file,
        headers: headers,
    }).then(function (response) {
        callback(response.data)
    }).catch(function (err) {
        reportError('Error calling ' + method + ' ' + url)
    });
}

export function getOntologyVersionInfo(name, version, callback) {
    const url = mastroUrl + '/owlOntology/' + name + '/version/info'
    const method = 'GET'
    const encodedVersion = version//encodeURIComponent(version)
    axios({
        url: url,
        method: method,
        params: {version: encodedVersion},
        headers: headers,
    }).then(function (response) {
        callback(response.data)
    }).catch(function (err) {
        reportError('Error calling ' + method + ' ' + url)
    });
}
