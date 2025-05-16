import * as React from 'react';
import styles from './LifecycleHooks2.module.scss';

export interface ILifecycleHooksProps {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
}

export interface ILifecycleHooksState {
  events: string[];
  count: number;
  counting: boolean;
}

const LifecycleHooks: React.FC<ILifecycleHooksProps> = (props) => {
  const [count, _setCount] = React.useState(0);
  const [_counting, _setCounting] = React.useState(false);
  const [events, _setEvents] = React.useState<string[]>(['[lifecycleHooks] constructor: Component is being initialized']);
  //const timer = React.useRef<ReturnType<typeof setInterval> | null>(null);

  // // Mimic componentDidMount
  // React.useEffect(() => {
  //   setEvents((ev) => [...ev, '[lifecycleHooks] useEffect: Component did mount']);
  //   return () => {
  //     setEvents((ev) => [...ev, '[lifecycleHooks] useEffect: Component will unmount']);
  //     if (timer.current) clearInterval(timer.current);
  //   };
  // }, []);

  // // Timer effect
  // React.useEffect(() => {
  //   if (counting && count < 10) {
  //     timer.current = setInterval(() => {
  //       setCount((c) => c + 1);
  //     }, 1000);
  //   } else if (timer.current) {
  //     clearInterval(timer.current);
  //     timer.current = null;
  //   }
  //   return () => {
  //     if (timer.current) clearInterval(timer.current);
  //   };
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [counting]);

  // const stopTimer = () : void => {
  //   setCounting(false);
  //   setEvents((ev) => [...ev, '[lifecycleHooks] stopTimer: Timer stopped']);
  // };

  // const startTimer = () : void => {
  //   setCounting(true);
  //   setEvents((ev) => [...ev, '[lifecycleHooks] startTimer: Timer started']);
  // };

  // // Mimic componentDidUpdate for count
  // React.useEffect(() => {
  //   if (count > 0) {
  //     setEvents((ev) => [...ev, `[lifecycleHooks] useEffect: Count changed to ${count}`]);
  //   }
  //   if (count === 10 && counting) {
  //     stopTimer();
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [count]);

  // const handleButtonClick = () : void => {
  //   if (count === 10) {
  //     setCount(0);
  //     setCounting(false);
  //     setEvents((ev) => [...ev, '[lifecycleHooks] handleButtonClick: Counter reset']);
  //     setTimeout(() => startTimer(), 0);
  //   } else if (!counting) {
  //     startTimer();
  //   } else {
  //     stopTimer();
  //   }
  // };

  // let buttonLabel = 'Start Count';
  // if (counting) {
  //   buttonLabel = 'Stop Count';
  // } else if (count === 10) {
  //   buttonLabel = 'Restart Count';
  // }

  //      <button onClick={handleButtonClick}>{buttonLabel}</button>

  return (
    <div className={styles.lifecycleHooks}>
      <h2>Lifecycle Methods Demo (Hooks)</h2>
      <p>Count: {count}</p>
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
