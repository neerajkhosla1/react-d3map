import React from 'react';
import './App.css';
import Map from './Map';

class App extends React.Component {
    constructor(props) {
        super(props);
        //initial state for australia map and cities as null
        this.state = {
            data: {
                geoAusData: null,
                geoAusCities: null
            }
        };
    }

    componentDidMount() {

        Promise.all([
            fetch("https://raw.githubusercontent.com/ahebwa49/geo_mapping/master/src/world_countries.json"),
            fetch("https://raw.githubusercontent.com/AshKyd/leaflet-geojson-map-boilerplate/master/data/australia.cities.geo.json")
        ])
        .then(responses => Promise.all(responses.map(resp => resp.json())))
        .then(([geoAusData, ausCitiesData]) => {
            let geoAus = {
                features: geoAusData.features.filter((feature) => {
                    return feature.properties.name === 'Australia';
                })
            } 

            let citiesToShow = {
                features: ausCitiesData.features.filter((feature) => {
                    return feature.properties.name === 'Sydney' || feature.properties.name === 'Melbourne';
                })
            }
            //set state for australia map and cities
            this.setState({
                data: {
                    geoAusData: geoAus,
                    geoAusCities: citiesToShow
                }
            });
        })
        .catch(error => console.log(error));

    }

    render() {
        const { data } = this.state;
        return <div>{data.geoAusData && <Map data={data} />}</div>;
    }
}

export default App;
