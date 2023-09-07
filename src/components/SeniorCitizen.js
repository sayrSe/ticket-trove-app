import { Button } from "@mui/base";
import { TextField, Typography } from "@mui/material";

const SeniorCitizen = () => {
    return (
        <>
            <Typography>Number of Senior Citizens: </Typography>
            <TextField
                id="outlined-number"
                type="number"
            />
        </>
    )
}

export default SeniorCitizen;