import React, {
  FC,
  memo,
  useReducer,
  useRef,
  useEffect,
  useState,
} from "react";
import {
  createSmartappDebugger,
  createAssistant,
  AssistantAppState,
} from "@sberdevices/assistant-client";
import "./App.css";

import { reducer } from "./store";

declare global {
  interface Window {
    SberDevicesAdSDK:any;
  }
}

const { initWithAssistant, runVideoAd, isInited } = window.SberDevicesAdSDK;

const IS_DEVELOPMENT = process.env.NODE_ENV === "development";
const DEV_TOKEN:any = process.env.REACT_APP_DEV_TOKEN;
const DEV_PHRASE:any = process.env.REACT_APP_DEV_PHRASE;

// const sound = new Audio("./popit.mp3");
const initializeAssistant = (getState: any) => {
  if (IS_DEVELOPMENT) {
    return createSmartappDebugger({
      token: DEV_TOKEN,
      initPhrase: DEV_PHRASE,
      getState,
    });
  }

  return createAssistant({ getState });
};

export const App: FC = memo(() => {
  const [appState, dispatch] = useReducer(reducer, {
    popit: 0,
  });
  const [clicks, setClicks] = useState(0);
  const [popup, setPopup] = useState('');

  const assistantStateRef = useRef<AssistantAppState>();
  const assistantRef = useRef<ReturnType<typeof createAssistant>>();

  useEffect(() => {

    assistantRef.current = initializeAssistant(() => assistantStateRef.current);

    assistantRef.current.on("data", ({ action }: any) => {
      if (action) {
        dispatch(action);
      }
    });

    initWithAssistant({
      assistant: assistantRef.current,
      onSuccess: () => console.log('AdSdk Inited'),
      onError: (err:any) => console.log('AdSdk Init Error', err),
    });

    setInterval(() => {
      setClicks(0);
    }, 2000);
  }, []);

  const onPopIt = (event:any) => {
    setClicks(clicks => clicks + 1);
    if (clicks > 5) {
      setPopup('soFast');
    } else {
      const target = event.target;
      if (!target.matches(".circle")) {
        return;
      }
  
      // sound.pause();
      // sound.currentTime = 0;
      // sound.play();
      let element: any = document.getElementById('bells') as HTMLElement;
      element.currentTime = 0;
      element.play();
  
      target.classList.toggle("pressed");
    }
  }

  return (
    <main className="container">
      <audio id="bells" src="popit.mp3" />
      {popup === 'soFast' && (
        <div className="popup">
    			<div className="popup_content">
            <div className="popup_title">Воу воу не так быстро</div>
            <div className="popup_text">Попыт направлен на ycпoкoeние, paccлaблeние, cнятие тpeвoжнocти</div>
            <button
              className="btn"
              onClick={() => {
                setPopup('');
                setClicks(0);
                if (isInited()) {
                  runVideoAd({
                    onSuccess: () => console.log('Banner success'),
                    onError: (err:any) => console.log('Banner Error', err),
                    mute: false,
                  });
                }
              }}
            >Хорошо</button>
    			</div>
    		</div>
      )}
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
