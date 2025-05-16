
import * as React from 'react';
import styles from './LifecycleHooks.module.scss';

export interface ILifecycleHooksProps {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
}

const LifecycleHooks: React.FC<ILifecycleHooksProps> = (props) => {
  const [events, setEvents] = React.useState<string[]>(['[lifecycleHooks] constructor: Component is being initialized']);
  const [count, setCount] = React.useState<number>(0);
  const [counting, setCounting] = React.useState<boolean>(false);
  const timerRef = React.useRef<number | undefined>(undefined);
  const didMountRef = React.useRef(false);

  // Add a lifecycle/state event and log it
  const addEvent = React.useCallback((event: string) => {
    setEvents(prev => [...prev, `[lifecycleHooks] ${event}`]);
    console.log(`[lifecycleHooks] ${event}`);
  }, []);

  // Start the interval timer (increments count up to 10)
  const startTimer = React.useCallback(() => {
    if (!timerRef.current) {
      timerRef.current = window.setInterval(() => {
        setCount(prev => (prev < 10 ? prev + 1 : prev));
      }, 500);
    }
  }, []);

  // Stop the interval timer and reset state
  const stopTimer = React.useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = undefined;
      setCounting(false);
    }
  }, []);

  // Simulate componentDidMount/componentWillUnmount
  React.useEffect(() => {
    addEvent('componentDidMount: Component has mounted');
    didMountRef.current = true;
    return () => {
      addEvent('componentWillUnmount: Component is being removed');
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = undefined;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Simulate componentDidUpdate for count/counting changes
  React.useEffect(() => {
    if (didMountRef.current) {
      addEvent('componentDidUpdate: Component updated');
    }
  }, [count, counting]);

  // Handle special logic for count changes
  React.useEffect(() => {
    if (didMountRef.current) {
      if (count > 0) {
        addEvent(`Count changed from ${count - 1} to ${count}`);
      }
      if (count === 10 && counting) {
        stopTimer();
      }
      //addEvent('componentDidUpdate: Component updated[count]');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  const handleButtonClick = React.useCallback(() => {
    if (count === 10) {
      setCount(0);
      setCounting(false);
      setTimeout(() => {
        startTimer();
        setCounting(true);
      }, 0);
    } else if (!counting) {
      startTimer();
      setCounting(true);
    } else {
      stopTimer();
    }
  }, [count, counting, startTimer, stopTimer]);

  let buttonLabel = 'Start Count';
  if (counting) {
    buttonLabel = 'Stop Count';
  } else if (count === 10) {
    buttonLabel = 'Restart Count';
  }

  return (
    <div className={`${styles.lifecycleHooks} `}>
      <h2>Lifecycle Methods Demo</h2>
      <p>Count: {count}</p>
      <button onClick={handleButtonClick}>{buttonLabel}</button>
      <hr />
      <div className={styles.eventsContainer} >
        <h4>Lifecycle Events</h4>
        <ul>
          {events.map((event, idx) => <li key={idx}>{event}</li>)}
        </ul>
      </div>
    </div>
  );
};

export default LifecycleHooks;
