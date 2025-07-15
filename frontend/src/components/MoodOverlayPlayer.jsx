import React, { useRef, useEffect } from 'react';
import * as faceapi from 'face-api.js';

export default function FacialExpression() {
  const videoRef = useRef();

  // Load face-api.js models
  const loadModels = async () => {
    const MODEL_URL = '/models';
    await Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
      faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
    ]);
    console.log("✅ Models loaded");
  };

  // Start webcam
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

  // Mood detection every 1 second
  const detectMood = () => {
    setInterval(async () => {
      if (videoRef.current) {
        const result = await faceapi
          .detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
          .withFaceExpressions();

        if (result && result.expressions) {
          const expressions = result.expressions;

          console.clear(); // Optional: clears previous logs
          console.log("🎯 Expression Confidence (%):");
          Object.entries(expressions).forEach(([mood, confidence]) => {
            console.log(`${mood.toUpperCase()}: ${(confidence * 100).toFixed(2)}%`);
          });

          const topMood = Object.keys(expressions).reduce((a, b) =>
            expressions[a] > expressions[b] ? a : b
          );
          console.log(`🔥 Dominant Mood: ${topMood.toUpperCase()}`);
        } else {
          console.log("😐 No face detected");
        }
      }
    }, 1000); // every 1 sec
  };

  // When component mounts
  useEffect(() => {
    loadModels().then(() => {
      startVideo();
      detectMood();
    });
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h2>🧠 Mood Detection (Console Log)</h2>
      <video ref={videoRef} autoPlay muted width="720" height="560" />
    </div>
  );
}
