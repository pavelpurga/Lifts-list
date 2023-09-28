import {ALL_LIFTS_QUERY, getClient} from "./api/lifts";

function HomePage({ allLifts }: { allLifts: any[] }) {
    return (
        <div>
            <h1>Lifts</h1>
            <ul>
                {allLifts.map((lift) => (
                    <li key={lift.name}>
                        <p>Name: {lift.name}</p>
                        <p>Elevation Gain: {lift.elevationGain}</p>
                        <p>Status: {lift.status}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export async function getServerSideProps() {
    const client = getClient();
    const { data } = await client.query({
        query: ALL_LIFTS_QUERY,
    });

    return {
        props: {
            allLifts: data.allLifts
        },
    };
}
export default HomePage;