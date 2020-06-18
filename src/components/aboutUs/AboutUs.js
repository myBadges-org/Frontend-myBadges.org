import React, { Component } from 'react';

import team from './../../images/team.png'

import Container from '@material-ui/core/Container';

class AboutUs extends Component {

  componentDidMount(){
    window.scrollTo(0, 0)
  }

  render() {
    return (
      <Container>
        <div style={{display: 'flex', marginTop: '2rem', marginBottom: '2rem'}}></div>
        <div style={{backgroundColor: '#ffebce', padding: '5rem', textAlign: 'center', position: 'relative'}}>
          <h1 style={{textAlign: 'center'}}>Über uns</h1>
          <div style={{margin: '0px 10%'}}>
            <p>
              Das Projekt <b>MyBadges</b> basiert auf Vorüberlegungen zu einem offenen Badge-System, das im schulischen wie außerschulischen Kontext Einsatz finden kann sowie einer ersten technischen Machbarkeitsstudie für eine “Open Badges-Plattform”, die am Institut für Geoinformatik der Uni Münster durchgeführt wurde. Im Rahmen des Hackathons "WirFürSchule" wurde mit einem interdisziplinären Team die Projektidee entwickelt und ein erster Prototyp umgesetzt.
            </p>
          </div>
        </div>
        <div style={{display: 'flex', marginTop: '2rem', marginBottom: '2rem'}}></div>
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', flexWrap: 'wrap'}}>
          <img src={team} alt="" style={{maxWidth: '700px'}}/>
        </div>
      </Container>
    );
  };
}

export default AboutUs;
