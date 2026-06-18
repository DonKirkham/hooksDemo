# React Hooks for SPFx: Build Cleaner, Faster, Better — Demo Script (70 min)

**Speaker:** Don Kirkham — Microsoft MVP, M365 Development & Microsoft Graph
**Session:** TechCon 365 Chicago
**Solution:** `hooksdemo` (SPFx 1.23.0 · React 17.0.1 · Node 22 via fnm alias `spfx-1.23.0`)

This session has **three demos**, each building on the last:

1. **Converting a class component to a function component** (Hello World)
2. **Lifecycle events** — class lifecycle methods vs. hooks (Lifecycle Classic / Hooks)
3. **The Total Package** — one web part that uses all seven hooks from the deck

---

## Web parts used

| Web part            | Component file                                                      | Used in                           |
| ------------------- | ------------------------------------------------------------------- | --------------------------------- |
| Hello World Classic | `src/webparts/helloWorldClassic/components/HelloWorldClassic.tsx` | Demo 1 (reference)                |
| Hello World Hooks   | `src/webparts/helloWorldHooks/components/HelloWorldHooks.tsx`     | Demo 1 (**converted live**) |
| Lifecycle Classic   | `src/webparts/lifecycleClassic/components/LifecycleClassic.tsx`   | Demo 2                            |
| Lifecycle Hooks     | `src/webparts/lifecycleHooks/components/LifecycleHooks.tsx`       | Demo 2                            |
| Total Package       | `src/webparts/totalPackage/...`                                   | Demo 3                            |

> **Hello World Hooks ships as a class on purpose** — it's the canvas you convert live in Demo 1. Confirm it still starts as `export default class HelloWorldHooks extends React.Component<...>` before the talk.

---

## Pre-flight (before the room fills)

1. `eval "$(fnm env)" && fnm use` (or open a terminal where Node 22 is active) — the repo pins Node through the `spfx-1.23.0` fnm alias.
2. `npm run build` once to confirm a clean tree (lint + typecheck + jest all green).
3. Open VS Code tabs in demo order: `HelloWorldClassic.tsx`, `HelloWorldHooks.tsx`, `LifecycleClassic.tsx`, `LifecycleHooks.tsx`, `useTasks.ts`, `useTaskContext.ts`, `TaskContext.ts`, `TotalPackage.tsx`, `TaskList.tsx`, `AddTaskInput.tsx`, `TaskSummary.tsx`.
4. Start the dev server: `npm start` (heft, port 4321, HTTPS). Trust the dev cert if prompted.
5. Open the hosted workbench: `https://<tenant>.sharepoint.com/_layouts/workbench.aspx`.
6. Open the browser console (F12) and dock it — Demos 2 and 3 log there.
7. Keep a clean checkout so you can reset the live edit: `git stash` or `git checkout -- <file>`.

---

## Timing overview (~70 min)

| Time       | Segment                                                                              | Slides     |
| ---------- | ------------------------------------------------------------------------------------ | ---------- |
| 0:00–0:08 | Intro / about me / Solution Foundry                                                  | 1–5       |
| 0:08–0:14 | Agenda + FC/Hooks history                                                            | 6–7       |
| 0:14–0:22 | Class component anatomy (set up Demo 1)                                              | 8          |
| 0:22–0:35 | **Demo 1 — Class → Function Component**                                      | 9–10      |
| 0:35–0:52 | **Demo 2 — Lifecycle events (useState/useEffect/useRef/useCallback)**         | 11–13     |
| 0:52–1:05 | **Demo 3 — The Total Package (all 7 hooks, incl. useMemo/useContext/custom)** | 12, 14–16 |
| 1:05–1:10 | Wrap-up / Q&A / rate the session                                                     | 17         |

---

# Demo 1 — Convert a class component to a function component

**Slides 8–10. ~13 min.**

**Goal:** show the default SPFx class, then convert it to a function component live — "2 lines + cleanup," with no change to the base web part.

### 1a. Set the baseline (slide 8)

1. In the workbench, add **Hello World Classic**. It renders the standard SPFx welcome card.
2. Open `HelloWorldClassic.tsx` and walk the structure:
   - `export default class HelloWorldClassic extends React.Component<IHelloWorldClassicProps>` — class declaration with a typed props generic.
   - `public render(): React.ReactElement<...>` — the one required method; all output lives here.
   - Props are read off `this.props` via destructuring inside `render()`.

