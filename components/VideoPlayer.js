import { useRef } from "react";
import { Video, CloudinaryContext } from "cloudinary-react";

const VideoPlayer = () => {
  const videoRef = useRef();
  return (
    <CloudinaryContext cloud_name="erikna7">
      <Video
        publicId="rps-next/rps_agwmll"
        width="100%"
        innerRef={videoRef}
        autoPlay
        loop
        muted   
        secure="true"      
      />
    </CloudinaryContext>
  );
};

export default VideoPlayer;