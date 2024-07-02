import {keys} from "../../definitions/helpers/keys";

export const useKeys = () => {
    const useNewQueryKeys=false
    return{
        keys,
        preferLegacyKeys: !useNewQueryKeys,
    }
}
