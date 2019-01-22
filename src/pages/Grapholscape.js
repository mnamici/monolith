import React from 'react'
import GrapholScape from '../lib/grapholscape/dist/grapholscape.js'
import {toggle, search} from '../lib/grapholscape/dist/grapholscape.js'
import '../lib/grapholscape/style/style.css'
import '../lib/material-icons/MaterialIcons.css'

const request = require('ajax-request')




class Graphol extends React.Component {
    componentDidMount() {
        request({
            url: 'http://192.168.0.152/LOD_ACI/sites/default/files/ACIOpenData.graphol',
            method: 'GET'
        }, function (err, res, body) {
            var graph = new GrapholScape(null, document.getElementById('grapholscape-container'), body);
            // Check if initialDiagram is defined, and if so try to switch to it
            var selectedDiagram = graph.getDiagramName(0);
            graph.drawDiagram(selectedDiagram);
            let btns = document.getElementsByClassName('module_button')            
            for(let i=0;i<btns.length;i++) {
                let btn = btns.item(i)
                btn.onclick = () => toggle(btn) 
            }
            btns = document.getElementsByClassName('bottom_button')            
            for(let i=0;i<btns.length;i++) {
                let btn = btns.item(i)
                btn.onclick = () => toggle(btn) 
            }

            let input = document.getElementById("search")
            input.onkeyup = () => search(input.value)
        });

    }

    render() {
        return (
            <div>
                <div id="grapholscape-container" style={{position: "relative",height: "90vh"}}/>
            </div>
        )
    }
}

export default Graphol;