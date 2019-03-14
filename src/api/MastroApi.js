import { message } from 'antd'
import axios from 'axios';

import * as fakeData from './fakeData'
import { graphol } from './ACIOpenData'

const ips = ['192.168.0.59', '192.168.0.15']
var mastroUrl = 'http://' + ips[0] + ':8080/mws/rest/mwsx'
// mastroUrl = '/mws/rest/mwsx'

const fakeCalls = true

function reportError(msg) {
    console.error(msg)
    message.error(msg)
}

export function login(username, password, callback) {
    if (fakeCalls) {
        if (username === 'santaroni' && password === 'ronconelli') {
            const h = {
                'Access-Control-Allow-Origin': '*',
                // 'Authorization': 'Basic ' + btoa(username + ':' + password)
            }
            localStorage.setItem('headers', JSON.stringify(h))
            return callback();
        }
        else {
            reportError('Wrong username or password');
            return;
        }
    }
    const url = mastroUrl + '/login'
    const method = 'GET'
    const h = {
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'Basic ' + btoa(username + ':' + password)
    }
    axios({
        url: url,
        method: method,
        headers: h,
    }).then(function (response) {
        switch (response.status) {
            case 200:
                localStorage.setItem('headers',
                    JSON.stringify({
                        'Access-Control-Allow-Origin': '*',
                        'x-monolith-session-id': response.headers['x-monolith-session-id']
                    }))
                localStorage.setItem('username', username)
                callback(response.data)
                break;
            case 401:
                reportError('Wrong username or password');
                break;
            default:
                reportError('Error calling ' + method + ' ' + url);
        }


    }).catch(function (err) {
        if (err.response === undefined) reportError('Error calling ' + method + ' ' + url);
        else switch (err.response.status) {
            case 401:
                reportError('Wrong username or password');
                break;
            default:
                reportError('Error calling ' + method + ' ' + url);
                console.error(err)
        }

    });
}

export function getOntologies(callback) {
    if (fakeCalls) return callback(fakeData.fakeDataGO);
    const url = mastroUrl + '/owlOntology'
    const method = 'GET'
    axios({
        url: url,
        method: method,
        headers: JSON.parse(localStorage.getItem('headers')),
    }).then(function (response) {
        callback(response.data)
    }).catch(function (err) {
        reportError('Error calling ' + method + ' ' + url);
        console.error(err)
    });
}

export function putOntology(ontology, callback) {
    if (fakeCalls) return callback();
    const url = mastroUrl + '/owlOntology'
    const method = 'POST'
    axios({
        url: url,
        method: method,
        data: ontology,
        headers: JSON.parse(localStorage.getItem('headers')),
    }).then(function (response) {
        callback(response.data)
    }).catch(function (err) {
        reportError('Error calling ' + method + ' ' + url);
        console.error(err)
    });
}

export function deleteOntology(ontologyID, callback) {
    if (fakeCalls) return callback();
    const url = mastroUrl + '/owlOntology/' + ontologyID
    const method = 'DELETE'
    axios({
        url: url,
        method: method,
        headers: JSON.parse(localStorage.getItem('headers')),
    }).then(function (response) {
        callback()
    }).catch(function (err) {
        reportError('Error calling ' + method + ' ' + url);
        console.error(err)
    });
}

export function deleteOntologyVersion(ontologyID, version, callback) {
    if (fakeCalls) return callback();
    const url = mastroUrl + '/owlOntology/' + ontologyID + '/version'
    const method = 'DELETE'
    axios({
        url: url,
        method: method,
        data: version,
        headers: JSON.parse(localStorage.getItem('headers'))
    }).then(function (response) {
        callback()
    }).catch(function (err) {
        reportError('Error calling ' + method + ' ' + url);
        console.error(err)
    });
}

