import React, { Component } from 'react';

import Principles from './Principles';
import open from './icon_offen.svg';
import transparent from './icon_transparent.svg';
import standard from './icon_standard.svg';
import individual from './icon_individual.svg';
import motivation from './icon_motivation.svg';
import decentral from './icon_decentral.svg';

import Grid from '@material-ui/core/Grid';


class Home extends Component {
  render() {
    return (
      <div style={{margin: '0px 24px'}}>
        <h1 style={{textAlign: 'center'}}>Unsere Idee</h1>
        <div style={{backgroundColor: '#f0f0f0', padding: '15px', margin: '0 -24px', textAlign: 'center'}}>
          <div style={{margin: '0px 10%'}}>
            <p>Mit Hilfe der Open Badges von Mozilla, entwickeln wir ein offenes und skalierbares Dokumentations-System, zum Nachweis von erworbenen Kompetenzen und Fähigkeiten im schulischen sowie außerschulischen Umfeld.</p>
            <p>Durch ein E-Portfolio werden die Badges kontextualisiert und die Lernleistungen dokumentiert.</p>
          </div>
        </div>
        <h1 style={{textAlign: 'center', marginTop: '50px'}}>Unser Ansatz</h1>
        <div style={{backgroundColor: '#f0f0f0', padding: '15px', margin: '0 -24px', textAlign: 'center'}}>
          <div style={{margin: '0px 10%'}}>
            <p>Unser Feedbacksystem motiviert die Teilnehmenden mit Freude zu lernen und verhilft ihnen zu einer realistischen Selbsteinschätzung ihres eigenen Fortschritts. Gleichzeitig bietet es der Lernbegleitung Orientierung über den Leistungsstand und bildet damit eine wichtige Grundlage für die weitere didaktisch-pädagogische Planung des Lernprozesses.</p>
          </div>
        </div>
        <h3 style={{textAlign: 'center', marginBottom: '30px'}}>Dabei baut unser Ansatz auf 6 Prinzipien auf:</h3>
        <Grid container spacing={4}>
          <Principles title='#offen' content=' Andere Einrichtungen können das System entsprechend ihrer Bildungsangebote ausbauen und weiterentwickeln.' icon={open}/>
          <Principles title='#transparent & flexibel' content='Der Lernende hat Einblick über sein Portfolio und kann selbstbestimmt entscheiden, wem er welche Informationen zur Verfügung stellt.' icon={transparent}/>
          <Principles title='#standardisiert' content='Durch den Zusammenschluss verschiedener Bildungsakteure wird ein Standardisierungswerkzeug geschaffen, das Orientierung bietet.' icon={standard}/>
          <Principles title='#motivierend' content='“Portfolio & Badges” sind eine Form der Leistungsdarstellung; nicht der Bewertung. Sie fördern die Wertschätzung für die erworbenen Kompetenzen und steigern die Selbstverantwortung des Lernenden.' icon={motivation}/>
          <Principles title='#digital & dezentral' content='Wir setzen auf etablierte technische Standards auf, mit denen Kompetenznachweise digital erstellt und dezentral verwaltet werden können.' icon={decentral}/>
          <Principles title='#individuell' content='“Portfolio & Badges” können die individuellen Lernwege dokumentieren und fördern somit das selbstbestimmte, lebenslange Lernen.' icon={individual}/>
        </Grid>
      </div>
    );
  };
}

export default Home;
