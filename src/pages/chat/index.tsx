import { ReactElement, FC, useContext } from "react";
import { ChatContext } from "../../context/chat";
import Page from "../../components/Page";
import PageDataLoader from "../../components/PageDataLoader";
import { Grid } from "@material-ui/core";

import Login from "./Login";
import Dashboard from "./Dashboard";
import CreateNewContact from "./CreateNewContact";

const Chat: FC<any> = (): ReactElement => {
  const { userID } = useContext(ChatContext);
  return (
    <Page
      title="Chat"
      description="you can view your Chat list"
      key="Chat,list,add,view,abcgfd,sgdgdg"
    >
      <CreateNewContact />
      <PageDataLoader open={false} />
      <Grid container spacing={0}>
        <Grid item xs={12} md={12}>
          {userID ? <Dashboard /> : <Login />}
        </Grid>
      </Grid>
    </Page>
  );
};

export default Chat;