### 1b. The live conversion (slide 10)

Open `HelloWorldHooks.tsx` — identical code, but still a **class**. Convert it on screen:

1. **Change the declaration** — replace the class line *and* the `render` line with one arrow function:
   ```ts
   const HelloWorldHooks = (props: IHelloWorldHooksProps): React.ReactElement => {
   ```
2. **Fix the props source** — `this.props` → `props`:
   ```ts
   const { description, isDarkTheme, environmentMessage, hasTeamsContext, userDisplayName } = props;
   ```
3. **Remove the extra closing brace** that used to close the class (the function body ends right after `return ( … );`).
4. **Add the export** at the bottom:
   ```ts
   export default HelloWorldHooks;
   ```
5. Save → watch the rebuild → refresh the workbench. **Hello World Hooks renders identically.**

**Talking points:**

- The base web part (`HelloWorldHooksWebPart.ts`) is **untouched** — `React.createElement(HelloWorldHooks, props)` works whether the component is a class or a function.
- The whole edit: (1) declaration, (2) `this.props` → `props`, (3) drop `render`/closing brace, (4) `export default`.
- Define the terms (slide 9): a **function component** is a JS function that takes props and returns a React element — it *is* the render method. **Hooks** are the `use*` functions that give it state and lifecycle.

**Reset for next run:** `git checkout -- src/webparts/helloWorldHooks/components/HelloWorldHooks.tsx`

---

# Demo 2 — Lifecycle events: class methods vs. hooks

**Slides 11–13. ~17 min.** The two web parts are built to log the **exact same event sequence**, so the comparison is line-for-line.

### 2a. The class version

1. Add **Lifecycle Classic**. Click **Start Count** — the count ticks 0→10 every 500 ms; the **Lifecycle Events** list fills in (also logged to the console).
2. Open `LifecycleClassic.tsx` and walk the four lifecycle methods:
   - `constructor` (initializes `state`, **binds** `handleButtonClick`).
   - `componentDidMount` (logs the mount).
   - `componentDidUpdate(prevProps, prevState)` — diffs `prevState` to figure out *what* changed (count, counting, reached-10).
   - `componentWillUnmount` (clears the timer).
3. Point out the cost: logic is scattered across lifecycle method names, and reacting to a change means manually comparing `prevState`.

### 2b. The hooks version

1. Add **Lifecycle Hooks** — identical behavior and identical event text.
2. Open `LifecycleHooks.tsx` and map class concepts to hooks:

   | Class                                            | Hook                                                                                 | Lines  |
   | ------------------------------------------------ | ------------------------------------------------------------------------------------ | ------ |
   | `this.state` + `setState`                    | `useState` (`events`, `count`, `counting`)                                   | 13–15 |
   | `protected timer` field                        | `useRef` (`timerRef`) — survives renders, no re-render                          | 16     |
   | bound methods                                    | `useCallback` (`addEvent`, `startTimer`, `stopTimer`, `handleButtonClick`) | 20–59 |
   | `componentDidMount` + `componentWillUnmount` | `useEffect(… , [])` with a cleanup `return`                                     | 65–77 |
   | `componentDidUpdate` (counting)                | `useEffect(… , [counting])`                                                       | 80–86 |
   | `componentDidUpdate` (count)                   | `useEffect(… , [count])`                                                          | 89–99 |
3. **Drive home the dependency array (slide 11):**

   - no array → runs after **every** render
   - `[]` → runs **once** on mount; the returned function runs on unmount (= `componentWillUnmount`)
   - `[count]` → runs only when `count` **changes**
4. ~~**useRef (slide 13):** `timerRef` holds the interval id across renders without triggering re-renders — the hooks equivalent of the class's `protected timer` field. Show `timerRef.current = window.setInterval(...)` (line 29) and the cleanup `clearInterval(timerRef.current)` (lines 39, 73).~~
5. ~~**useCallback (slide 12):** the handlers are wrapped so their identity is stable across renders; `handleButtonClick` lists `[count, counting]` so it's only re-created when those change.~~

### 2c. Prove the output matches

Run both to 10 and show the identical tail in the event lists / console:

```
componentDidUpdate: count changed from 9 to 10
Stopping counter
componentDidUpdate: count reached 10
componentDidUpdate: counting changed from true to false
```

