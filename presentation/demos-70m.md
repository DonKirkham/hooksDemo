# React Hooks for SPFx: Build Cleaner, Faster, Better — Demo Script (70 min)

**Speaker:** Don Kirkham — Microsoft MVP, M365 Development & Microsoft Graph
**Session:** TechCon 365 Chicago
**Solution:** `hooksdemo` (SPFx 1.23.0 · React 17.0.1 · Node 22.14+)

This script is the presenter's runbook. Each demo maps to slides in
`Functional-Components-and-Hooks.pdf` and uses the web parts in this solution.

---

## Web parts in this solution

| Web part            | Component file                                                      | Demonstrates                                                                                |
| ------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| Hello World Classic | `src/webparts/helloWorldClassic/components/HelloWorldClassic.tsx` | Default Yeoman scaffold — class component                                                  |
| Hello World Hooks   | `src/webparts/helloWorldHooks/components/HelloWorldHooks.tsx`     | **Starts as a class** — converted live to a function component                       |
| Lifecycle Classic   | `src/webparts/lifecycleClassic/components/LifecycleClassic.tsx`   | `constructor` / `componentDidMount` / `componentDidUpdate` / `componentWillUnmount` |
| Lifecycle Hooks     | `src/webparts/lifecycleHooks/components/LifecycleHooks.tsx`       | `useState`, `useEffect`, `useRef`, `useCallback` replacing lifecycle methods        |
| Total Package       | `src/webparts/totalPackage/...`                                   | Custom hook +`useContext`, `useRef`, `useCallback` working together                   |

