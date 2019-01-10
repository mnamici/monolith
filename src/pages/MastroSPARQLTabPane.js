import React from 'react';
import { Switch, Button, Progress } from 'antd';
import YASQE from 'yasgui-yasqe'
import '../css/yasqe.min.css'
import { Input } from 'antd';
// import Results from './ResultsInfiniteList';
// import Results from './ResultsGriddle';
import Results from './ResultsTable'
import QueryExecutionReport from './QueryExecutionReport';

const { TextArea } = Input;

const status = {
    status: 'Running',
    percentage: 82,
    numOntologyRewritings: 2,
    numHighLevelQueries: 133,
    numOptimizedQueries: 21,
    numLowLevelQueries: 21,
    executionTime: 1248,
    numResults: 1204871245097
}

class MastroSPARQLTabPane extends React.Component {
    state = {
        current: 'info',
    }

    handleClick = (e) => {
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
    }

    componentDidMount() {
        this.yasqe = YASQE(document.getElementById('sparql'),
            {
                // Disable share link
                createShareLink: null,
                sparql: {
                    // Disable query execution button
                    showQueryButton: false
                }
            });
        this.yasqe.refresh();
    }

    componentDidUpdate() {
        this.yasqe.refresh();
    }
    render() {

        return (
            <div>
                <div>
                    <Button>Run</Button>
                    <Button>Stop</Button>
                    <Button>Store in catalog</Button>
                    <Switch defaultChecked />
                </div>
                <Progress percent={status.percentage} />
                <div id="sparql" />
                <TextArea placeholder="Description" autosize />
                <p>{status.numResults} results</p>
                <Results />
                <QueryExecutionReport />
            </div>
        );
    }
}


export default MastroSPARQLTabPane;