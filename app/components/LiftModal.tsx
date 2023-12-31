import {Button, MenuItem, Select} from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import {getClient, SET_LIFT_STATUS_MUTATION} from "@/app/api/lifts";

type LiftModalProps = {
    liftID:string;
    liftName: string;
    elevationGain: string;
    liftStatus: string;
    handleStatusChange: (status: string) => void;
    selectedLift: any;
    handleCancelClick: () => void;
    handleSaveClick: () => void;
};

const LiftModal = ({
                       liftID,
                       liftName,
                       elevationGain,
                       liftStatus,
                       handleStatusChange,
                       selectedLift,
                       handleCancelClick,
                       handleSaveClick
                   }: LiftModalProps) => {
    const saveLiftStatus = async () => {
        try {
            if (!selectedLift) {
                console.error("Selected lift is null.");
                return;
            }
            const client = getClient();
            await client.mutate({
                mutation: SET_LIFT_STATUS_MUTATION,
                variables: {
                    id: liftID,
                    status: liftStatus,
                },
            });
            handleSaveClick();
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <Box
            sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                bgcolor: "background.paper",
                boxShadow: 24,
                p: 4,
                minWidth: 400,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <div>
                <h2>Name: {liftName} </h2>
            </div>
            <div style={{marginTop:-30}}>
                <h3>Elevation Gain: {elevationGain}</h3>
            </div>
            <div style={{marginTop:20}}>
                <label>Status:</label>
                <Select
                    sx={{height:20}}
                    value={liftStatus}
                    onChange={(e) => handleStatusChange(e.target.value)}
                >
                    <MenuItem value="OPEN">OPEN</MenuItem>
                    <MenuItem value="CLOSED">CLOSED</MenuItem>
                    <MenuItem value="HOLD">HOLD</MenuItem>
                </Select>
            </div>
            <h3>Trail Access list:</h3>
            <div
                style={{
                    border: "1px solid black",
                    marginTop: 10,
                    display: "flex",
                    flexDirection: "column",
                    maxHeight: 200,
                    overflow: "auto",
                }}
            >
                {selectedLift && (
                    <Box>
                        {selectedLift.trailAccess.map((trail: any) => (
                            <Box key={trail.name}
                                 sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                margin: "10px",
                                     padding: "10px",
                                border: "1px solid black",
                            }}>
                                <ListItemText primary={`Name: ${trail.name}`} />
                                <ListItemText primary={`Status: ${trail.status}`} />
                            </Box>
                        ))}
                    </Box>
                )}
            </div>
            <div style={{paddingTop:20}}>
                <Button variant="contained" onClick={handleCancelClick}>
                    Cancel
                </Button>
                <Button sx={{marginLeft:18}} variant="contained" onClick={saveLiftStatus}>
                    Save
                </Button>
            </div>
        </Box>
    );
};

export default LiftModal;