import {ReactElement, FC, ReactNode} from "react";
import { Helmet } from 'react-helmet-async';
import { Box } from "@material-ui/core";

interface Props{
    children: ReactNode;
    title?: string;
    description?: string;
    keywords?: string;
}
const Page:FC<Props> = ({children,title="",description="",keywords="", ...other}) : ReactElement => {
    return (
        <Box {...other}>
          <Helmet>
            <title>{title}</title>
            <meta name="description" content={description}/>
            <meta name="keywords" content={keywords} />
          </Helmet>
          {children}
        </Box>
    );
}

export default Page;