export function uploadOntologyFile(file, ontologyID, callback) {
    if (fakeCalls) return callback(true);
    const url = mastroUrl + '/owlOntology/' + ontologyID
    const method = 'POST'
    axios({
        url: url,
        method: method,
        data: file,
        headers: JSON.parse(localStorage.getItem('headers')),
    }).then(function (response) {
        callback(true)
    }).catch(function (err) {
        callback(false)
        reportError('Error calling ' + method + ' ' + url);
        console.error(err)
    });
}

export function downloadOntologyFile(name, version, callback) {
    if (fakeCalls) { console.log(name, version, callback); return }
    const url = mastroUrl + '/owlOntology/' + name + '/version'
    const method = 'GET'
    const encodedVersion = version//encodeURIComponent(version)
    axios({
        url: url,
        method: method,
        params: { version: encodedVersion },
        headers: JSON.parse(localStorage.getItem('headers')),
    }).then(function (response) {
        callback(response.data)
    }).catch(function (err) {
        callback(false)
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
        headers: JSON.parse(localStorage.getItem('headers')),
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
        headers: JSON.parse(localStorage.getItem('headers')),
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
        headers: JSON.parse(localStorage.getItem('headers')),
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
        headers: JSON.parse(localStorage.getItem('headers')),
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
        headers: JSON.parse(localStorage.getItem('headers')),
    }).then(function (response) {
        callback(response.data)
    }).catch(function (err) {
        reportError('Error calling ' + method + ' ' + url);
        console.error(err)
    });
}

export function getMappings(name, version, callback) {
    if (fakeCalls) return callback(fakeData.mappings)
    const url = mastroUrl + '/owlOntology/' + name + '/version/mapping'
    const method = 'GET'
    const encodedVersion = version//encodeURIComponent(version)
    axios({
        url: url,
        method: method,
        params: { version: encodedVersion },
        headers: JSON.parse(localStorage.getItem('headers')),
    }).then(function (response) {
        callback(response.data)
    }).catch(function (err) {
        reportError('Error calling ' + method + ' ' + url);
        console.error(err)
    });
}

export function uploadMappingFile(name, version, file, callback) {
    if (fakeCalls) return callback(true);
    const url = mastroUrl + '/owlOntology/' + name + '/version/mapping'
    const method = 'POST'
    const encodedVersion = version//encodeURIComponent(version)
    axios({
        url: url,
        method: method,
        params: { version: encodedVersion },
        data: file,
        headers: JSON.parse(localStorage.getItem('headers')),
    }).then(function (response) {
        callback(true)
    }).catch(function (err) {
        callback(false)
        reportError('Error calling ' + method + ' ' + url);
        console.error(err)
    });
}

export function downloadMappingFile(name, version, mapping, callback) {
    if (fakeCalls) { console.log(name, version, mapping, callback); return }
    const url = mastroUrl + '/owlOntology/' + name + '/version/mapping/' + mapping
    const method = 'GET'
    const encodedVersion = version//encodeURIComponent(version)
    axios({
        url: url,
        method: method,
        params: { version: encodedVersion },
        headers: JSON.parse(localStorage.getItem('headers')),
    }).then(function (response) {
        callback(response.data)
    }).catch(function (err) {
        reportError('Error calling ' + method + ' ' + url);
        console.error(err)
    });
}

export function deleteMappingFile(name, version, mapping, callback) {
    if (fakeCalls) return callback();
    const url = mastroUrl + '/owlOntology/' + name + '/version/mapping/' + mapping
    const method = 'DELETE'
    const encodedVersion = version//encodeURIComponent(version)
    axios({
        url: url,
        method: method,
        params: { version: encodedVersion },
        headers: JSON.parse(localStorage.getItem('headers')),
    }).then(function (response) {
        callback(response.data)
    }).catch(function (err) {
        reportError('Error calling ' + method + ' ' + url);
        console.error(err)
    });
}

