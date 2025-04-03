import { Box, Grid, IconButton, Typography } from "@mui/material";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import DownloadIcon from "@mui/icons-material/Download";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import ElectricBoard from "../../assets/ElectricBoard.pdf";
import "./NewsLetterBlock.css";

const NewsLetterBlock = ({ item }) => {
    const handleDownload = () => {
        const url = ElectricBoard;
        const a = document.createElement("a");
        a.href = url;
        a.download = "ElectricBoard.pdf";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    const handleOpen = () => {
        const url = ElectricBoard;
        const a = document.createElement("a");
        a.href = url;
        a.target = "_blank";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    return (
        <Grid className="newsletter-block" size={6}>
            <Box className="newsletter-content">
                <Typography variant="subtitle1">{item.heading}</Typography>
                <Typography variant="body2">{item.description}</Typography>
                <Typography variant="body2">Date: {item.date}</Typography>
            </Box>
            <Box className="newsletter-footer">
                <Box className="newsletter-file-container">
                    <Box className="file-info">
                        <InsertDriveFileIcon />
                        <Typography variant="caption">Sample PDF DOC</Typography>
                    </Box>
                    <Box>
                        <IconButton onClick={handleDownload} className="icon-button">
                            <DownloadIcon />
                        </IconButton>
                        <IconButton onClick={handleOpen} className="icon-button">
                            <OpenInNewIcon />
                        </IconButton>
                    </Box>
                </Box>
            </Box>
        </Grid>
    );
};

export default NewsLetterBlock;