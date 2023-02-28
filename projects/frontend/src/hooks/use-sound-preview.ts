import { useState, useEffect, useCallback } from 'react';

export default function useSoundPreview() {
  const [previewVolume, setPreviewVolume] = useState('1');
  const [previewGain, setPreviewGain] = useState<GainNode | null>(null);
  const [soundVolume, setSoundVolume] = useState('1');
  useEffect(() => {
    if (previewGain)
      previewGain.gain.value = Number(soundVolume) >= 1 ? Number(previewVolume) - (1 - Number(soundVolume)) : Number(previewVolume) * (Number(soundVolume));
  }, [previewVolume, previewGain, soundVolume]);

  const soundPreview = useCallback(async (url: string, volumeOffset?: string) => {
    const audioRes = await fetch(url);
    const resBuffer = await audioRes.arrayBuffer();
    const context = new AudioContext();
    const gain = context.createGain();

    setSoundVolume(volumeOffset || '1');
    setPreviewGain(gain);

    await context.decodeAudioData(resBuffer, buffer => {
      const source = context.createBufferSource();
      source.buffer = buffer;
      source.connect(gain).connect(context.destination);
      source.start(0);
    });
  }, [previewVolume]);

  return { soundPreview, setPreviewVolume };
}
