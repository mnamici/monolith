import React from 'react'
import { Button } from 'antd'
import OntologiesList from './OntologiesList'
import OntologyVersionsList from './OntologyVersionsList'
import { getOntologies } from '../api/MastroApi'
class LoadOntologies extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 0,
            ontologyID: null,
            data: []
        };

        this.prev = this.prev.bind(this)
    }

    componentDidMount() {
        this.requestOntologies()   
    }

    requestOntologies() {
        getOntologies(this.loaded)
    }

    loaded = (data) => {
        if (data === undefined)
            data = []
        this.setState((state) => ({
            current: state.current,
            ontologyID: state.ontologyID,
            data: data
        }));
    }

    next(ontologyID) {
        const current = this.state.current + 1;
        this.setState((state) => ({
            current: current,
            ontologyID: ontologyID,
            data: state.data
        }
        ))
    }

    prev() {
        const current = this.state.current - 1;
        this.setState((state) => ({
            current: current,
            ontologyID: state.ontologyID,
            data: state.data
        }
        ))
    }

    render() {
        return (
            <div>
                {
                    this.state.current === 0 ?
                        <OntologiesList 
                            data={this.state.data} 
                            next={this.next.bind(this)} 
                            rerender={this.requestOntologies.bind(this)}
                            close={this.props.close}
                            /> :
                        <OntologyVersionsList 
                            data={this.state.data} 
                            current={this.state.ontologyID} 
                            previous={this.prev.bind(this)} 
                            rerender={this.requestOntologies.bind(this)} 
                            open={this.props.open}
                            close={this.props.close}
                            />
                }
                {
                    this.state.current > 0 && (
                        <Button style={{ marginLeft: 8 }} onClick={this.prev}>
                            Previous
                        </Button>
                    )
                }
            </div>);
    }
}

export default LoadOntologies;