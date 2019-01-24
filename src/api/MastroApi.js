import {message} from 'antd'
const request = require('ajax-request');

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
    request({
        url: url,
        method: method,
        headers: headers,
        json: true
    }, function (err, res, body) {
        if (err) {
            reportError('Error calling ' + method + ' ' + url)
        }
        else
            callback(body)
    });
}

export function putOntology(ontology, callback) {
    const url = mastroUrl + '/owlOntology'
    const method = 'PUT'
    request({
        url: url,
        method: method,
        data: ontology,
        headers: headers,
        json: true
    }, function (err, res, body) {
        if (err) {
            reportError('Error calling ' + method + ' ' + url)
        }
        else
            callback(body)
    });
}

export function deleteOntology(ontologyID, callback) {
    const url = mastroUrl + '/owlOntology/' + ontologyID
    const method = 'DELETE'
    request({
        url: url,
        method: method,
        headers: headers,
        json: true
    }, function (err, res, body) {
        if (err) {
            reportError('Error calling ' + method + ' ' + url)
        }
        else
            callback(body)
    });
}

export function uploadFile(file, ontologyID, callback) {
    const url = mastroUrl + '/owlOntology/'+ontologyID
    const method = 'PUT'
    request({
        url: url,
        method: method,
        data: file,
        headers: headers,
    }, function (err, res, body) {
        if (err) {
            reportError('Error calling ' + method + ' ' + url)
        }
        else
            callback(body)

    });
}