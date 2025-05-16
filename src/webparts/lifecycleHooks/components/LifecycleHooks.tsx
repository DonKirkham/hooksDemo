import { useState, useEffect, useRef, useCallback } from 'react';
import styles from './LifecycleHooks.module.scss';
import * as React from 'react';

export interface ILifecycleHooksProps {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
}

const LifecycleHooks: React.FC<ILifecycleHooksProps> = (props) => {
  const [events, setEvents] = useState<string[]>(['[hooks2] constructor: Component is being initialized']);
  const [count, setCount] = useState<number>(0);
  const [counting, setCounting] = useState<boolean>(false);
  const timerRef = useRef<number | undefined>(undefined);
  const didMountRef = useRef(false);

  // Helper to add an event
  const addEvent = useCallback((event: string) => {
    setEvents(prev => [...prev, `[hooks2] ${event}`]);
  }, []);

  // Timer logic
  const startTimer = useCallback(() => {
    if (!timerRef.current) {
      timerRef.current = window.setInterval(() => {
        setCount(prev => (prev < 10 ? prev + 1 : prev));
      }, 1000);
    }
  }, []);

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = undefined;
      setCounting(false);
    }
  }, []);

  // componentDidMount
  useEffect(() => {
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

  // componentDidUpdate for count and counting
  useEffect(() => {
    if (didMountRef.current) {
      addEvent('componentDidUpdate: Component updated');
    }
  }, [count, counting]);

  // Special logic for count change
  useEffect(() => {
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

  const handleButtonClick = useCallback(() => {
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
