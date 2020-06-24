import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';

export class BadgeDetails extends Component {

  state = {
    open: false
  }

  componentDidUpdate(previousProps) {
    if(previousProps.open !== this.props.open && this.props.open === true){
      this.setState({ open: true });
    }
  }

  toggle = () => {
    this.setState({ open: false });
  };

  render(){
    const { badge } = this.props;
    return(
      badge ?
        <Dialog
          open={this.state.open}
          onClose={this.toggle}
        >
          <DialogTitle>{badge.name}</DialogTitle>
          <DialogContent>
            {badge.image && badge.image.path ?
              <Avatar src={`/media/${badge.image.path}`} style={{width: '200px', height: '200px', marginLeft: 'auto', marginRight: 'auto'}}/>
            : <Avatar style={{width: '200px', height: '200px', marginLeft: 'auto', marginRight: 'auto'}}></Avatar>
            }
            <TextField
              style={{marginBottom: '10px', marginTop: '10px'}}
              variant='outlined'
              type='text'
              label='Kategorie'
              disabled
              value={badge.category === 'achievement' ? 'Erfolg' : badge.category === 'professional skill' ? 'Fachkompetenz' : badge.category === 'meta skill' ? 'Meta-Kompetenz' : null}
              fullWidth={true}
            />
            <TextField
              style={{marginBottom: '10px'}}
              variant='outlined'
              type='text'
              label='Beschreibung'
              multiline
              disabled
              value={badge.description}
              fullWidth={true}
            />
            <TextField
              style={{marginBottom: '10px'}}
              variant='outlined'
              type='text'
              label='Kriterien'
              multiline
              disabled
              value={badge.criteria}
              fullWidth={true}
            />
          </DialogContent>
          <DialogActions>
            <Button color="default" variant='contained' onClick={this.toggle}>
              Schließen
            </Button>
          </DialogActions>
        </Dialog>
      : null
    );
  }
}

BadgeDetails.propTypes = {
  badge: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  badge: state.badge.badge
});

export default connect(mapStateToProps, null)(BadgeDetails);
