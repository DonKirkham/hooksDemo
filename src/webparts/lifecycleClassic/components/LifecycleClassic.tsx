import * as React from 'react';
import styles from './LifecycleClassic.module.scss';
import type { ILifecycleClassicProps } from './ILifecycleClassicProps';

interface ILifecycleClassicState {
  events: string[];
  count: number;
  counting: boolean;
}

export default class LifecycleClassic extends React.Component<ILifecycleClassicProps, ILifecycleClassicState> {

  protected timer?: number;

  constructor(props: ILifecycleClassicProps) {
    super(props);
    this.state = { events: ['Constructor: Component is being initialized'], count: 0, counting: false };
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  componentDidMount() {
    this.addEvent('componentDidMount: Component has mounted');
  }

  componentDidUpdate(prevProps: any, prevState: ILifecycleClassicState) {
    if (this.state.events[this.state.events.length - 1] === `[lifecycleClassic] componentDidMount: Component has mounted`) {
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

  componentWillUnmount() {
    this.addEvent('componentWillUnmount: Component is being removed');
    this.stopTimer();
  }

  addEvent(event: string) {
    this.setState((prevState) => ({
      events: [...prevState.events, `[lifecycleClassic] ${event}`]
    }));
  }

  startTimer() {
    if (!this.timer) {
      this.timer = window.setInterval(() => {
        this.setState((prevState) => {
          if (prevState.count < 10) {
            return { count: prevState.count + 1 };
          }
          return null;
        });
      }, 1000);
    }
  }

  stopTimer() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = undefined;
      this.setState({ counting: false });
    }
  }

  handleButtonClick() {
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

  render() {
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
        <div style={{ marginTop: '1em' }}>
          <h4>Lifecycle Events</h4>
          <ul>
            {events.map((event, idx) => <li key={idx}>{event}</li>)}
          </ul>
        </div>
      </div>
    );
  }
}

