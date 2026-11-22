import Topbar from "@/components/Topbar"

interface props {
    member_account : string
}

export default function ProfilePage({member_account} : props){
    console.log(member_account);
    return (
        <>
        <Topbar title="Profile" redirectUrl="/"/>
        <h1>Profile Page</h1>
        </>
    )
}