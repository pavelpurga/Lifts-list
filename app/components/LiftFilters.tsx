import React from 'react';
import { LiftStatus } from '@/app/api/lifts';

interface LiftFilterProps {
    onChange: (status: LiftStatus) => void;
    selectedStatus: LiftStatus;
}

const LiftFilter: React.FC<LiftFilterProps> = ({ onChange, selectedStatus }) => {
    const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const status = event.target.value as LiftStatus;
        onChange(status);
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
            <label style={{ marginRight: '10px' }}>Filter:</label>
            <select value={selectedStatus} onChange={handleStatusChange}>
                <option value="ALL">All</option>
                <option value={LiftStatus.OPEN}>OPEN</option>
                <option value={LiftStatus.CLOSED}>CLOSED</option>
                <option value={LiftStatus.HOLD}>HOLD</option>
            </select>
        </div>
    );
};

export default LiftFilter;