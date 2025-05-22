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
    this.addEvent('Starting counter');
    if (!this.timer) {
      this.timer = window.setInterval(() => {
        this.setState((prevState) => {
          if (prevState.count < 10) {
            this.addEvent(`Count changed from ${prevState.count} to ${prevState.count + 1}`);
            return { count: prevState.count + 1 };
          }
          return null;
        });
      }, 500);
    }
  }

  stopTimer(): void {
    if (this.timer) {
      this.addEvent('Stoping counter');
      clearInterval(this.timer);
      this.timer = undefined;
      this.setState({ counting: false });
    }
  }
  
  addEvent(event: string): void {
    this.setState((prevState) => ({
      events: [...prevState.events, `[lifecycleClassic] ${event}`]
    }));
    console.log(`[lifecycleClassic] ${event}`);
  }
  //#endregion

  // Constructor: runs when the component is created
  constructor(props: ILifecycleClassicProps) {
    super(props);
    this.state = {
      events: ['[lifecycleClassic] constructor: Component is being initialized'],
      count: 0,
      counting: false
    };
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  // componentDidMount: runs after the component is mounted
  componentDidMount(): void {
    this.addEvent('componentDidMount: Component has mounted');
  }

  // componentDidUpdate: runs when props or state change
  componentDidUpdate(prevProps: ILifecycleClassicProps, prevState: ILifecycleClassicState): void {
    if (this.state.events[this.state.events.length - 1] ===
      `[lifecycleClassic] componentDidMount: Component has mounted`) {
      this.addEvent(`componentDidUpdate: Component updated - after mount`);
    }
    if (prevState.count !== this.state.count) {
      this.addEvent(`componentDidUpdate: Component updated - count changed`);
    }
    if (this.state.count === 10 && prevState.count !== 10 && this.state.counting) {
      this.stopTimer();
      this.addEvent(`componentDidUpdate: Component updated - count reached 10`);
    }
  }

  // componentWillUnmount: runs before the component is removed
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