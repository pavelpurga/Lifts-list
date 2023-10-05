import {LiftStatus} from "@/app/api/lifts";

type LiftFilterProps = {
    selectedStatus: LiftStatus;
    handleFilterChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

const LiftFilter = ({ selectedStatus, handleFilterChange }: LiftFilterProps) => {
    return (
        <select value={selectedStatus} onChange={handleFilterChange}>
            <option value="ALL">All</option>
            <option value="OPEN">OPEN</option>
            <option value="CLOSED">CLOSED</option>
            <option value="HOLD">HOLD</option>
        </select>
    );
};

export default LiftFilter;