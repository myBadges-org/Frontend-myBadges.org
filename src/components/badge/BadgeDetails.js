import React, { Component } from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';

export class BadgeDetails extends Component {

  state = {
    open: false
  }

  componentDidUpdate(previousProps) {
    if(previousProps.open !== this.props.open){
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
            <Grid container spacing={1}>
              <Grid item xs={12}>
                {badge.image && badge.image.path ?
                  <Avatar src={`/media/${badge.image.path}`} style={{width: '200px', height: '200px'}}/>
                : <Avatar style={{width: '200px', height: '200px'}}></Avatar>
                }
              </Grid>
            </Grid>
            <TextField
              style={{marginBottom: '10px', marginTop: '10px'}}
              variant='outlined'
              type='text'
              label='Name'
              disabled
              value={badge.name}
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
              name='criteria'
              multiline
              disabled
              value={badge.criteria}
              onChange={this.onChange}
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

export default BadgeDetails;
