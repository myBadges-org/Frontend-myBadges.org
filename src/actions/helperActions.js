import { SET_PANEL } from './types';

// set panel
export const setPanel = (panelName) => (dispatch, getStore) => {
  const panel = getStore().helper.panel;
  if(panel === panelName) panelName = '';
  dispatch({
    type: SET_PANEL,
    payload: panelName
  });
};
