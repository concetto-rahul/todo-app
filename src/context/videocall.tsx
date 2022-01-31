import {
  createContext,
  FC,
  ReactElement,
  useState,
  useEffect,
  useContext,
  useRef,
} from "react";
import { Snackbar, IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import Peer from "simple-peer";
import { SocketContext } from "./socket";
import { ChatContext } from "./chat";

export interface VideocallContextType {
  videoCallData: any;
  userVideoRef: any;
  videoConnectionRef: any;
  handleVideoCall: () => void;
  handleAudioAction: () => void;
  handleVideoAction: () => void;
  endVideoCall: () => void;
  receiveIncomingCall: () => void;
  rejectIncomingCall: () => void;
}

const VideocallContext = createContext<VideocallContextType>({
  videoCallData: {},
  userVideoRef: "",
  videoConnectionRef: "",
  handleVideoCall: () => {},
  handleAudioAction: () => {},
  handleVideoAction: () => {},
  endVideoCall: () => {},
  receiveIncomingCall: () => {},
  rejectIncomingCall: () => {},
});

interface videoCallData {
  open: boolean;
  audio: boolean;
  video: boolean;
  calling: boolean;
  receivingCall: boolean;
  callerID: string;
  callerName: string;
  callerSingnal: any;
  callAccepted: boolean;
  callEnded: boolean;
}

const VideocallContextProvider: FC<any> = ({ id, children }): ReactElement => {
  const { socket } = useContext(SocketContext);
  const { userID, userName, selectConversationUserID } =
    useContext(ChatContext);

  const selectedConversationUserIDs = selectConversationUserID
    ? selectConversationUserID.split(",")
    : [];

  const [videoCallData, setVideoCallData] = useState({
    open: false,
    audio: true,
    video: true,
    calling: false,
    receivingCall: false,
    callerID: "",
    callerName: "",
    callerSingnal: "",
    callAccepted: false,
    callEnded: false,
  });

  const [myVideoStream, setMyVideoStream] = useState<any>();
  const [messageAlert, setMessageAlert] = useState(false);

  console.log("videoCallData", videoCallData);

  const userVideoRef = useRef<any>();
  const videoConnectionRef = useRef<any>();

  useEffect(() => {
    socket.on("callUser", (data: any) => {
      setVideoCallData((callerData) => ({
        ...callerData,
        open: true,
        receivingCall: true,
        callerID: data.fromID,
        callerName: data.name,
        callerSingnal: data.signal,
      }));
    });
  }, []);

  const stopStreamVideo = () => {
    myVideoStream &&
      myVideoStream.getTracks().forEach((track: any) => {
        if (track.readyState == "live") {
          track.stop();
        }
      });

    setVideoCallData((callerData) => ({
      ...callerData,
      open: false,
      audio: true,
      video: false,
      receivingCall: false,
      callerID: "",
      callerName: "",
      callerSingnal: "",
      callAccepted: false,
      callEnded: false,
    }));
  };

  const handleVideoCall = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setVideoCallData((callerData) => ({
          ...callerData,
          open: true,
          calling: true,
        }));
        setMyVideoStream(stream);

        const peer = new Peer({
          initiator: true,
          trickle: false,
          stream: stream,
        });

        peer.on("signal", (signalData: any) => {
          socket.emit("callUser", {
            toIDs: selectedConversationUserIDs,
            signalData: signalData,
            fromID: userID,
            name: userName,
          });

          socket.on("callRejected", (data: any) => {
            console.log("callRejected", data);
            stopStreamVideo();
            setMessageAlert(true);
          });

          socket.on("callDisconnect", (data: any) => {
            console.log("callDisconnect", data);
            stopStreamVideo();
            setMessageAlert(true);
          });
        });

        peer.on("stream", (userStream: any) => {
          userVideoRef.current.srcObject = userStream;
        });

        socket.on("callAccepted", (signal: any) => {
          setVideoCallData((callerData) => ({
            ...callerData,
            callAccepted: true,
          }));
          peer.signal(signal);
        });

        videoConnectionRef.current = peer;
      });
  };

  const handleAudioAction = () => {
    setVideoCallData((callerData) => {
      if (myVideoStream)
        myVideoStream.getAudioTracks()[0].enabled = !callerData.video;
      return { ...callerData, audio: !callerData.audio };
    });
  };

  const handleVideoAction = () => {
    setVideoCallData((callerData) => {
      if (myVideoStream)
        myVideoStream.getVideoTracks()[0].enabled = !callerData.video;
      return { ...callerData, video: !callerData.video };
    });
  };

  const receiveIncomingCall = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setVideoCallData((callerData) => ({
          ...callerData,
          callAccepted: true,
        }));
        setMyVideoStream(stream);

        const peer2 = new Peer({
          initiator: false,
          trickle: false,
          stream: stream,
        });

        peer2.on("signal", (data: any) => {
          socket.emit("answerCall", {
            signal: data,
            toID: videoCallData.callerID,
          });

          socket.on("callDisconnect", (data: any) => {
            console.log("callDisconnect", data);
            stopStreamVideo();
            setMessageAlert(true);
          });
        });

        peer2.on("stream", (userStream2: any) => {
          userVideoRef.current.srcObject = userStream2;
        });

        peer2.signal(videoCallData.callerSingnal);

        videoConnectionRef.current = peer2;
      });
  };

  const endVideoCall = () => {
    socket.emit("endCall", videoCallData.callerID);
    stopStreamVideo();
  };

  const rejectIncomingCall = () => {
    socket.emit("rejectCall", videoCallData.callerID);
    stopStreamVideo();
  };

  const handleMessageAlertClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setMessageAlert(false);
  };

  return (
    <VideocallContext.Provider
      value={{
        videoCallData,
        userVideoRef,
        videoConnectionRef,
        handleVideoCall,
        handleAudioAction,
        handleVideoAction,
        endVideoCall,
        receiveIncomingCall,
        rejectIncomingCall,
      }}
    >
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={messageAlert}
        autoHideDuration={6000}
        onClose={handleMessageAlertClose}
        message="Call disconnected"
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleMessageAlertClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
      {children}
    </VideocallContext.Provider>
  );
};

export { VideocallContext, VideocallContextProvider };
