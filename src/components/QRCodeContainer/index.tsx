import * as React from "react"
import { Typography } from "@material-ui/core";
import { TitleQRCode } from "./QRCodeContainer.styles";
import QRCode from 'qrcode';



export const QRCodeContainer = () => {
    const referenceCanvas = React.useRef<HTMLCanvasElement>(null);
    React.useEffect(() => {
        QRCode.toCanvas(referenceCanvas.current, "https://agende-me.vercel.app", (err) => {
            console.log(err)
        })
    }, [])

    return (
        <React.Fragment>
            <Typography component="div" align="center" >
                <TitleQRCode sx={{ color: "#FFF" }}>
                    Agendamento de aulas
                </TitleQRCode>
                <Typography
                    component="canvas"
                    variant="caption"
                    id="canvas"
                    ref={referenceCanvas}>
                </Typography>
            </Typography>
        </React.Fragment >
    );
}