export function getMappingInfo(name, version, mapping, callback) {
    if (fakeCalls) return callback(fakeData.mappingInfo)
    const url = mastroUrl + '/owlOntology/' + name + '/version/mapping/' + mapping + '/info'
    const method = 'GET'
    const encodedVersion = version//encodeURIComponent(version)
    axios({
        url: url,
        method: method,
        params: { version: encodedVersion },
        headers: JSON.parse(localStorage.getItem('headers')),
    }).then(function (response) {
        callback(response.data)
    }).catch(function (err) {
        reportError('Error calling ' + method + ' ' + url);
        console.error(err)
    });
}

export function getMappingAssertion(name, version, mapping, entityID, callback) {
    // console.log("MASTRO CALL " + entityID)
    if (fakeCalls) return callback(fakeData.assertions)
    const url = mastroUrl + '/owlOntology/' + name + '/version/mapping/' + mapping + '/assertions/' + entityID
    const method = 'GET'
    const encodedVersion = version//encodeURIComponent(version)
    axios({
        url: url,
        method: method,
        params: { version: encodedVersion },
        headers: JSON.parse(localStorage.getItem('headers')),
    }).then(function (response) {
        callback(response.data)
    }).catch(function (err) {
        reportError('Error calling ' + method + ' ' + url);
        console.error(err)
    });
}

export function getMappingViews(name, version, mapping, callback) {
    if (fakeCalls) return callback(fakeData.sqlViews)
    const url = mastroUrl + '/owlOntology/' + name + '/version/mapping/' + mapping + '/views'
    const method = 'GET'
    const encodedVersion = version//encodeURIComponent(version)
    axios({
        url: url,
        method: method,
        params: { version: encodedVersion },
        headers: JSON.parse(localStorage.getItem('headers')),
    }).then(function (response) {
        callback(response.data.sqlViews)
    }).catch(function (err) {
        reportError('Error calling ' + method + ' ' + url);
        console.error(err)
    });
}

export function getMappingView(name, version, mapping, viewID, callback) {
    console.log(name, version, mapping, viewID, callback)
    if (fakeCalls) return callback(fakeData.sqlView)
    const url = mastroUrl + '/owlOntology/' + name + '/version/mapping/' + mapping + '/views/' + viewID
    const method = 'GET'
    const encodedVersion = version//encodeURIComponent(version)
    axios({
        url: url,
        method: method,
        params: { version: encodedVersion },
        headers: JSON.parse(localStorage.getItem('headers')),
    }).then(function (response) {
        callback(response.data)
    }).catch(function (err) {
        reportError('Error calling ' + method + ' ' + url);
        console.error(err)
    });
}

export function getQueryCatalog(name, version, callback) {
    if (fakeCalls) return callback(fakeData.queryCatalog)
    const url = mastroUrl + '/owlOntology/' + name + '/version/querycatalog'
    const method = 'GET'
    const encodedVersion = version//encodeURIComponent(version)
    axios({
        url: url,
        method: method,
        params: { version: encodedVersion },
        headers: JSON.parse(localStorage.getItem('headers')),
    }).then(function (response) {
        callback()
        if (response.data === 1)
            throw ErrorEvent()
    }).catch(function (err) {
        reportError('Error calling ' + method + ' ' + url);
        console.error(err)
    });
}

export function putInQueryCatalog(name, version, query, callback) {
    if (fakeCalls) return callback(fakeData.queryCatalog)
    const url = mastroUrl + '/owlOntology/' + name + '/version/querycatalog'
    const method = 'GET'
    const encodedVersion = version//encodeURIComponent(version)
    axios({
        url: url,
        method: method,
        params: { version: encodedVersion },
        data: query,
        headers: JSON.parse(localStorage.getItem('headers')),
    }).then(function (response) {
        callback()
        if (response.data === 1)
            throw ErrorEvent()
    }).catch(function (err) {
        reportError('Error calling ' + method + ' ' + url);
        console.error(err)
    });
}

