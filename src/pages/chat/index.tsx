import { ReactElement, FC, useState } from "react";
import Page from "../../components/Page";
import PageDataLoader from "../../components/PageDataLoader";
import { Grid } from "@material-ui/core";

import Login from "./Login";
import Dashboard from "./Dashboard";

const Chat: FC<any> = (): ReactElement => {
  const userID = localStorage.getItem("chat-userID") || null;
  console.log(userID);
  return (
    <Page
      title="Chat"
      description="you can view your Chat list"
      key="Chat,list,add,view,abcgfd,sgdgdg"
    >
      <PageDataLoader open={false} />
      <Grid container spacing={0}>
        <Grid item xs={12} md={12}>
          {userID ? <Dashboard userID={userID} /> : <Login />}
        </Grid>
      </Grid>
    </Page>
  );
};

export default Chat;
