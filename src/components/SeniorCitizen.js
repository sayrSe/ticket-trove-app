import { TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import InfoIcon from '@mui/icons-material/Info';
import * as React from 'react';
import { Button } from "@mui/base";
import { useLocation } from "react-router";
const textStyle = {
    fontWeight: 'bold',
    width: '0.8',
    height: 0.2,
    textAlign: 'center',
}

const boxStyle = {
    width: {
        xs: 1,
        md: 350,
    },
    marginTop: 2,
    alignItems: "center",
    justifyContent: "center"

}
const totalPriceStyle = {
    fontWeight: 'bold',
    width: '0.8',
    height: 0.2,
    textAlign: 'center',
    textDecoration: "line-through",
}

const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: '#f5f5f9',
        color: 'rgba(0, 0, 0, 0.87)',
        maxWidth: 220,
        fontSize: theme.typography.pxToRem(12),
        border: '1px solid #dadde9',
    },
}));

const SeniorCitizen = () => {
    const [open, setOpen] = React.useState();
    const [inputValue, setValue] = React.useState("");
    const [totalStyle, setTotalPriceStyle] = React.useState(textStyle);

    const handleTooltipClose = () => {
        setOpen(false);
    };
    const handleTooltipOpen = () => {
        setOpen(true);
    };
    const senior = {
        id: 1,
        unitPrice: 400,
    }
    const handleChange = event => {
        const newValue = event.target.value;

        if (/^\d*\.?\d*$/.test(newValue) && newValue <= 4) {
            setValue(newValue);
            setTotalPriceStyle(totalPriceStyle);
            if(newValue == 0 || newValue === ''){
                setTotalPriceStyle(textStyle);
            }
        }
    }

    const { search } = useLocation();
    const parameters = new URLSearchParams(search);
    const seats = parameters.get('seats');
    const splitArray = seats.split('_');
    const seatCount = splitArray.length;
    

    const totalPrice = senior.unitPrice
    const discountPercentage = 20
    const subtractedValue = (discountPercentage / 100) * totalPrice
    const result = subtractedValue * inputValue

    return (
        <>
            <Box sx={{ boxStyle }}>
                <Typography variant="h8" component="h4" sx={{ textStyle }}>Number of Senior Citizens: </Typography>
                <TextField
                
                    id="senior-number"
                    size="small"
                    variant="outlined"
                    defaultValue="0"
                    value={inputValue}
                    onChange={handleChange}
                    inputProps={{
                        pattern: '^[0-9]*\\.?[0-9]*$',
                    }}

                />
                    <HtmlTooltip
                        PopperProps={{
                            disablePortal: true,
                        }}
                        onClose={handleTooltipClose}
                        open={open}
                        disableFocusListener
                        disableHoverListener
                        disableTouchListener

                        title={
                            <React.Fragment>
                                <Typography textAlign="left" color="inherit"><b>{'Information'}</b></Typography>
                                <Typography variant="h7">If the user is aged 60 or older, we will give a 20% discount.
                                    Please take your identity card when you arrived at the cinema location</Typography>
                                <div>
                                    <Button variant="text" size="small" onClick={handleTooltipClose}>Close</Button>
                                </div>
                            </React.Fragment>
                        }
                    >
                        <InfoIcon color="action" fontSize="small" onClick={handleTooltipOpen} />
                    </HtmlTooltip>

            </Box>
            <Box alignItems="left" justifyContent="left">
                <Typography id="totalPriceField" variant="h8" component="h4" sx={totalStyle}>Total Price: {(senior.unitPrice) * seatCount} </Typography>
            </Box>

            <Box alignItems="left" justifyContent="left">
                <Typography id="discountedPrice" variant="h8" component="h4" sx={{ textStyle }}>{((senior.unitPrice) * seatCount)- result}</Typography>
            </Box>



        </>

    )
}

export default SeniorCitizen;