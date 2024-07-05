import {useGetIdentity, useIsAuthenticated, usePermissions} from "./core/hooks";
import {IIdentity} from "./types.ts";

const Test = () => {
    const {data: isAuthenticated} = useIsAuthenticated()
    const {data: identity} = useGetIdentity<IIdentity>();
    const {data: permissions} = usePermissions({params: {id: 1}})
    console.log('@@identity', identity)
    console.log("@@isAuthenticated", isAuthenticated)
    console.log('@@permissions', permissions)
    return (
        <div>
            test
        </div>
    );
};

export default Test;
