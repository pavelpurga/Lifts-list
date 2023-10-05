import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

interface Lift {
    name: string;
    elevationGain: number;
    status: string;
}

interface LiftListProps {
    lifts: Lift[];
    handleEditClick: (lift: Lift) => void;
}

const LiftList: React.FC<LiftListProps> = ({ lifts, handleEditClick }) => {
    return (
        <>
            {lifts.map((lift) => (
                <ListItem key={lift.name} sx={{ display: 'flex', border: '1px solid black' }}>
                    <div style={{ flex: 1 }}>
                        <ListItemText primary={`Name: ${lift.name}`} />
                        <ListItemText primary={`Elevation Gain: ${lift.elevationGain}`} />
                    </div>
                    <ListItemText primary={`Status: ${lift.status}`} sx={{ textAlign: 'center', flex: 'auto' }} />
                    <ListItemButton onClick={() => handleEditClick(lift)}>edit</ListItemButton>
                </ListItem>
            ))}
        </>
    );
};

export default LiftList;