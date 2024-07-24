import { useEffect, useRef } from 'react';

import { StreamManager } from 'openvidu-browser';

interface Props {
  streamManager: StreamManager;
}

export default function Video({ streamManager }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const autoplay = true;

  useEffect(() => {
    if (streamManager && videoRef.current) {
      streamManager.addVideoElement(videoRef.current);
    }
  }, [streamManager]);

  return (
    <div className="relative w-full h-full overflow-hidden rounded-lg shadow-lg">
      <video
        autoPlay={autoplay}
        ref={videoRef}
        className="object-cover w-full h-full"
      >
        <track kind="captions" />
      </video>
    </div>
  );
}
