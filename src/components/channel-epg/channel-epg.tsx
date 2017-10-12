import React, { Component } from 'react';
import styles from './channel-epg.scss';
import { ProgressBar } from '../progress-bar/progress-bar';
import { EpgEntry } from '../../entities/epg-entry';
import { Time } from '../formatters/time';
import Scrollbars from 'react-custom-scrollbars';
import { Duration } from '../formatters/duration';
import { DateFormatter } from '../formatters/date';

interface ChannelEpgState {
  entries: EpgEntry[];
}

export interface DispatchProps {
  onFetchData: (epgUrl: string) => void;
}

export interface StateProps {
  epgUrl: string;
  entries: EpgEntry[];
}

export interface OwnProps {
  channelId: number;
}

type Props = StateProps & DispatchProps & OwnProps;

export class ChannelEpgComponent extends Component<Props, ChannelEpgState> {
  // private isUnmounted = false;
  //
  // public state = {
  //   entries: [] as EpgEntry[],
  // };
  //
  // private currentProgram: EpgEntry = null;

  public componentDidMount() {
    // this.props.onFetchData(this.props.epgUrl);
    // this.initEpg(this.props.epgUrl);
  }

  // public componentWillReceiveProps(newProps: Props) {
  //   if (this.props.epgUrl !== newProps.epgUrl) {
  //     this.initEpg(newProps.epgUrl);
  //   }
  // }

  // private initEpg(epgUrl: string) {
  //   this.loadEpg(epgUrl).then((entries) => {
  //     const currentProgram = this.getCurrentProgram(entries);
  //     this.setState({ entries: this.filterOutdatedEntries(entries, currentProgram) });
  //   });
  // }

  // public componentDidMount() {
  //   this.watchCurrentProgram();
  // }

  // private loadEpg(url: string): Promise<EpgEntry[]> {
  //   return window.fetch(url).then((r) => r.json()).then((response) => {
  //     return Object.keys(response).reduce((acc, key) => {
  //       acc.push(new EpgEntry(response[key]));
  //       return acc;
  //     }, []);
  //   });
  // }

  // private getCurrentProgram(entries: EpgEntry[]): EpgEntry {
  //   return entries.find((entry) => entry.inAir);
  // }

  // private watchCurrentProgram() {
  //   const currentProgram = this.getCurrentProgram(this.state.entries);
  //
  //   if (this.currentProgram !== currentProgram) {
  //     this.setState({ entries: this.filterOutdatedEntries(this.state.entries, currentProgram) });
  //   }
  //
  //   if (!this.isUnmounted) {
  //     setTimeout(() => requestAnimationFrame(this.watchCurrentProgram.bind(this)), 500);
  //   }
  // }

  // private filterOutdatedEntries(entries: EpgEntry[], currentProgram: EpgEntry) {
  //   const index = entries.indexOf(currentProgram);
  //   return entries.slice(index);
  // }

  // public componentWillUnmount() {
  //   this.isUnmounted = true;
  // }

  public render() {
    return (
      <div className={styles.host}>
        <Scrollbars autoHide>
          <div className={styles.entries}>

            {this.props.entries.map((entry) => (
              <div className={entry.inAir ? styles.entryActive : styles.entry} key={entry.startTime}>

                <div className={styles.mainInfo}>
                  <h5 className={styles.name}>{entry.name}</h5>

                  {entry.inAir && <ProgressBar startTime={entry.startTime} endTime={entry.endTime}/>}

                  {!entry.inAir && (
                    <div className={styles.timing}>
                      <div className={styles.startTime}><Time>{entry.startTime}</Time></div>
                      <div className={styles.endTime}><Time>{entry.endTime}</Time></div>
                    </div>
                  )}

                </div>

                <div className={styles.sideInfo}>
                  <span className={styles.date}><DateFormatter>{entry.startTime}</DateFormatter></span>
                  <span className={styles.duration}><Duration>{entry.duration}</Duration></span>
                </div>

              </div>
            ))}

          </div>
        </Scrollbars>
      </div>
    );
  }
}
