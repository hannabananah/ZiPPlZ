import { useEffect, useRef } from 'react';

import { StreamManager } from 'openvidu-browser';

interface Props {
  streamManager: StreamManager;
}

export default function Video({ streamManager }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (streamManager && videoRef.current) {
      streamManager.addVideoElement(videoRef.current);
    }
  }, [streamManager]);

  return (
    <video
      autoPlay
      ref={videoRef}
      className="flex justify-center object-cover w-full h-full overflow-hidden max-h-[380px] rounded-zp-radius-big"
    >
      <track kind="captions" />
    </video>
  );
}