export function startMastro(name, version, mapping, callback) {
    if (fakeCalls) return callback()
    const url = mastroUrl + '/owlOntology/' + name + '/version/mapping/' + mapping + '/instance'
    const method = 'POST'
    const encodedVersion = version//encodeURIComponent(version)
    axios({
        url: url,
        method: method,
        data: encodedVersion,
        headers: JSON.parse(localStorage.getItem('headers')),
    }).then(function (response) {
        callback()
        if (response.data === 1)
            throw ErrorEvent()
    }).catch(function (err) {
        reportError('Error calling ' + method + ' ' + url);
        console.error(err)
    });
}

var fakeInit = 0;
export function getMastroStatus(name, version, mapping, callback) {
    if (fakeCalls) {
        const status = {
            status: fakeInit === 3 ? 'RUNNING' : 'LOADING'
        }
        fakeInit++;
        if (fakeInit > 3) fakeInit = 0;
        return callback(status)
    }
    const url = mastroUrl + '/owlOntology/' + name + '/version/mapping/' + mapping + '/instance'
    const method = 'GET'
    const encodedVersion = version//encodeURIComponent(version)
    axios({
        url: url,
        method: method,
        params: { version: encodedVersion },
        headers: JSON.parse(localStorage.getItem('headers')),
    }).then(function (response) {
        callback(response.data)
    }).catch(function (err) {
        reportError('Error calling ' + method + ' ' + url);
        console.error(err)
    });
}

export function startNewQuery(name, version, mapping, query, callback) {
    if (fakeCalls) return callback('pippoQuery')
    const url = mastroUrl + '/owlOntology/' + name + '/version/mapping/' + mapping + '/query/start'
    const method = 'POST'
    const encodedVersion = version//encodeURIComponent(version)
    axios({
        url: url,
        method: method,
        params: { version: encodedVersion },
        data: query,
        headers: JSON.parse(localStorage.getItem('headers')),
    }).then(function (response) {
        callback(response.data.executionId)
    }).catch(function (err) {
        reportError('Error calling ' + method + ' ' + url);
        console.error(err)
    });
}

export function startQuery(name, version, mapping, queryID, callback) {
    if (fakeCalls) return callback('pippoQuery')
    const url = mastroUrl + '/owlOntology/' + name + '/version/mapping/' + mapping + '/query/' + queryID + '/start'
    const method = 'POST'
    const encodedVersion = version//encodeURIComponent(version)
    axios({
        url: url,
        method: method,
        data: encodedVersion,
        headers: JSON.parse(localStorage.getItem('headers')),
    }).then(function (response) {
        callback(response.data.executionId)
    }).catch(function (err) {
        reportError('Error calling ' + method + ' ' + url);
        console.error(err)
    });
}

export function getQueryStatus(name, version, mapping, queryID, callback) {
    if (fakeCalls) {
        const status = {
            status: 'Running',
            percentage: fakeInit === 3 ? 100 : fakeInit * 33,
            numOntologyRewritings: 2,
            numHighLevelQueries: 133,
            numOptimizedQueries: 21,
            numLowLevelQueries: 21,
            executionTime: 1248,
            numResults: 1204871245097
        }
        fakeInit++;
        if (fakeInit > 3) fakeInit = 0;
        return callback(status)
    }
    const url = mastroUrl + '/owlOntology/' + name + '/version/mapping/' + mapping + '/query/' + queryID + '/status'
    const method = 'GET'
    const encodedVersion = version//encodeURIComponent(version)
    axios({
        url: url,
        method: method,
        params: { version: encodedVersion },
        headers: JSON.parse(localStorage.getItem('headers')),
    }).then(function (response) {
        callback(response.data)
    }).catch(function (err) {
        reportError('Error calling ' + method + ' ' + url);
        console.error(err)
    });


}
// simulate results loading
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function sleepFunc(callback) {
    await sleep(2000);
    callback(fakeData.results)
}


export function getQueryResults(name, version, mapping, executionID, page, callback) {
    console.log(name, version, mapping, executionID, page, callback)
    if (fakeCalls) {
        return sleepFunc(callback)
    }
}