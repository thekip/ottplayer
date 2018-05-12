import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Redirect, RouteComponentProps } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import { Dispatch } from 'redux';
import { StopEpgSync } from '../../store/actions/epg.actions';
import { RequestPlaylist } from '../../store/actions/playlist.actions';
import { AppState } from '../../store';
import { ChannelsPanel } from '../channels-panel/channels-panel.container';
import { FavouritesEditor } from '../favourites-editor/favourites-editor';
import { PlayerArea } from '../player-area/player-area.component';
import styles from './tv-portal.scss';

interface Props extends RouteComponentProps<{}> {
  currentKey: string;
  playlistUrl: string;

  onFetchData: (playlistUrl: string) => void;
  onUnmount: () => void;
}

export class TvPortalComponent extends PureComponent<Props> {
  public componentDidMount() {
    if (this.props.playlistUrl) {
      this.props.onFetchData(this.props.playlistUrl);
    }
  }

  public componentWillUnmount() {
    this.props.onUnmount();
  }

  public render() {
    return (
      <div className={styles.host}>
        {!this.props.playlistUrl ? <Redirect to='/settings'/> : null}

        <Switch>
          <Route exact path={'/edit-favourites'} component={FavouritesEditor}/>
          <Route path={this.props.match.path} component={ChannelsPanel}/>
        </Switch>

        <Route path={this.props.match.path} component={PlayerArea}/>
      </div>
    );
  }
}

function mapStateToProps(state: AppState): Partial<Props> {
  return {
    currentKey: state.settings.currentKey,
    playlistUrl: state.settings.playlistUrl,
  };
}

function mapDispatchToProps(dispatch: Dispatch<AppState>): Partial<Props> {
  return {
    onFetchData: async (playlistUrl: string) => {
      dispatch(new RequestPlaylist({ playlistUrl }));
    },
    onUnmount: () => {
      dispatch(new StopEpgSync());
    },
  };
}

export const TvPortal = connect(
  mapStateToProps,
  mapDispatchToProps,
)(TvPortalComponent);
