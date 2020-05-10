import { Resource } from "models/Note";

export const sortResources = (resources: any) => resources?.reduce((all: any, resource: Resource) => {
    if (all[resource.state]) {
        all[resource.state].push(resource);
    } else {
        all[resource.state] = [];
        all[resource.state].push(resource);
    }
    return all;
}, {});