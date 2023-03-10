import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    if (replace) {
      setHistory((prev) => [...prev.slice(0, -1), newMode]);
    } else {
      setHistory((prev) => [...prev, newMode]);
    }
    setMode(newMode);
  }

  function back() {
    if (history.length !== 1) {
      const prevMode = [...history.slice(0, -1)];
      setMode(prevMode[prevMode.length - 1]);
      setHistory((prev) => [...prev.slice(0, - 1)]);
    }
  }
  return { mode, transition, back };
}
