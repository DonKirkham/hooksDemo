import * as React from 'react';
import styles from './TotalPackage.module.scss';

export interface ITotalPackageProps {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
}

const TotalPackage: React.FC<ITotalPackageProps> = (props) => {
  const [events, setEvents] = React.useState<string[]>(['[TotalPackage] constructor: Component is being initialized']);
  const [count, setCount] = React.useState<number>(0);
  const [counting, setCounting] = React.useState<boolean>(false);
  const timerRef = React.useRef<number | undefined>(undefined);
  const didMountRef = React.useRef(false);

  //#region other functions
  // Add a lifecycle/state event and log it
  const addEvent = React.useCallback((event: string) => {
    setEvents(prev => [...prev, `[TotalPackage] ${event}`]);
    console.log(`[TotalPackage] ${event}`);
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
  //#endregion

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
      addEvent('componentDidUpdate: Component updated - counting changed');
    }
  }, [counting]);

  // Handle special logic for count changes
  React.useEffect(() => {
    if (didMountRef.current) {
      if (count > 0) {
        addEvent(`Count changed from ${count - 1} to ${count}`);
      }
      if (count === 10 && counting) {
        stopTimer();
      }
      addEvent('componentDidUpdate: Component updated - count changed');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  // #region more functions
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
  // #endregion

  // Render the component
  return (
    <div className={styles.totalPackage}>
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

export default TotalPackage;