import {Button, MenuItem, Select} from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";

type LiftModalProps = {
    liftName: string;
    elevationGain: string;
    liftStatus: string;
    setLiftStatus: (status: string) => void;
    selectedLift: any;
    handleCancelClick: () => void;
    handleSaveClick: () => void;
};

const LiftModal = ({
                       liftName,
                       elevationGain,
                       liftStatus,
                       setLiftStatus,
                       selectedLift,
                       handleCancelClick,
                       handleSaveClick,
                   }: LiftModalProps) => {
    return (
        <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", bgcolor: "background.paper", boxShadow: 24, p: 4, minWidth: 400 }}>
            <h2>Edit Lift</h2>
            <div>
                <label>Name: {liftName} </label>
            </div>
            <div>
                <div>Elevation Gain: {elevationGain}</div>
            </div>
            <div>
                <label>Status:</label>
                <Select value={liftStatus} onChange={(e) => setLiftStatus(e.target.value)}>
                    <MenuItem value="OPEN">OPEN</MenuItem>
                    <MenuItem value="CLOSED">CLOSED</MenuItem>
                    <MenuItem value="HOLD">HOLD</MenuItem>
                </Select>
            </div>
            <h3>Trail Access list:</h3>
            <div style={{ maxHeight: 200, overflow: "auto", border: "1px solid black", marginTop: 10 }}>
                {selectedLift && (
                    <ul>
                        {selectedLift.trailAccess.map((trail: any) => (
                            <li key={trail.name}>
                                <ListItemText primary={`Name: ${trail.name}`} />
                                <ListItemText primary={`Status: ${trail.status}`} />
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <Button variant="contained" onClick={handleCancelClick}>
                Cancel
            </Button>
            <Button variant="contained" onClick={handleSaveClick}>
                Save
            </Button>
        </Box>
    );
};

export default LiftModal;