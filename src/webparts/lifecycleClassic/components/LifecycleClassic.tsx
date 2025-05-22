import * as React from 'react';
import styles from './LifecycleClassic.module.scss';

export interface ILifecycleClassicProps {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
}

interface ILifecycleClassicState {
  events: string[];
  count: number;
  counting: boolean;
}

export default class LifecycleClassic extends React.Component<ILifecycleClassicProps, ILifecycleClassicState> {

  protected timer?: number;

  //#region other functions
  addEvent(event: string): void {
    this.setState((prevState) => ({
      events: [...prevState.events, `[lifecycleClassic] ${event}`]
    }));
    console.log(`[lifecycleClassic] ${event}`);
  }

  handleButtonClick(): void {
    const { count, counting } = this.state;
    if (count === 10) {
      this.setState({ count: 0, counting: false }, () => {
        this.startTimer();
        this.setState({ counting: true });
      });
    } else if (!counting) {
      this.startTimer();
      this.setState({ counting: true });
    } else {
      this.stopTimer();
    }
  }

  startTimer(): void {
    if (!this.timer) {
      this.timer = window.setInterval(() => {
        this.setState((prevState) => {
          if (prevState.count < 10) {
            return { count: prevState.count + 1 };
          }
          return null;
        });
      }, 500);
    }
  }

  stopTimer(): void {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = undefined;
      this.setState({ counting: false });
    }
  }
  //#endregion

  // Constructor: initialize state and bind handlers
  constructor(props: ILifecycleClassicProps) {
    super(props);
    this.state = {
      events: ['[lifecycleClassic] constructor: Component is being initialized'],
      count: 0,
      counting: false
    };
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  // componentDidMount: log mount event
  componentDidMount(): void {
    this.addEvent('componentDidMount: Component has mounted');
  }

  // componentDidUpdate: log updates and handle count logic
  componentDidUpdate(prevProps: ILifecycleClassicProps, prevState: ILifecycleClassicState): void {
    if (this.state.events[this.state.events.length - 1] ===
      `[lifecycleClassic] componentDidMount: Component has mounted`) {
      this.addEvent(`componentDidUpdate: Component updated`);
    }
    if (prevState.count !== this.state.count) {
      this.addEvent(`Count changed from ${prevState.count} to ${this.state.count}`);
      this.addEvent(`componentDidUpdate: Component updated`);
    }
    if (this.state.count === 10 && prevState.count !== 10 && this.state.counting) {
      this.stopTimer();
    }
  }

  // componentWillUnmount: log unmount and clean up
  componentWillUnmount(): void {
    this.addEvent('componentWillUnmount: Component is being removed');
    this.stopTimer();
  }


  render(): JSX.Element {
    const { count, counting, events } = this.state;
    let buttonLabel = 'Start Count';
    if (counting) {
      buttonLabel = 'Stop Count';
    } else if (count === 10) {
      buttonLabel = 'Restart Count';
    }
    return (
      <div className={`${styles.lifecycleClassic} `}>
        <h2>Lifecycle Methods Demo</h2>
        <p>Count: {count}</p>
        <button onClick={this.handleButtonClick}>{buttonLabel}</button>
        <hr />
        <div className={styles.eventsContainer} >
          <h4>Lifecycle Events</h4>
          <ul>
            {events.map((event, idx) => <li key={idx}>{event}</li>)}
          </ul>
        </div>
      </div>
    );
  }
}