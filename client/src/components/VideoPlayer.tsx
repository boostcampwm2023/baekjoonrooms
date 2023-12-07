import { useRef, useEffect } from 'react';

interface VideoPlayerProps {
  videoSrc: string;
}

export default function VideoPlayer({ videoSrc }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>({} as HTMLVideoElement);

  // 이게 소리가 없는 영상은 자동 재생이 잘 되는데, 소리가 있는 경우에는 브라우저의 정책상 자동 재생이 안 되는 것 같다.
  // 일단 유저 상호작용 후에는 잘 적용됨.
  useEffect(() => {
    const options = {
      threshold: 0.5, // Adjust this threshold based on your preference
    };

    const observer = new IntersectionObserver(handleIntersection, options);

    const currentVideoRef = videoRef.current;

    if (videoRef.current) {
      observer.observe(currentVideoRef);
    }

    return () => {
      if (currentVideoRef) {
        observer.unobserve(currentVideoRef);
      }
    };
  }, []);

  const handleIntersection: IntersectionObserverCallback = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Video is in view, start playing
        if (videoRef.current) {
          videoRef.current.play();
        }
      } else {
        // Video is out of view, pause
        if (videoRef.current) {
          videoRef.current.pause();
        }
      }
    });
  };

  return (
    <div className="video-player overflow-hidden rounded border">
      <video
        ref={videoRef}
        controls
        width="100%"
        height="auto"
        className="h-auto w-full">
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
