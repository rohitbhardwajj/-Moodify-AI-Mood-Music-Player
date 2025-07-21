// MoodOverlayPlayer.jsx
import React, { useRef, useEffect, useImperativeHandle, forwardRef } from 'react';
import * as faceapi from 'face-api.js';
import './MoodOverlayPlayer.scss';
import FullscreenMood from './FullscreenMood';

const MoodOverlayPlayer = forwardRef((props, ref) => {
  const videoRef = useRef();

  const loadModels = async () => {
    const MODEL_URL = '/models';
    await Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
      faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
    ]);
    console.log("✅ Models loaded");
  };

  const startVideo = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("❌ Error starting camera:", err);
    }
  };

  const detectMood = async () => {
    if (videoRef.current) {
      const result = await faceapi
        .detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
        .withFaceExpressions();

      if (result && result.expressions) {
        const expressions = result.expressions;
        const topMood = Object.keys(expressions).reduce((a, b) =>
          expressions[a] > expressions[b] ? a : b
        );
        console.log(`🔥 Dominant Mood: ${topMood.toUpperCase()}`);
      } else {
        console.log("😐 No face detected");
      }
    }
  };

  // Expose detectMood to parent
  useImperativeHandle(ref, () => ({
    detectMood,
  }));

  useEffect(() => {
    loadModels().then(() => {
      startVideo();
    });
  }, []);

  return (
    <div className="containerVideo">
      <video ref={videoRef} autoPlay muted className='video' />
    </div>
  
  );
});

export default MoodOverlayPlayer;
