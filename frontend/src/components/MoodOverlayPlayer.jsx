// MoodOverlayPlayer.jsx

import React, {
  useRef,
  useEffect,
  useImperativeHandle,
  forwardRef,
  useContext,
  useState,
} from 'react';
import * as faceapi from 'face-api.js';
import './MoodOverlayPlayer.scss';
import { AppContext } from '../context/AppContext';

const MoodOverlayPlayer = forwardRef((props, ref) => {
  const videoRef = useRef();
  const { setMood, setShowMoodOverlay } = useContext(AppContext);
  const [errorMsg, setErrorMsg] = useState('');

  const loadModels = async () => {
    const MODEL_URL = '/models';
    try {
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
      ]);
      console.log('✅ Models loaded');
    } catch (err) {
      console.error('❌ Failed to load models:', err);
    }
  };

  const startVideo = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error('❌ Error starting camera:', err);
    }
  };

  const detectMood = async () => {
    setErrorMsg(''); // clear old errors
    if (!videoRef.current) return;

    const result = await faceapi
      .detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
      .withFaceExpressions();

    if (result?.expressions) {
      const expressions = result.expressions;
      const topMood = Object.keys(expressions).reduce((a, b) =>
        expressions[a] > expressions[b] ? a : b
      );
      setMood(topMood);
      setShowMoodOverlay(true);
      console.log('🔥 Mood detected:', topMood);
    } else {
      console.log('😐 No face detected');
      setErrorMsg('😐 Please show your face clearly to the camera.');
    }
  };

  useImperativeHandle(ref, () => ({ detectMood }));

  useEffect(() => {
    loadModels().then(() => startVideo());
  }, []);

  return (
    <div className="containerVideo">
      <video ref={videoRef} autoPlay muted className="video" />
      {errorMsg && <p className="errorText">{errorMsg}</p>}
    </div>
  );
});

export default MoodOverlayPlayer;