And right after mount, both show exactly one update event:

```
constructor: Component is being initialized
componentDidMount: Component has mounted
componentDidUpdate: after mount
```

**Talking point:** class lifecycle logic is grouped *by lifecycle name*; hooks let you group logic *by concern* (one effect per thing you care about) — same behavior, cleaner code.

> **Teaching note:** the hooks version detects "previous" values without a ref (`count - 1`, `!counting`) and guards each effect so it doesn't log on mount. The one place this trades accuracy is the 10→0 restart (not logged as a count change). That's the natural lead-in to "use `useRef` to track the real previous value" — which Demo 3 then leans on for other things.

---

# Demo 3 — The Total Package: all seven hooks in one web part

**Slides 12, 14–16. ~13 min.** A small TODO app that demonstrates every hook from the deck.

1. Add **Total Package**. Type a task, press **Enter** or click **Add Task** — the count and the (alphabetically sorted) list update. Add several. Watch the browser **tab title** and the **console**.
2. **Hook-by-hook tour:**

   | Hook (slide)               | Where                               | What to show                                                                                                               |
   | -------------------------- | ----------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
   | **useState** (11)    | `useTasks.ts:5`                   | `useState<string[]>([])` holds the task list.                                                                            |
   | **useEffect** (11)   | `useTasks.ts:12`                  | On `[tasks]` change: set `document.title` to `(N) My TODO App` + log; **cleanup** resets the title on unmount. |
   | **useContext** (15)  | `useTaskContext.ts` + 3 consumers | A second custom hook wraps `useContext(TaskContext)` and throws if used outside the provider.                            |
   | **useRef** (13)      | `AddTaskInput.tsx:8`              | Uncontrolled input — read/clear `inputRef.current.value`, no state needed.                                              |
   | **useMemo** (14)     | `TaskList.tsx:9`                  | Memoized**sorted** copy of tasks; the `"Sorting tasks..."` log proves it only recomputes when `tasks` change.    |
   | **useCallback** (12) | `useTasks.ts:7`                   | `addTask` memoized so its identity is stable.                                                                            |
   | **Custom hook** (16) | `useTasks.ts`                     | "Just a function that uses built-in hooks." Owns task state + behavior, returns a clean `{ tasks, addTask }`.            |
3. **Context wiring (slide 15):** open `TotalPackage.tsx`:

   ```tsx
   const taskState = useTasks();
   return (
     <TaskContext.Provider value={taskState}>
       <AddTaskInput /><TaskSummary /><TaskList />
     </TaskContext.Provider>
   );
   ```

   Then show all three children getting state via `useTaskContext()` with **zero props passed** — the "no prop-drilling" payoff.
4. **Show the effects live:** add a task → tab title becomes `(1) My TODO App`, console logs `[useTasks] 1 task(s)` and `Sorting tasks...`. Remove the web part → tab title resets (cleanup ran).

**Talking points:**

- Two custom hooks here: `useTasks` (state + side effects) and `useTaskContext` (safe context access). Custom hooks = reusable logic, cleaner components.
- `useMemo` remembers a **value**; `useCallback` remembers a **function** (slide 12 vs 14).
- `useContext` kills prop-drilling (slide 15's big red ✗ over manual prop passing).

---

## Reset / cleanup between sessions

```bash
# Undo the live conversion of HelloWorldHooks
git checkout -- src/webparts/helloWorldHooks/components/HelloWorldHooks.tsx
git status   # confirm nothing else drifted
```

Restart `npm start` if you stopped it.

---

## Fallback if the workbench/dev server fails

- **Cert/trust error:** re-run the dev-cert trust step, or use a workbench tab loaded before the talk.
- **Tenant unreachable (conference Wi-Fi):** use the local workbench at `https://localhost:4321/temp/workbench.html` — no SharePoint context, but all five web parts render.
- **Build break during the live conversion:** `git checkout -- …/HelloWorldHooks.tsx` and narrate the diff from slide 10.
- **Total fallback:** slides 8–16 contain screenshots of every code path.

---

## Close on this (slide 9 callback)

> A class component is a `render()` method wrapped in ceremony. A function component *is* the render method — and hooks give it everything the class had: state (`useState`), lifecycle (`useEffect`), stable refs (`useRef`), memoized functions and values (`useCallback`/`useMemo`), and shared state (`useContext`) — cleaner, faster, better.
