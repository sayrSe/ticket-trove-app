import { List, ListItem, ListItemText, Typography } from "@mui/material"

const Showtimes = () => {
    return (
        <>
            <List>
                <ListItem>
                    <Typography variant="h5" style={{ fontFamily: "Lucida Sans" }}>
                        Selected Date:
                    </Typography>
                </ListItem>
                <ListItem>
                    <Typography variant="h5" style={{ fontFamily: "Lucida Sans" }}>
                        Selected Location:
                    </Typography>
                </ListItem>
                <ListItem>
                    <Typography variant="h5" style={{ fontFamily: "Lucida Sans" }}>
                        Cinema Address:
                    </Typography>
                </ListItem>
                <ListItem>
                    <Typography variant="h5" style={{ fontFamily: "Lucida Sans" }}>
                        Selected Showtime:
                    </Typography>
                </ListItem>
                <List>
                    <ListItem >
                        <ListItemText primary="11:00 AM" />
                    </ListItem>
                    <ListItem >
                        <ListItemText primary="02:00 PM" />
                    </ListItem>
                    <ListItem >
                        <ListItemText primary="05:00 PM" />
                    </ListItem>
                </List>
            </List>
        </>
    )
}

export default Showtimes;