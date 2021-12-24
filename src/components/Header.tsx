import {ReactElement, FC} from "react";
import { Typography } from "@material-ui/core";

interface Props{
    title: String
}
const Header:FC<Props> = ({title}) : ReactElement => {
    return (
        <Typography variant="h6" noWrap component="div">
            {title}
        </Typography>
    )
}

export default Header;