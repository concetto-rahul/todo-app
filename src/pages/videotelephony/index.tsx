import { ReactElement, FC, useEffect, useState, useRef } from "react";
import Page from "../../components/Page";
import PageDataLoader from "../../components/PageDataLoader";
import {
  Grid,
  Typography,
  IconButton,
  TextField,
  Button,
  Box,
} from "@material-ui/core";

import MuteIcon from "@material-ui/icons/MicNoneOutlined";
import UnMuteIcon from "@material-ui/icons/MicOffOutlined";
import VideoOnIcon from "@material-ui/icons/VideocamOutlined";
import VideoOffIcon from "@material-ui/icons/VideocamOffOutlined";

import Peer from "simple-peer";
import io from "socket.io-client";
const socket = io("http://localhost:5000");

const Videotelephony: FC<any> = (): ReactElement => {
  const [myCallingID, setMyCallingID] = useState("");
  const [myCallingName, setMyCallingName] = useState("");
  const [muteMyVideo, setMuteMyVideo] = useState(true);
  const [onMyVideoStream, setOnMyVideoStream] = useState(true);

  const [myStream, setMyStream] = useState<any>();
  const [callerID, setCallerID] = useState("");
  const [callerData, setCallerData] = useState({
    receivingCall: false,
    callerID: "",
    callerName: "",
    callerSingnal: "",
    callAccepted: false,
    callEnded: false,
  });

  console.log(myStream && myStream.getTracks());

  const myStreamRef = useRef<any>();
  const userVideoRef = useRef<any>();
  const videoConnectionRef = useRef<any>();

  useEffect(() => {
    socket.on("me", (id) => {
      setMyCallingID(id);
    });

    socket.on("callUser", (data) => {
      console.log("callUsercallUsercallUser", data);
      setCallerData({
        ...callerData,
        receivingCall: true,
        callerID: data.fromID,
        callerName: data.name,
        callerSingnal: data.signal,
      });
    });
  }, []);

  useEffect(() => {
    if (myStream) myStream.getAudioTracks()[0].enabled = muteMyVideo;
  }, [muteMyVideo]);

  useEffect(() => {
    if (myStream) myStream.getVideoTracks()[0].enabled = onMyVideoStream;
  }, [onMyVideoStream]);

  const handleAudioAction = () => {
    setMuteMyVideo((muteMyVideo) => !muteMyVideo);
  };

  const handleVideoStreamAction = () => {
    setOnMyVideoStream((onMyVideoStream) => !onMyVideoStream);
  };

  const callUser = () => {
    if (myCallingName.length > 0 && callerID.length > 10) {
      if (myCallingID !== callerID) {
        navigator.mediaDevices
          .getUserMedia({ video: true, audio: true })
          .then((stream) => {
            setCallerID("");
            setMyStream(stream);
            myStreamRef.current.srcObject = stream;

            const peer = new Peer({
              initiator: true,
              trickle: false,
              stream: stream,
            });

            peer.on("signal", (data: any) => {
              socket.emit("callUser", {
                toID: callerID,
                signalData: data,
                fromID: myCallingID,
                name: myCallingName,
              });
            });

            peer.on("stream", (userStream: any) => {
              console.log("1", userStream);
              userVideoRef.current.srcObject = userStream;
            });

            socket.on("callAccepted", (signal) => {
              console.log("callAcceptedcallAcceptedcallAccepted");
              setCallerData({
                ...callerData,
                callAccepted: true,
              });
              peer.signal(signal);
            });

            videoConnectionRef.current = peer;
          });
      } else {
        alert("Please provide valid caller ID.");
      }
    } else {
      alert("Please provide valid caller ID and your name.");
    }
  };

  const answerCall = async () => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setCallerID("");
        setMyStream(stream);
        myStreamRef.current.srcObject = stream;

        setCallerData({
          ...callerData,
          callAccepted: true,
        });

        const peer2 = new Peer({
          initiator: false,
          trickle: false,
          stream: stream,
        });

        peer2.on("signal", (data: any) => {
          socket.emit("answerCall", {
            signal: data,
            toID: callerData.callerID,
          });
        });

        peer2.on("stream", (userStream2: any) => {
          console.log("2", userStream2);
          userVideoRef.current.srcObject = userStream2;
        });

        peer2.signal(callerData.callerSingnal);

        videoConnectionRef.current = peer2;
      });
  };

  const leaveCall = () => {
    setCallerData({
      ...callerData,
      callEnded: true,
      callAccepted: false,
      receivingCall: false,
      callerID: "",
      callerName: "",
      callerSingnal: "",
    });
    videoConnectionRef.current.destroy();
  };

  return (
    <Page
      title="Videotelephony"
      description="you can view your Videotelephony list"
      key="Videotelephony,list,add,view,abcgfd,sgdgdg"
    >
      <PageDataLoader open={false} />
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} style={{ marginBottom: "15px" }}>
          <Typography variant="h4">My ID:- {myCallingID}</Typography>
        </Grid>
        <Grid item xs={12} md={6} style={{ marginBottom: "15px" }}>
          <TextField
            id="standard-basic"
            label="My Name Is"
            variant="standard"
            value={myCallingName}
            onChange={(e) => setMyCallingName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <video
            playsInline
            ref={myStreamRef}
            autoPlay
            style={{ width: "100%", border: "1px solid #000" }}
          />
          {myStream && (
            <>
              <IconButton
                color="primary"
                disabled={myStream ? false : true}
                onClick={handleAudioAction}
              >
                {muteMyVideo ? <MuteIcon /> : <UnMuteIcon />}
              </IconButton>
              <IconButton
                color="primary"
                disabled={myStream ? false : true}
                onClick={handleVideoStreamAction}
              >
                {onMyVideoStream ? <VideoOnIcon /> : <VideoOffIcon />}
              </IconButton>
            </>
          )}
        </Grid>
        <Grid item xs={12} md={6}>
          <Grid container spacing={2}>
            {callerData.callAccepted && !callerData.callEnded ? (
              <>
                <video
                  playsInline
                  muted
                  ref={userVideoRef}
                  autoPlay
                  style={{ width: "100%", border: "1px solid #000" }}
                />
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={leaveCall}
                >
                  End Call
                </Button>
              </>
            ) : (
              <>
                <Grid item xs={8} md={8}>
                  <TextField
                    id="standard-basic"
                    label="Enter Caller ID"
                    variant="standard"
                    fullWidth
                    value={callerID}
                    onChange={(e) => setCallerID(e.target.value)}
                  />
                </Grid>
                <Grid item xs={4} md={4}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={callUser}
                  >
                    Call User
                  </Button>
                </Grid>

                <Grid item xs={12} md={12}>
                  {callerData.receivingCall && !callerData.callAccepted ? (
                    <Box style={{ marginTop: "20px" }}>
                      <Typography variant="h6">
                        {callerData.callerName} is calling...
                      </Typography>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={answerCall}
                      >
                        Answer
                      </Button>
                    </Box>
                  ) : null}
                </Grid>
              </>
            )}
            <Grid item xs={12} md={12}></Grid>
          </Grid>
        </Grid>
      </Grid>
    </Page>
  );
};

export default Videotelephony;
