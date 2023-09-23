import { RequireAuth,useAuthUser} from "react-auth-kit"
import {Navigate} from "react-router-dom";


const ProtectRoute = ({ PageComp,role }) =>{
    const auth = useAuthUser()
  // const userRole = auth().role
        console.log( auth()?.role)
    return (
      auth() ?
            <RequireAuth loginPath={"/unauthenticated"}><PageComp role={role}/></RequireAuth>
            : <Navigate to="/unauthenticated"/> //not logged at all


     )
};

export default  ProtectRoute