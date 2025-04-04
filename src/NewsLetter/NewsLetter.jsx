import { Box, Grid, Typography } from "@mui/material";
import NewsLetterBlock from "./NewsLetterBlock.jsx";
import "./NewsLetter.css";

const NewsLetterItems = [
    { heading: "Vol III Issue 8", description: "NewsLetterItem 1", date: "4/2/2025" },
    { heading: "Vol III Issue 4", description: "NewsLetterItem 2", date: "4/1/2025" },
    { heading: "Vol II Issue 4", description: "NewsLetterItem 3", date: "3/30/2025" },
    { heading: "Vol II Issue 3", description: "NewsLetterItem 4", date: "3/15/2025" },
    { heading: "Vol II Issue 2", description: "NewsLetterItem 5", date: "3/3/2025" },
    { heading: "Vol II Issue 1", description: "NewsLetterItem 6", date: "2/25/2025" },
    { heading: "Vol I Issue 4", description: "NewsLetterItem 7", date: "2/5/2025" },
    { heading: "Vol I Issue 3", description: "NewsLetterItem 8", date: "1/15/2025" },
    { heading: "Vol I Issue 2", description: "NewsLetterItem 9", date: "12/13/2024" },
];

const NewsLetter = () => {
    return (
        <Box className="newsletter-container">
            <Box className="newsletter-header">
                <Typography variant="h4" sx={{ fontWeight: 600, letterSpacing: 1 }}>
                    NEWSLETTER - THE FACTS
                </Typography>
                <Typography variant="subtitle1" sx={{ mt: 1.5, opacity: 0.8 }}>
                    Latest updates and announcements
                </Typography>
            </Box>
            <Grid container spacing={3} justifyContent="center">
                {NewsLetterItems.map((item, index) => (
                    <NewsLetterBlock key={index} item={item} />
                ))}
            </Grid>
        </Box>
    );
};

export default NewsLetter;