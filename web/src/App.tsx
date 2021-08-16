import React, {
  FC,
  memo,
  useReducer,
  useRef,
  useEffect,
} from "react";
import {
  createSmartappDebugger,
  createAssistant,
  AssistantAppState,
} from "@sberdevices/assistant-client";
import "./App.css";

import { reducer } from "./store";

const initializeAssistant = (getState: any) => {
  if (process.env.NODE_ENV === "development") {
    return createSmartappDebugger({
      token: process.env.REACT_APP_TOKEN ?? "",
      initPhrase: `Запусти ${process.env.REACT_APP_SMARTAPP}`,
      getState,
    });
  }

  return createAssistant({ getState });
};

export const App: FC = memo(() => {
  const [appState, dispatch] = useReducer(reducer, {
    popit: 0,
  });

  const assistantStateRef = useRef<AssistantAppState>();
  const assistantRef = useRef<ReturnType<typeof createAssistant>>();

  useEffect(() => {
    assistantRef.current = initializeAssistant(() => assistantStateRef.current);

    assistantRef.current.on("data", ({ action }: any) => {
      if (action) {
        dispatch(action);
      }
    });
  }, []);

  const onPopIt = (event:any) => {
    const sound = new Audio("./popit.mp3");

    const target = event.target;
    if (!target.matches(".circle")) {
      return;
    }

    sound.pause();
    sound.currentTime = 0;
    sound.play();
    target.classList.toggle("pressed");
  }

  return (
    <main className="container">
      <div className="title">POP IT</div>
      <div id="popit" className="popit">
        <div className="r">
          <button onClick={onPopIt} className="circle r" />
          <button onClick={onPopIt} className="circle r" />
          <button onClick={onPopIt} className="circle r" />
          <button onClick={onPopIt} className="circle r" />
          <button onClick={onPopIt} className="circle r" />
        </div>
        <div className="o">
          <button onClick={onPopIt} className="circle o" />
          <button onClick={onPopIt} className="circle o" />
          <button onClick={onPopIt} className="circle o" />
          <button onClick={onPopIt} className="circle o" />
          <button onClick={onPopIt} className="circle o" />
        </div>
        <div className="y">
          <button onClick={onPopIt} className="circle y" />
          <button onClick={onPopIt} className="circle y" />
          <button onClick={onPopIt} className="circle y" />
          <button onClick={onPopIt} className="circle y" />
          <button onClick={onPopIt} className="circle y" />
        </div>
        <div className="g">
          <button onClick={onPopIt} className="circle g" />
          <button onClick={onPopIt} className="circle g" />
          <button onClick={onPopIt} className="circle g" />
          <button onClick={onPopIt} className="circle g" />
          <button onClick={onPopIt} className="circle g" />
        </div>
        <div className="b">
          <button onClick={onPopIt} className="circle b" />
          <button onClick={onPopIt} className="circle b" />
          <button onClick={onPopIt} className="circle b" />
          <button onClick={onPopIt} className="circle b" />
          <button onClick={onPopIt} className="circle b" />
        </div>
        <div className="p">
          <button onClick={onPopIt} className="circle p" />
          <button onClick={onPopIt} className="circle p" />
          <button onClick={onPopIt} className="circle p" />
          <button onClick={onPopIt} className="circle p" />
          <button onClick={onPopIt} className="circle p" />
        </div>
      </div>
    </main>
  );
});
