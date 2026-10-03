import { useCallback, useEffect, useRef, useState } from 'react';

export function useProctor({ max = 3, onLimit } = {}) {
  const [active, setActive] = useState(false);
  const [viol, setViol] = useState(0);
  const [warning, setWarning] = useState('');
  const [limitHit, setLimitHit] = useState(false);
  const [isFs, setIsFs] = useState(false);
  const streamRef = useRef(null);
  const videoRef = useRef(null);
  const activeRef = useRef(false);
  const violRef = useRef(0);
  const lastRef = useRef(0);
  const limitRef = useRef(onLimit);
  limitRef.current = onLimit;

  const flag = useCallback((msg) => {
    if (!activeRef.current) return;
    const now = Date.now();
    if (now - lastRef.current < 1500) return;
    lastRef.current = now;
    violRef.current += 1;
    setViol(violRef.current);
    if (violRef.current >= max) {
      activeRef.current = false;
      setLimitHit(true);
      setWarning('Warning ' + max + '/' + max + ': ' + msg + '. Limit reached, the test is being submitted.');
      if (limitRef.current) limitRef.current();
    } else {
      setWarning('Warning ' + violRef.current + '/' + max + ': ' + msg + '. At ' + max + ' the test is submitted automatically.');
    }
  }, [max]);

  useEffect(() => {
    if (!active) return undefined;
    const onVis = () => { if (document.hidden) flag('You switched tab or window'); };
    const onBlur = () => flag('The test window lost focus');
    const onFs = () => {
      const on = !!document.fullscreenElement;
      setIsFs(on);
      if (!on) flag('You left full screen');
    };
    document.addEventListener('visibilitychange', onVis);
    window.addEventListener('blur', onBlur);
    document.addEventListener('fullscreenchange', onFs);
    return () => {
      document.removeEventListener('visibilitychange', onVis);
      window.removeEventListener('blur', onBlur);
      document.removeEventListener('fullscreenchange', onFs);
    };
  }, [active, flag]);

  useEffect(() => {
    if (videoRef.current && streamRef.current && videoRef.current.srcObject !== streamRef.current) {
      videoRef.current.srcObject = streamRef.current;
    }
  });

  const start = useCallback(async () => {
    violRef.current = 0;
    setViol(0);
    setWarning('');
    setLimitHit(false);
    lastRef.current = Date.now();
    try { await document.documentElement.requestFullscreen(); } catch (e) { /* refused: shows as not in full screen */ }
    try {
      streamRef.current = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
    } catch (e) {
      if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
      return false;
    }
    const tr = streamRef.current.getVideoTracks()[0];
    if (tr) tr.onended = () => flag('Your camera was turned off');
    setIsFs(!!document.fullscreenElement);
    lastRef.current = Date.now();
    activeRef.current = true;
    setActive(true);
    return true;
  }, [flag]);

  const stop = useCallback(() => {
    activeRef.current = false;
    setActive(false);
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((tr) => { tr.onended = null; tr.stop(); });
      streamRef.current = null;
    }
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
  }, []);

  useEffect(() => () => stop(), [stop]);

  return {
    active, viol, max, warning, limitHit, isFs, videoRef, start, stop,
    clearWarning: () => setWarning(''),
    goFs: () => document.documentElement.requestFullscreen().catch(() => {})
  };
}

export function ProctorPanel({ p }) {
  return (
    <>
      {p.active && (
        <div style={{ position: 'fixed', top: 8, right: 8, zIndex: 1100, width: 150, background: '#12142B', borderRadius: 8, padding: 4 }}>
          <video ref={p.videoRef} autoPlay muted playsInline style={{ width: '100%', borderRadius: 6, display: 'block' }} />
          <div style={{ color: '#fff', fontSize: 12, padding: '4px 2px' }}>Violations: {p.viol} / {p.max}</div>
        </div>
      )}
      {p.warning && (p.active || p.limitHit) && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1200, background: '#c92a2a', color: '#fff', padding: '12px 16px', fontWeight: 600, textAlign: 'center' }}>
          {p.warning}
          <button onClick={p.clearWarning} style={{ marginLeft: 12 }}>OK</button>
        </div>
      )}
      {p.active && !p.isFs && (
        <div style={{ position: 'fixed', bottom: 80, left: '50%', transform: 'translateX(-50%)', zIndex: 1100 }}>
          <button className="primary" onClick={p.goFs}>Return to full screen</button>
        </div>
      )}
    </>
  );
}
