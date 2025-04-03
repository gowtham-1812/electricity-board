import { useState } from "react";
import { Button, TextField, Typography, Paper, Box } from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import "./RegisterMobileNumber.css";

export const RegisterMobileNumber = () => {
    const [formData, setFormData] = useState({
        consumerNo: "",
        billNo: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const submitForm = () => {
        console.log("submit", formData);
    };

    return (
        <Box className="base">
            <Paper elevation={3} className="screen">
                <Typography 
                    variant="h6" 
                    className="header"
                    sx={{
                        backgroundColor: "primary.main",
                        color: "white",
                        py: 2,
                        px: 3,
                        borderRadius: 1,
                        mb: 2
                    }}
                >
                    Register Mobile Number
                </Typography>
                <Box className="subHeader" sx={{ mb: 3 }}>
                    <DescriptionIcon sx={{ color: "warning.main", mr: 1 }} fontSize="medium" />
                    <Typography variant="subtitle1" className="billDetails">
                        Enter Bill Details
                    </Typography>
                </Box>
                <Box className="formSection" sx={{ width: '100%' }}>
                    <Box className="formItem" sx={{ mb: 3 }}>
                        <Typography className="formLabel" sx={{ mr: 2, width: '120px' }}>
                            Consumer No:
                        </Typography>
                        <TextField
                            variant="outlined"
                            placeholder="Enter Consumer Number"
                            name="consumerNo"
                            value={formData.consumerNo}
                            onChange={handleChange}
                            size="small"
                            sx={{ width: '300px' }}
                        />
                    </Box>
                    <Box className="formItem" sx={{ mb: 3 }}>
                        <Typography className="formLabel" sx={{ mr: 2, width: '120px' }}>
                            Bill No:
                        </Typography>
                        <TextField
                            variant="outlined"
                            placeholder="Enter Bill Number"
                            name="billNo"
                            value={formData.billNo}
                            onChange={handleChange}
                            size="small"
                            sx={{ width: '300px' }}
                        />
                    </Box>
                </Box>
                <Box className="buttonContainer">
                    <Button 
                        variant="contained" 
                        onClick={submitForm}
                        sx={{
                            py: 1.5,
                            px: 4,
                            fontWeight: 'bold',
                            fontSize: '1rem'
                        }}
                    >
                        Validate
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
};

export default RegisterMobileNumber;