export const formType = {
    "Resource": {
        "Resouce type name": { type: "text" },
        "Default number of resource units": { type: "number" },
        "Cost(per period)": { type: "number" },
        "Idle cost(per period)": { type: "number" },
        "Arrival probability[1,100]": { type: "number" },
        "Assign price": { type: "number" },
        "Realese price": { type: "number" },
        "Release lead time(periods)": { type: "number" },
        "Assign lead time(periods)": { type: "number" },
        "Minimum number of resource units": { type: "number" },
        "Maximum number of resource units": { type: "number" }
    },
    "Project": {
        "Project name": { type: "text" },
        "Initial cash": { type: "number" },
        "Target finish period(WP due date)": { type: "number" },
        "Early finish bonus": { type: "number" },
        "Late finish penalty(per period)": { type: "number" },
        "Use system engineering featuer": { type: "checked" }
    },
    "Task": {
        "Task name": {type: "text"},
        "Income": {type: "number"},
        "Split cost": {type: "number"},
        //"Predecessor task": {type:"####################"},
        
    },
    "Mode": {
        "Mode name": {type: "text"},
        "Optimishtic duration": {type: "number"},
        "Most likely duration": {type: "number"},
        "Passemistic duration": {type: "number"},
        //"Needed resources for each resource": {type: "number"},
    },
    "Quality requirement": {
        "Quality requirement name": {type: "text"},
        "Importance": {type: "number"},
        "Minimum value": {type: "number"},
        "Desired value": {type: "number"},
        "Maximum value": {type: "number"},
        //"Best mode": {type: "list"},
        "Define formula": {type: "text"}
    },
    "Quality parameter": {
        "Quality parameter name": {type: "text"},
        "Description": {type: "text"},
        "Notaion": {type: "text"}
    }
}
