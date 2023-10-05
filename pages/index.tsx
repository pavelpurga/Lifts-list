import {ALL_LIFTS_QUERY, getClient, LiftStatus} from "@/app/api/lifts";
import Box from '@mui/material/Box';
import LiftFilter from "@/app/components/LiftFilters";
import query from "apollo-cache-inmemory/lib/fragmentMatcherIntrospectionQuery";
import {useState} from "react";
import {Modal} from "@mui/material";
import {gql} from "@apollo/client";
import LiftModal from "@/app/components/LiftModal";
import LiftList from "@/app/components/LiftList";

export async function getServerSideProps()  {
    const client = getClient();
    const { data } = await client.query({
        query: ALL_LIFTS_QUERY,
        variables: {
            status: query.status || null,
        },
    });
    return {
        props: {
            allLifts: data.allLifts,
        },
    };
}

function HomePage({ allLifts }: { allLifts: any[] }) {
    const [selectedStatus, setSelectedStatus] = useState<LiftStatus>('ALL');
    const [selectedLift, setSelectedLift] = useState<any>(null);
    const [openModal, setOpenModal] = useState(false);
    const [liftName, setLiftName] = useState("");
    const [elevationGain, setElevationGain] = useState("");
    const [liftStatus, setLiftStatus] = useState("");
    const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedStatus(event.target.value as LiftStatus);
    };
    const handleEditClick = (lift: any) => {
        setSelectedLift(lift);
        setLiftName(lift.name);
        setElevationGain(lift.elevationGain);
        setLiftStatus(lift.status);
        setOpenModal(true);
    };
    const handleCancelClick = () => {
        setOpenModal(false);
    };
    const handleSaveClick = async () => {
        if (selectedLift) {
            const client = getClient();
            setSelectedLift((prevLift: any) => ({
                ...prevLift,
                status: liftStatus,
            }));
            await client.mutate({
                mutation: gql`
        mutation UpdateLiftStatus($liftName: String!, $liftStatus: LiftStatus!) {
          updateLiftStatus(name: $liftName, status: $liftStatus) {
            name
            elevationGain
            status
          }
        }
      `,
                variables: {
                    liftName: selectedLift.name,
                    liftStatus: liftStatus,
                },
                refetchQueries: [
                    {
                        query: ALL_LIFTS_QUERY,
                        variables: {
                            status: selectedStatus !== "ALL" ? selectedStatus : null,
                        },
                    },
                ],
            });
        }

        setOpenModal(false);
    };
    const filteredLifts = selectedStatus === 'ALL' ? allLifts : allLifts.filter(lift => lift.status === selectedStatus);
    return (
        <div>
            <h1 style={{ display: "flex", justifyContent: "center", marginBottom: 10 }}>LIFTS LIST</h1>
            <span style={{display:"flex", justifyContent:"center", marginBottom: 15}}>
                <label>Filter:</label>
                <LiftFilter selectedStatus={selectedStatus} handleFilterChange={handleFilterChange} />
            </span>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <Box sx={{ maxHeight: 600, minWidth: 700, overflow: 'auto', border: '1px solid black' }}>
                    <LiftList lifts={filteredLifts} handleEditClick={handleEditClick} />
                </Box>
            </div>
            <Modal open={openModal} onClose={handleCancelClick}>
                <LiftModal
                    liftName={liftName}
                    elevationGain={elevationGain}
                    liftStatus={liftStatus}
                    setLiftStatus={setLiftStatus}
                    selectedLift={selectedLift}
                    handleCancelClick={handleCancelClick}
                    handleSaveClick={handleSaveClick}
                />
            </Modal>
        </div>
    );
}

export default HomePage;