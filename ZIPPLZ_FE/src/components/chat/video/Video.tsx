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
    <>
      <video
        autoPlay={autoplay}
        ref={videoRef}
        className="flex justify-center object-cover w-full h-full overflow-hidden basis-1/2 bg-zp-main-color rounded-zp-radius-big"
      >
        <track kind="captions" />
      </video>
    </>
  );
}
