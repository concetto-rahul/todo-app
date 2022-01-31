import { useContext } from "react";
import { VideocallContext } from "../../context/videocall";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@material-ui/core";

import MuteIcon from "@material-ui/icons/MicNoneOutlined";
import UnMuteIcon from "@material-ui/icons/MicOffOutlined";
import VideoOnIcon from "@material-ui/icons/VideocamOutlined";
import VideoOffIcon from "@material-ui/icons/VideocamOffOutlined";

export default function VideocallModal() {
  const {
    videoCallData,
    userVideoRef,
    handleAudioAction,
    handleVideoAction,
    endVideoCall,
    receiveIncomingCall,
    rejectIncomingCall,
  } = useContext(VideocallContext);

  return (
    <div>
      <Dialog open={videoCallData.open} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Video Call</DialogTitle>
        <DialogContent>
          {videoCallData.calling && (
            <Typography variant="h6" className="text-center">
              Calling...
            </Typography>
          )}
          {videoCallData.receivingCall && !videoCallData.callAccepted && (
            <Typography variant="h6" className="text-center">
              {videoCallData.callerName} is calling...
            </Typography>
          )}
          {videoCallData.callAccepted && (
            <>
              <video
                playsInline
                muted
                ref={userVideoRef}
                autoPlay
                style={{ width: "100%", border: "1px solid #000" }}
              />

              <IconButton
                color="primary"
                disabled={false}
                onClick={handleAudioAction}
              >
                {videoCallData.audio ? <MuteIcon /> : <UnMuteIcon />}
              </IconButton>
              <IconButton
                color="primary"
                disabled={false}
                onClick={handleVideoAction}
              >
                {videoCallData.video ? <VideoOnIcon /> : <VideoOffIcon />}
              </IconButton>
            </>
          )}
        </DialogContent>
        <DialogActions>
          {videoCallData.receivingCall && !videoCallData.callAccepted && (
            <>
              <Button onClick={receiveIncomingCall} color="primary">
                Accept Call
              </Button>
              <Button onClick={rejectIncomingCall} color="secondary">
                Reject Call
              </Button>
            </>
          )}

          {videoCallData.calling || videoCallData.callAccepted ? (
            <Button onClick={endVideoCall} color="secondary">
              End Video Call
            </Button>
          ) : (
            ""
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}
