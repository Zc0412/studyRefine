import {Refine} from "./core/components";
import {authProvider} from "./authProvider.ts";
import Test from "./Test.tsx";

const App = () => {
    return (
        <Refine authProvider={authProvider}>
            <Test/>
        </Refine>
    );
};

export default App;
