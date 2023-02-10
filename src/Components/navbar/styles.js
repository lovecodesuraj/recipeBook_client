import { makeStyles } from "@material-ui/core";
export default makeStyles(() => ({
    navbar: {
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        padding: "0 20px",
        height: "80px",
        gap: "10px",

    },
    paper: {
        display: "flex",
        //  gap:"10px",
    },
    searchButton: {
        height: "40px",
    },
    authButton: {
        marginLeft: "15px"

    }
}))