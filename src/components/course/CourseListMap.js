import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Map, Marker, Popup, Circle, CircleMarker, FeatureGroup , TileLayer } from 'react-leaflet';



export class CourseListMap extends Component {

  // https://stackoverflow.com/questions/53601692/fit-map-to-feature-layer-bounds-in-react-leaflet
  onFeatureGroupAdd = (e) => {
    this.refMap.leafletElement.fitBounds(e.target.getBounds());
  }

  render(){
    return(
      <div>
        {!this.props.online ?
          <Map ref={(refElement) => {this.refMap = refElement}} center={[51.9606649, 7.6261347]} zoom={13} style={{with: '100%', height: '300px', marginBottom: '20px', borderRadius: '4px'}}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            />
            {(this.props.courses && this.props.courses.length) > 0 || this.props.coordinates ?
              <FeatureGroup onAdd={this.onFeatureGroupAdd}>
                {this.props.courses.map(course => (
                  course.coordinates ?
                    <Marker key={course._id} position={[course.coordinates.coordinates[1], course.coordinates.coordinates[0]]}>
                      <Popup>{course.name}</Popup>
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
        : null}
      </div>
    );
  }
}

CourseListMap.propTypes = {
  courses: PropTypes.array
};

const mapStateToProps = state => ({
  courses: state.course.courses,
  coordinates: state.course.params.coordinates,
  address: state.course.params.address,
  radius: state.course.params.radius,
  online: state.course.params.online
});

export default connect(mapStateToProps, null)(CourseListMap);
