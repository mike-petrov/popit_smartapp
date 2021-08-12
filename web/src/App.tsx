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

    const popit:any = document.getElementById("popit");

    const sound = new Audio(
      "https://freesound.org/data/previews/399/399934_1676145-lq.mp3"
    );

    popit.onclick = function (event:any) {
      const target = event.target;
      if (!target.matches(".circle")) {
        return;
      }

      sound.pause();
      sound.currentTime = 0;
      sound.play();
      if ("vibrate" in navigator) {
        navigator.vibrate(100);
      }
      target.classList.toggle("pressed");
    };
  }, []);

  return (
    <main className="container">
      <div className="title">POP IT</div>
      <div id="popit" className="popit">
        <div className="r">
          <button className="circle r" />
          <button className="circle r" />
          <button className="circle r" />
          <button className="circle r" />
          <button className="circle r" />
        </div>
        <div className="o">
          <button className="circle o" />
          <button className="circle o" />
          <button className="circle o" />
          <button className="circle o" />
          <button className="circle o" />
        </div>
        <div className="y">
          <button className="circle y" />
          <button className="circle y" />
          <button className="circle y" />
          <button className="circle y" />
          <button className="circle y" />
        </div>
        <div className="g">
          <button className="circle g" />
          <button className="circle g" />
          <button className="circle g" />
          <button className="circle g" />
          <button className="circle g" />
        </div>
        <div className="b">
          <button className="circle b" />
          <button className="circle b" />
          <button className="circle b" />
          <button className="circle b" />
          <button className="circle b" />
        </div>
        <div className="p">
          <button className="circle p" />
          <button className="circle p" />
          <button className="circle p" />
          <button className="circle p" />
          <button className="circle p" />
        </div>
      </div>
    </main>
  );
});
