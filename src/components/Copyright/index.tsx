import Link from '@mui/material/Link';
import { Typography } from "@mui/material";

export const Copyright = (props: any) => {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="#">
                TurboFit
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}