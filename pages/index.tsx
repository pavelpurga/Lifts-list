import {ALL_LIFTS_QUERY, getClient, LiftStatus} from "@/app/api/lifts";
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import LiftFilter from "@/app/components/LiftFilters";
import {useState} from "react";



function HomePage({ allLifts }: { allLifts: any[] }) {
    const [filteredLifts, setFilteredLifts] = useState(allLifts);
    const handleFilterChange = async (status: LiftStatus) => {
        const client = getClient();

        try {
            const { data } = await client.query({
                query: ALL_LIFTS_QUERY,
                variables: { status },
            });
            setFilteredLifts(data.allLifts);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h1 style={{ display: "flex", justifyContent: "center" }}>LIFTS LIST</h1>
            <LiftFilter onChange={handleFilterChange} selectedStatus={LiftStatus.ALL} />
            <div  style={{ display: "flex", justifyContent: "center"  }}>
                <Box sx={{ maxHeight: 600,minWidth:700, overflow: 'auto', border: '1px solid black', }}>
                    {filteredLifts.map((lift) => (
                        <ListItem key={lift.name} sx={{ display: 'flex',border: '1px solid black' }}>
                            <div style={{ flex: 1 }}>
                                <ListItemText primary={`Name: ${lift.name}`} />
                                <ListItemText primary={`Elevation Gain: ${lift.elevationGain}`} />
                            </div>
                            <ListItemText primary={`Status: ${lift.status}`} sx={{ textAlign: 'center', flex: 'auto' }} />
                            <ListItemButton>edit</ListItemButton>
                        </ListItem>
                    ))}
                </Box>
            </div>
        </div>
    );
}

export async function getServerSideProps() {
    const client = getClient();
    const { data } = await client.query({
        query: ALL_LIFTS_QUERY,
        variables: { status: LiftStatus.All },
    });

    return {
        props: {
            allLifts: data.allLifts,
        },
    };
}
export default HomePage;