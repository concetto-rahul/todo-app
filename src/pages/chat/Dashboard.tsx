import { ReactElement, FC } from "react";
import { Typography } from "@material-ui/core";

interface Props {
  userID: string;
}
const Dashboard: FC<Props> = ({userID}): ReactElement => {
  return (
    <>
      <Typography variant="h6">{userID}</Typography>
    </>
  );
};

export default Dashboard;
