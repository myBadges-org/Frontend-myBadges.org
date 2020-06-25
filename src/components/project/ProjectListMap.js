import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Map, Marker, Popup, Circle, CircleMarker, FeatureGroup , TileLayer } from 'react-leaflet';



export class ProjectListMap extends Component {

  // https://stackoverflow.com/questions/53601692/fit-map-to-feature-layer-bounds-in-react-leaflet
  onFeatureGroupAdd = (e) => {
    this.refMap.leafletElement.fitBounds(e.target.getBounds());
  }

  render(){
    const isProjectLocated = this.props.projects ? this.props.projects.filter(project => project.coordinates).length > 0 : false;
    return(
        isProjectLocated ?
          <Map ref={(refElement) => {this.refMap = refElement}} center={[51.9606649, 7.6261347]} zoom={13} style={{width: '100%', height: '300px', marginBottom: '20px', borderRadius: '4px'}}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            />
            {(this.props.projects && this.props.projects.length) > 0 || this.props.coordinates ?
              <FeatureGroup onAdd={this.onFeatureGroupAdd}>
                {this.props.projects.map(project => (
                  project.coordinates ?
                    <Marker key={project._id} position={[project.coordinates.coordinates[1], project.coordinates.coordinates[0]]}>
                      <Popup>{project.name}</Popup>
                    </Marker>
                  : null
                ))}
                {this.props.coordinates ?
                  <div>
                    <Circle center={[this.props.coordinates[1], this.props.coordinates[0]]} color="red" fillColor="red" radius={this.props.radius * 1000}>
                      <Popup>Filtergebiet mit einem Radius von {this.props.radius} km.</Popup>
                    </Circle>
                    <CircleMarker center={[this.props.coordinates[1], this.props.coordinates[0]]} color="darkred">
                      <Popup>{this.props.address}</Popup>
                    </CircleMarker>
                  </div>
                : null}
              </FeatureGroup >
            : null}
          </Map>
        : null
    );
  }
}

ProjectListMap.propTypes = {
  projects: PropTypes.array
};

const mapStateToProps = state => ({
  projects: state.project.projects,
  coordinates: state.project.params.coordinates,
  address: state.project.params.address,
  radius: state.project.params.radius,
  online: state.project.params.online
});

export default connect(mapStateToProps, null)(ProjectListMap);
