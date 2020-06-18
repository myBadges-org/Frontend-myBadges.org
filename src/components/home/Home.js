import React, { Component } from 'react';

import Principles from './Principles';

import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

import logo from './../../images/Logo.png'
import badge from './../../images/Badge_1.png'
import badgeRed from './../../images/Badge_red.png'

import open from './../../images/open.png'
import transparent from './../../images/transparent.png'
import standard from './../../images/standard.png'
import motivating from './../../images/motivating.png'
import digital from './../../images/digital.png'
import individually from './../../images/individually.png'

const Spacer = () => <div style={{display: 'flex', marginTop: '2rem', marginBottom: '2rem'}}></div>

class Home extends Component {
  render() {
    return (
      <Container>
          <div style={{display: 'flex', flexDirection: 'row', alignSelf: 'center', marginTop: '5rem', marginBottom: '5rem', justifyContent: 'space-evenly', flexWrap: 'wrap'}}>
            <div>
              <img src={logo} alt="My Badges" style={{maxWidth: '200px', maxHeight: '200px'}}></img>
            </div>
            <div style={{alignSelf: 'center', textAlign: 'center'}}>
              <h1>My Badges</h1>
              <h3>Ein lernerzentrierter Ansatz zur Dokumentation & Feedback des Lernprozesses</h3>
            </div>
          </div>
        <Spacer></Spacer>
        <div style={{position: 'relative', paddingBottom: '56.25%', height: 0}}>
          <iframe title="My Badge" style={{position: 'absolute', top: '0', left: '0', width: '100%', height: '100%'}} src="https://www.youtube.com/embed/7VL3kqI8CxY" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen />
        </div>
        <Spacer></Spacer>

        <div style={{backgroundColor: '#ffebce', padding: '5rem', textAlign: 'center', position: 'relative'}}>
          <h1 style={{textAlign: 'center'}}>Unsere Idee</h1>
          <div style={{margin: '0px 10%'}}>
            <p>Mit Hilfe der Open Badges von Mozilla, entwickeln wir ein offenes und skalierbares Dokumentations-System, zum Nachweis von erworbenen Kompetenzen und Fähigkeiten im schulischen sowie außerschulischen Umfeld.</p>
            <p>Durch ein E-Portfolio werden die Badges kontextualisiert und die Lernleistungen dokumentiert.</p>
          </div>
          <img src={badge} alt="" style={{maxWidth: '100px', maxHeight: '100px', position: "absolute", right: '50px', top: '-50px'}}></img>
        </div>
        <Spacer></Spacer>
        <div style={{backgroundColor: '#ffebce', padding: '5rem', textAlign: 'center', position: 'relative'}}>
          <h1 style={{textAlign: 'center'}}>Unser Ansatz</h1>
          <div style={{margin: '0px 10%'}}>
            <p>Unser Feedbacksystem motiviert die Teilnehmenden mit Freude zu lernen und verhilft ihnen zu einer realistischen Selbsteinschätzung ihres eigenen Fortschritts. Gleichzeitig bietet es der Lernbegleitung Orientierung über den Leistungsstand und bildet damit eine wichtige Grundlage für die weitere didaktisch-pädagogische Planung des Lernprozesses.</p>
          </div>
          <img src={badgeRed} alt="" style={{maxWidth: '100px', maxHeight: '100px', position: "absolute", left: '50px', bottom: '-50px'}}></img>
        </div>
        <h2 style={{textAlign: 'center', marginTop: '5rem', marginBottom: '5rem'}}>Dabei baut unser Ansatz auf 6 Prinzipien auf:</h2>
        <Grid container spacing={4}>
          <Principles title='#offen' icon={open} content=' Andere Einrichtungen können das System entsprechend ihrer Bildungsangebote ausbauen und weiterentwickeln.'/>
          <Principles title='#transparent & flexibel' icon={transparent} content='Der Lernende hat Einblick über sein Portfolio und kann selbstbestimmt entscheiden, wem er welche Informationen zur Verfügung stellt.'/>
          <Principles title='#standardisiert' icon={standard} content='Durch den Zusammenschluss verschiedener Bildungsakteure wird ein Standardisierungswerkzeug geschaffen, das Orientierung bietet.'/>
          <Principles title='#motivierend' icon={motivating} content='“Portfolio & Badges” sind eine Form der Leistungsdarstellung; nicht der Bewertung. Sie fördern die Wertschätzung für die erworbenen Kompetenzen und steigern die Selbstverantwortung des Lernenden.'/>
          <Principles title='#digital & dezentral' icon={digital} content='Wir setzen auf etablierte technische Standards auf, mit denen Kompetenznachweise digital erstellt und dezentral verwaltet werden können.'/>
          <Principles title='#individuell' icon={individually} content='“Portfolio & Badges” können die individuellen Lernwege dokumentieren und fördern somit das selbstbestimmte, lebenslange Lernen.'/>
        </Grid>
        <Spacer></Spacer>
      </Container>
    );
  };
}

export default Home;
