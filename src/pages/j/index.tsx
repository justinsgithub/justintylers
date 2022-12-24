import { Layout } from "@/components/layout";
import { NextPage } from "next";
import Typography from "@mui/material/Typography"

const AdminPage: NextPage = () => {
    return (
        <Layout>
            <Typography variant="h3" textAlign='center' mt={3}>
                Post Workout
            </Typography>
        </Layout>
    )
}

export default AdminPage
