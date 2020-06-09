import React, { Component } from 'react';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import Typography from '@material-ui/core/Typography';

class Faq extends Component {

  state = {
    panel: '',
    expanded: false
  }

  componentDidMount(){
    window.scrollTo(0, 0)
  }

  handleChange = (panel) => {
    this.setState({ panel: this.state.panel === panel ? '' : panel });
  };

  render() {
    const { panel } = this.state;
    return (
      <div style={{margin: '0px 24px 0px 24px'}}>
        <h1>FAQ</h1>
        <ExpansionPanel expanded={panel === 'panel1'} onChange={() => this.handleChange('panel1')}>
          <ExpansionPanelSummary
            expandIcon={
              <FontAwesomeIcon icon={faChevronDown} />
            }
          >
            <Typography>Frage 1</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget
              maximus est, id dignissim quam.
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded={panel === 'panel2'} onChange={() => this.handleChange('panel2')}>
          <ExpansionPanelSummary
            expandIcon={
              <FontAwesomeIcon icon={faChevronDown} />
            }
          >
            <Typography>Frage 2</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus, varius pulvinar
              diam eros in elit. Pellentesque convallis laoreet laoreet.
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded={panel === 'panel3'} onChange={() => this.handleChange('panel3')}>
          <ExpansionPanelSummary
            expandIcon={
              <FontAwesomeIcon icon={faChevronDown} />
            }
          >
            <Typography>Frage 3</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas eros,
              vitae egestas augue. Duis vel est augue.
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded={panel === 'panel4'} onChange={() => this.handleChange('panel4')}>
          <ExpansionPanelSummary
            expandIcon={
              <FontAwesomeIcon icon={faChevronDown} />
            }
          >
            <Typography>Frage 4</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas eros,
              vitae egestas augue. Duis vel est augue.
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  };
}

export default Faq;
