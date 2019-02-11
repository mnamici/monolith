import { message } from 'antd'
import axios from 'axios';

import * as fakeData from './fakeData'
import { graphol } from './ACIOpenData'

const ips = ['192.168.0.59', '82.48.138.112']
var mastroUrl = 'http://' + ips[0] + ':8080/mws/rest/mwsx'
// mastroUrl = '/mws/rest/mwsx'
const headers = {
    'Access-Control-Allow-Origin': '*',
    'Authorization': 'Basic bWFzdHJvOmRhc2lsYWI=',
}


const fakeCalls = true

function reportError(msg) {
    console.error(msg)
    message.error(msg)
}

export function getOntologies(callback) {
    if (fakeCalls) return callback(fakeData.fakeDataGO);
    const url = mastroUrl + '/owlOntology'
    const method = 'GET'
    axios({
        url: url,
        method: method,
        headers: headers,
    }).then(function (response) {
        callback(response.data)
    }).catch(function (err) {
        reportError('Error calling ' + method + ' ' + url);
        console.error(err)
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
        reportError('Error calling ' + method + ' ' + url);
        console.error(err)
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
        callback()
    }).catch(function (err) {
        reportError('Error calling ' + method + ' ' + url);
        console.error(err)
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
        callback()
    }).catch(function (err) {
        reportError('Error calling ' + method + ' ' + url);
        console.error(err)
    });
}

export function uploadOntologyFile(file, ontologyID, callback) {
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
        reportError('Error calling ' + method + ' ' + url);
        console.error(err)
    });
}

export function getOntologyVersionInfo(name, version, callback) {
    if (fakeCalls) return callback(fakeData.fakeDataOI);
    const url = mastroUrl + '/owlOntology/' + name + '/version/info'
    const method = 'GET'
    const encodedVersion = version//encodeURIComponent(version)
    axios({
        url: url,
        method: method,
        params: { version: encodedVersion },
        headers: headers,
    }).then(function (response) {
        callback(response.data)
    }).catch(function (err) {
        reportError('Error calling ' + method + ' ' + url);
        console.error(err)
    });
}

export function getOntologyVersionHierarchy(name, version, callback) {
    if (fakeCalls) return callback(fakeData.mastroData)
    const url = mastroUrl + '/owlOntology/' + name + '/version/hierarchy'
    const method = 'GET'
    const encodedVersion = version//encodeURIComponent(version)
    axios({
        url: url,
        method: method,
        params: { version: encodedVersion },
        headers: headers,
    }).then(function (response) {
        callback(response.data)
    }).catch(function (err) {
        reportError('Error calling ' + method + ' ' + url);
        console.error(err)
    });
}

export function getGraphol(callback) {
    if (fakeCalls) return callback(graphol)
}

export function getClassPage(name, version, classID, callback) {
    // console.log(name, version, classID)
    if (fakeCalls) return callback(fakeData.classData)
    const url = mastroUrl + '/owlOntology/' + name + '/version/alphabet/class/' + classID + '/logical'
    const method = 'GET'
    const encodedVersion = version//encodeURIComponent(version)
    axios({
        url: url,
        method: method,
        params: { version: encodedVersion },
        headers: headers,
    }).then(function (response) {
        callback(response.data)
    }).catch(function (err) {
        reportError('Error calling ' + method + ' ' + url);
        console.error(err)
    });
}

export function getObjectPropertyPage(name, version, objectPropertyID, callback) {
    if (fakeCalls) return callback({})
    const url = mastroUrl + '/owlOntology/' + name + '/version/alphabet/objectProperty/' + objectPropertyID + '/logical'
    const method = 'GET'
    const encodedVersion = version//encodeURIComponent(version)
    axios({
        url: url,
        method: method,
        params: { version: encodedVersion },
        headers: headers,
    }).then(function (response) {
        callback(response.data)
    }).catch(function (err) {
        reportError('Error calling ' + method + ' ' + url);
        console.error(err)
    });
}

export function getDataPropertyPage(name, version, dataPropertyID, callback) {
    if (fakeCalls) return callback({})
    const url = mastroUrl + '/owlOntology/' + name + '/version/alphabet/dataProperty/' + dataPropertyID + '/logical'
    const method = 'GET'
    const encodedVersion = version//encodeURIComponent(version)
    axios({
        url: url,
        method: method,
        params: { version: encodedVersion },
        headers: headers,
    }).then(function (response) {
        callback(response.data)
    }).catch(function (err) {
        reportError('Error calling ' + method + ' ' + url);
        console.error(err)
    });
}

export function getMappings(name, version, callback) {
    if(fakeCalls) return callback(fakeData.mappings)
    const url = mastroUrl + '/owlOntology/' + name + '/version/mapping'
    const method = 'GET'
    const encodedVersion = version//encodeURIComponent(version)
    axios({
        url: url,
        method: method,
        params: { version: encodedVersion },
        headers: headers,
    }).then(function (response) {
        callback(response.data)
    }).catch(function (err) {
        reportError('Error calling ' + method + ' ' + url);
        console.error(err)
    });
}

export function uploadMappingFile(name, version, file, callback) {
    const url = mastroUrl + '/owlOntology/' + name + '/version/mapping'
    const method = 'PUT'
    const encodedVersion = version//encodeURIComponent(version)
    axios({
        url: url,
        method: method,
        params: { version: encodedVersion },
        data: file,
        headers: headers,
    }).then(function (response) {
        callback(response.data)
    }).catch(function (err) {
        reportError('Error calling ' + method + ' ' + url);
        console.error(err)
    });
}

export function deleteMappingFile(name, version, mapping, callback) {
    const url = mastroUrl + '/owlOntology/' + name + '/version/mapping/'+ mapping
    const method = 'DELETE'
    const encodedVersion = version//encodeURIComponent(version)
    axios({
        url: url,
        method: method,
        params: { version: encodedVersion },
        headers: headers,
    }).then(function (response) {
        callback(response.data)
    }).catch(function (err) {
        reportError('Error calling ' + method + ' ' + url);
        console.error(err)
    });
}