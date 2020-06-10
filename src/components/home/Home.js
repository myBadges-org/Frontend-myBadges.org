import React, { Component } from 'react';

import Principles from './Principles';

import Grid from '@material-ui/core/Grid';


class Home extends Component {
  render() {
    return (
      <div style={{margin: '0px 24px'}}>
        <h1 style={{textAlign: 'center'}}>Unser Ansatz</h1>
        <div style={{backgroundColor: 'lightgrey', padding: '15px', margin: '0 -24px', textAlign: 'center'}}>
          <div style={{margin: '0px 10%'}}>
            <p>Unser Feedbacksystem motiviert die Teilnehmenden mit Freude zu lernen und verhilft ihnen zu einer realistischen Selbsteinschätzung ihres eigenen Fortschritts. Gleichzeitig bietet es der Lernbegleitung Orientierung über den Leistungsstand und bildet damit eine wichtige Grundlage für die weitere didaktisch-pädagogische Planung des Lernprozesses.</p>
          </div>
        </div>
        <h3 style={{textAlign: 'center', marginBottom: '30px'}}>Dabei baut unser Ansatz auf 6 Prinzipien auf:</h3>
        <Grid container spacing={4}>
          <Principles title='#offen' content=' Andere Einrichtungen können das System entsprechend ihrer Bildungsangebote ausbauen und weiterentwickeln.'/>
          <Principles title='#transparent & flexibel' content='Der Lernende hat Einblick über sein Portfolio und kann selbstbestimmt entscheiden, wem er welche Informationen zur Verfügung stellt.'/>
          <Principles title='#standardisiert' content='Durch den Zusammenschluss verschiedener Bildungsakteure wird ein Standardisierungswerkzeug geschaffen, das Orientierung bietet.'/>
          <Principles title='#motivierend' content='“Portfolio & Badges” sind eine Form der Leistungsdarstellung; nicht der Bewertung. Sie fördern die Wertschätzung für die erworbenen Kompetenzen und steigern die Selbstverantwortung des Lernenden.'/>
          <Principles title='#digital & dezentral' content='Wir setzen auf etablierte technische Standards auf, mit denen Kompetenznachweise digital erstellt und dezentral verwaltet werden können.'/>
          <Principles title='#individuell' content='“Portfolio & Badges” können die individuellen Lernwege dokumentieren und fördern somit das selbstbestimmte, lebenslange Lernen.'/>
        </Grid>
      </div>
    );
  };
}

export default Home;