> **Pre-flight (do before the room fills):**
>
> 1. `npm install` already run; `node -v` returns 22.x.
> 2. Confirm `src/webparts/helloWorldHooks/components/HelloWorldHooks.tsx` is the **class** version (the un-converted starting point). This is the live-coding canvas.
> 3. Open VS Code with these tabs pre-loaded in order: `HelloWorldClassic.tsx`, `HelloWorldHooks.tsx`, `LifecycleClassic.tsx`, `LifecycleHooks.tsx`, `TotalPackage.tsx`, `useTasks.ts`, `TaskContext.ts`.
> 4. Start the dev server: `npm start` (heft start, port 4321, HTTPS). Trust the dev cert if prompted.
> 5. Open the page for the demos: [https://pdslabs2.sharepoint.com/sites/TechCon/SitePages/HooksDemo.aspx]() 
> 6. Have the browser console (F12) open and docked — the lifecycle demos log to it.
> 7. Keep a clean `git stash`/branch so you can `git checkout -- .` to reset the live edit between sessions.

---

## Timing overview (~70 min)

| Time       | Segment                          | Slides | Demo                                              |
| ---------- | -------------------------------- | ------ | ------------------------------------------------- |
| 0:00–0:05 | Intro / housekeeping / about me  | 1–5   | —                                                |
| 0:05–0:10 | Agenda + FC/Hooks history        | 6–7   | —                                                |
| 0:10–0:20 | Class component anatomy          | 8      | **Demo 1** — Hello World Classic           |
| 0:20–0:25 | What are FCs / what are Hooks    | 9      | **Demo 2** — Hooks code tour               |
| 0:25–0:35 | Converting a class to an FC      | 10     | **Demo 3** — live conversion               |
| 0:35–0:48 | useState + useEffect (lifecycle) | 11     | **Demo 4** — Lifecycle Classic vs Hooks    |
| 0:48–0:53 | useCallback                      | 12     | **Demo 5** — referenced in Lifecycle Hooks |
| 0:53–0:57 | useRef                           | 13     | **Demo 6** — timer ref + DOM ref           |
| 0:57–1:00 | useMemo                          | 14     | slide walkthrough (no web part)                   |
| 1:00–1:08 | useContext + custom hooks        | 15–16 | **Demo 7** — Total Package                 |
| 1:08–1:10 | Q&A / rate the session           | 17     | —                                                |

---

## Demo 1 — The default SPFx class component

**Slides 8, 10 (top). ~8 min.**

**Goal:** show what the Yeoman generator gives you out of the box, and why it feels heavy.

1. In the workbench, add the **Hello World Classic** web part. It renders the standard SPFx welcome card.
2. Switch to `HelloWorldClassic.tsx`. Talk through the structure:
   - `export default class HelloWorldClassic extends React.Component<IHelloWorldClassicProps>` — the class declaration with a typed props generic.
   - `public render(): React.ReactElement<...>` — the single required method; everything visual lives here.
   - Props are pulled off `this.props` via destructuring inside `render()`.
3. ~~Open `LifecycleClassic.tsx` briefly and scroll the class to foreshadow the cost: a `constructor`, manual `this.bind`, `this.state`, and four lifecycle methods. Point at the `//#region lifecycle events` block (lines 70–111).~~

**Talking points (slide 8):**

- The generator scaffolds **class components** by default — has since SPFx shipped.
- A class forces ceremony: constructor, `this` binding, `this.setState`, lifecycle method names you have to memorize.
- "Hold this picture in your head — we're going to make it disappear."

---

## Demo 2 — What a function component + hooks looks like

**Slide 9. ~5 min.**

**Goal:** contrast the class with the destination before doing the conversion.

1. Open `LifecycleHooks.tsx`. Point out the shape:
   - `const LifecycleHooks: React.FC<ILifecycleHooksProps> = (props) => { ... }` — just a function that takes props and returns JSX (lines 12, 106–119).
   - No `render()`, no `this`, no constructor.
2. Scroll to the hook declarations at the top (lines 13–17) and read them aloud:
   ```ts
   const [events, setEvents] = React.useState<string[]>([...]);
   const [count, setCount] = React.useState<number>(0);
   const [counting, setCounting] = React.useState<boolean>(false);
   const timerRef = React.useRef<number | undefined>(undefined);
   const didMountRef = React.useRef(false);
   ```
3. Land the definitions (slide 9):
   - **Function component** = a JS function that accepts props and returns a React element. It *is* the `render` method.
   - **Hooks** = functions (prefixed `use`) that let a function component hold state and run side effects — the capabilities you used to need a class for.

---

## Demo 3 — Convert a class to a function component (live)

**Slide 10. ~10 min. This is the marquee demo.**

**Goal:** prove the conversion is "2 lines + cleanup" and changes nothing in the base web part (`HelloWorldHooksWebPart.ts` is untouched).

> The file `HelloWorldHooks.tsx` is intentionally shipped as a **class** so you can convert it on stage.

**Starting point** (`HelloWorldHooks.tsx`, the class):

```ts
export default class HelloWorldHooks extends React.Component<IHelloWorldHooksProps> {
  public render(): React.ReactElement<IHelloWorldHooksProps> {
    const {
      description, isDarkTheme, environmentMessage, hasTeamsContext, userDisplayName
    } = this.props;
    return ( /* ...JSX... */ );
  }
}
```

**Steps (do these on screen):**

1. **Change the declaration** — replace the class line and the `render` line with a single arrow-function const:
   ```ts
   const HelloWorldHooks = (props: IHelloWorldHooksProps): React.ReactElement => {
   ```
2. **Fix the props source** — change `this.props` to `props`:
   ```ts
   const {
     description, isDarkTheme, environmentMessage, hasTeamsContext, userDisplayName
   } = props;
   ```
3. **Remove the trailing class brace** — delete the extra `}` that used to close the class (the function body now ends right after the `return (...)`).
4. **Add the export at the bottom of the file:**
   ```ts
   export default HelloWorldHooks;
   ```
5. Save. Watch the dev server rebuild. Refresh the workbench — **Hello World Hooks renders identically.**

**Talking points (slide 10):**

- "Best done right after project creation" — minimal surface area to touch.
- **No changes to the web part `.ts` file** — it already does `React.createElement(HelloWorldHooks, props)`; a class and a function are both valid React component types.
- The whole edit is: (1) declaration line, (2) `this.props` → `props`, (3) drop `render`/closing brace, (4) `export default`.
- Reset for the next run: `git checkout -- src/webparts/helloWorldHooks/components/HelloWorldHooks.tsx`.

---

## Demo 4 — useState + useEffect: lifecycle, side by side

**Slide 11 ("GAMECHANGERS"). ~13 min. The heart of the talk.**

**Goal:** show the same counter behavior implemented with class lifecycle methods vs. hooks, and prove the hooks version is cleaner.

### 4a. The class version

1. Add **Lifecycle Classic** to the workbench. Click **Start Count** — the count ticks 0→10 at 500 ms and the **Lifecycle Events** list fills in. Watch the console too.
2. Open `LifecycleClassic.tsx`. Walk the four lifecycle methods:
   - `constructor` (lines 72–80) — initializes `state` and **binds** `handleButtonClick`.
   - `componentDidMount` (83–85) — logs the mount.
   - `componentDidUpdate` (95–110) — a tangle of `prevState` comparisons to detect what changed.
   - `componentWillUnmount` (88–92) — clears the timer.
3. Make the point: state changes are scattered across `setState` callbacks, and *reacting* to changes means manually diffing `prevState`.

### 4b. The hooks version

1. Add **Lifecycle Hooks** to the workbench. Identical behavior — same counter, same event log.
2. Open `LifecycleHooks.tsx`. Map each class concept to its hook:

   | Class                                            | Hook                                               | Lines  |
   | ------------------------------------------------ | -------------------------------------------------- | ------ |
   | `this.state` + `setState`                    | `useState` (`events`, `count`, `counting`) | 13–15 |
   | `componentDidMount` / `componentWillUnmount` | `useEffect(() => {...; return () => {...}}, [])` | 66–76 |
   | `componentDidUpdate` (on `counting`)         | `useEffect(..., [counting])`                     | 79–83 |
   | `componentDidUpdate` (on `count`)            | `useEffect(..., [count])`                        | 86–96 |
3. **Drive the dependency-array point home (slide 11):**

   - No array → effect runs after **every** render.
   - `[]` → runs **once** on mount (and the returned function runs on unmount).
   - `[count]` → runs only when `count` **changes**.
   - The `return () => {...}` inside an effect is the **cleanup** function = `componentWillUnmount`.

**Talking points:**

- Class lifecycle logic gets *split by lifecycle name*; hooks let you group logic *by concern* (one effect per thing you care about).
- `useState` returns a 2-item array: `[value, setter]`. Initialize in the call.
- No `this`, no binding, no constructor.

---

## Demo 5 — useCallback

**Slide 12. ~5 min. (Uses the same Lifecycle Hooks file.)**

**Goal:** show memoized functions and why they matter for stable references.

1. In `LifecycleHooks.tsx`, point at the `React.useCallback` wrappers:
   - `addEvent` (lines 21–24) — `[]` deps, so the same function identity persists across renders.
   - `startTimer` (27–34), `stopTimer` (37–44).
   - `handleButtonClick` (46–60) — deps `[count, counting]`, so it's only re-created when those change.
2. Explain the slide's example: passing an un-memoized function as a prop forces a child to re-render every time; `useCallback` keeps the reference stable.

**Talking points (slide 12):**

- `useCallback(fn, deps)` memoizes the **function** — re-created only when a dependency changes.
- Pair it with memoized children to prevent unnecessary re-renders.
- Watch your dependency arrays — a stale array is the #1 hooks bug.

---

## Demo 6 — useRef

**Slide 13. ~4 min.**

**Goal:** two uses of `useRef` — a mutable value that survives renders, and a DOM handle.

1. **Persisting a value (no re-render):** in `LifecycleHooks.tsx`:
   - `timerRef` (line 16) holds the interval id across renders without triggering re-renders — the hooks equivalent of the class's `protected timer?` field.
   - `didMountRef` (line 17) tracks "have we mounted yet" so the count/counting effects skip their first run.
   - Show `timerRef.current = window.setInterval(...)` (line 30) and the cleanup `clearInterval(timerRef.current)` (lines 39, 71).
2. **DOM access:** open `AddTaskInput.tsx` (Total Package):
   - `const inputRef = React.useRef<HTMLInputElement>(null);` (line 9), bound via `ref={inputRef}` (line 28).
   - `handleAddTask` reads `inputRef.current.value` and clears it (lines 12–17) — no controlled-input state needed.

**Talking points (slide 13):**

- `useRef` returns `{ current }` — mutate `.current` freely; it does **not** cause a re-render.
- Use it for timers/intervals, "previous value" tracking, and direct DOM access (focus, value).

---

## Demo 7 — useContext + custom hooks (the Total Package)

**Slides 15–16. ~8 min.**

**Goal:** tie it together — a custom hook owns the state, Context shares it, children consume it without prop drilling.

1. Add **Total Package** to the workbench. Type a task, press Enter / click **Add Task** — the count and the list both update. Add several.
2. **The custom hook** — `useTasks.ts`:
   ```ts
   const useTasks = (): TaskContextType => {
     const [tasks, setTasks] = React.useState<string[]>([]);
     const addTask = React.useCallback((task: string) => {
       setTasks(prev => [...prev, task]);
     }, []);
     return { tasks, addTask };
   };
   ```

   - It's "just a function that uses built-in hooks" (slide 16). Encapsulates state + behavior, returns a clean API.
3. **The context** — `TaskContext.ts`: `React.createContext<TaskContextType | undefined>(undefined)`.
4. **Provide** — `TotalPackage.tsx` (lines 14–24):
   ```tsx
   const taskState = useTasks();
   return (
     <TaskContext.Provider value={taskState}>
       <AddTaskInput /><TaskSummary /><TaskList />
     </TaskContext.Provider>
   );
   ```
5. **Consume** — show all three children calling `React.useContext(TaskContext)` with **zero props passed**:
   - `AddTaskInput.tsx` line 8, `TaskSummary.tsx` line 8, `TaskList.tsx` line 8.

**Talking points (slides 15–16):**

- `useContext` kills prop-drilling — children reach shared state directly (slide 15's big red ✗ over manual prop passing).
- The "How it works" trio: **create** context → **provide** a value → **consume** with `useContext`.
- Custom hooks: extract reusable logic, improve readability, encapsulate side effects. The slide's `useWindowSize` is the canonical example; `useTasks` is ours.

---

## useMemo (slide 14 — discuss, no web part)

**~3 min.** No dedicated web part; walk the slide.

- `useMemo(fn, deps)` memoizes a **computed value** (vs. `useCallback` which memoizes a **function**).
- Use it for expensive calculations (sorting, filtering, factorial in the slide) so they only recompute when dependencies change.
- One-liner: *"`useCallback` remembers a function; `useMemo` remembers a value."*

---

## Reset / cleanup between sessions

```bash
# Undo the live conversion of HelloWorldHooks
git checkout -- src/webparts/helloWorldHooks/components/HelloWorldHooks.tsx

# Confirm nothing else drifted
git status
```

Restart the dev server with `npm start` if you stopped it.

---

## Fallback if `npm start` / the workbench fails

- **Cert / trust error:** re-run the dev cert trust step, or demo against an open workbench tab already loaded before the talk.
- **Tenant unreachable (conference Wi-Fi):** use the **local** workbench at `https://localhost:4321/temp/workbench.html` (no SharePoint context, but all five web parts render).
- **Build break during live conversion:** the safety net is `git checkout -- src/webparts/helloWorldHooks/components/HelloWorldHooks.tsx`, then talk through the diff on the slide instead.
- **Total fallback:** the slides 8–16 contain screenshots of every code path; narrate from them.

---

## One-line recap to close on (slide 9 callback)

> A class component is a `render()` method wrapped in ceremony. A function component *is* the render method — and hooks give it everything the class had: state (`useState`), lifecycle (`useEffect`), stable refs (`useRef`), memoized functions and values (`useCallback`/`useMemo`), and shared state (`useContext`) — with cleaner, faster, better code.
