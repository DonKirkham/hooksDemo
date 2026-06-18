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

  //#region other functions
  // Add a lifecycle/state event and log it
  const addEvent = React.useCallback((event: string) => {
    setEvents(prev => [...prev, `[lifecycleHooks] ${event}`]);
    console.log(`[lifecycleHooks] ${event}`);
  }, []);

  // Start the interval timer (increments count up to 10)
  const startTimer = React.useCallback(() => {
    if (!timerRef.current) {
      addEvent('Starting counter');
      timerRef.current = window.setInterval(() => {
        setCount(prev => (prev < 10 ? prev + 1 : prev));
      }, 500);
    }
  }, []);

  // Stop the interval timer and reset state
  const stopTimer = React.useCallback(() => {
    if (timerRef.current) {
      addEvent('Stopping counter');
      clearInterval(timerRef.current);
      timerRef.current = undefined;
      setCounting(false);
    }
  }, []);

  const handleButtonClick = React.useCallback(() => {
    if (count === 10) {
      // Log the reset here: the count effect can't distinguish mount (count 0)
      // from a 10 -> 0 reset without tracking the previous value
      setCount(0);
      addEvent(`componentDidUpdate: count changed from ${count} to 0`);
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
  }, [count, counting]);


  //#endregion

  // Simulate componentDidMount/componentWillUnmount
  React.useEffect(() => {
    addEvent('componentDidMount: Component has mounted');
    // The addEvent above triggers a re-render, mirroring the classic
    // componentDidUpdate that fires once right after mount
    addEvent('componentDidUpdate: after mount');
    return () => {
      addEvent('componentWillUnmount: Component is being removed');
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = undefined;
      }
    };
  }, []);

  // Simulate componentDidUpdate for count/counting changes
  React.useEffect(() => {
    // Skip the initial mount (count 0, not counting); counting only ever
    // toggles, so the previous value is simply !counting
    if (count > 0 || counting) {
      addEvent(`componentDidUpdate: counting changed from ${!counting} to ${counting}`);
    }
  }, [counting]);

  // Handle special logic for count changes
  React.useEffect(() => {
    // Skip the initial mount (count 0); the timer only ever increments by 1,
    // so the previous value is count - 1
    if (count > 0) {
      addEvent(`componentDidUpdate: count changed from ${count - 1} to ${count}`);
    }
    if (count === 10 && counting) {
      stopTimer();
      addEvent('componentDidUpdate: count reached 10');
    }
  }, [count]);

  let buttonLabel = 'Start Count';
  if (counting) {
    buttonLabel = 'Stop Count';
  } else if (count === 10) {
    buttonLabel = 'Restart Count';
  }

  // Render the component
  return (
    <div className={`${styles.lifecycleHooks} `}>
      <h2>Hooks Lifecycle Methods Demo</h2>
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