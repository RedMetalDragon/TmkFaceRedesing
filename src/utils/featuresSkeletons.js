//eslint-disable-next-line
var roleFeatures = [
    {
        name: 'Dashboard',
        route: '/dashboard',
        icon: '../assets/bar-chart-outline.svg'
    },
    {
        name: 'Pay',
        route: '/pay',
        icon: '../assets/card-outline.svg'
    },
    {
        name: 'Time Management',
        icon: '../assets/timer.svg',
        sublists: [
            {
                name: 'Log Attendance',
                route: '/punch-in-out'
            },
            {
                name: 'View Schedule',
                route: '/schedule'
            },
            {
                name: 'Create Schedule',
                route: '/create-sched'
            }
        ]
    },
    {
        name: 'Employee',
        icon: '../assets/icon_group.svg',
        sublists: [
            {
                name: 'My Team',
                route: '/my-team'
            },
            {
                name: 'Organization Chart',
                route: '/org-chart'
            }
        ]
    }
];

// const dashboard = {
//     id: 'dashboard',
//     //title: <FormattedMessage id="dashboard" />,
//     //icon: icons.IconDashboard,
//     type: 'group',
//     children: [
//         {
//             id: 'default',
//             //title: <FormattedMessage id="default" />,
//             type: 'item',
//             url: '/dashboard/default',
//             //      icon: icons.IconDashboard,
//             breadcrumbs: false
//         },
//         {
//             id: 'analytics',
//             //title: <FormattedMessage id="analytics" />,
//             type: 'item',
//             url: '/dashboard/analytics',
//             //       icon: icons.IconDeviceAnalytics,
//             breadcrumbs: false
//         }
//     ]
// };

const filterEnabled = true;

const treeFeaturesSkeleton = {
    name: 'root',
    route: '*',
    childrens: []
};
// eslint-disable-next-line
function buildTree(arrayOfNodes, parent = treeFeaturesSkeleton) {
    if (!Array.isArray(arrayOfNodes)) {
        console.log('arrayOfNodes is not an array');
        return;
    }
    arrayOfNodes.forEach((node) => {
        let newNode = { name: replaceNodeName(node.name), route: node.route || replaceNodeRoute(node.name), childrens: [] };
        if (node.sublists) {
            // has children
            newNode.childrens = buildTree(node.sublists, newNode).childrens;
        }
        parent.childrens.push(newNode);
    });
    return parent;
}

function replaceNodeName(name) {
    return name.replace(' ', '_').toLowerCase();
}

function replaceNodeRoute(route) {
    var replaced = '/';
    return replaced + route.replace(' ', '_').toLowerCase();
}
// eslint-disable-next-line
function existInTree(treeRoute, routeToCheck, tree) {
    let currentRoute = treeRoute + tree.route;
    if (currentRoute === routeToCheck) {
        return true;
    }
    // If the current route is not a prefix of the route we're looking for, skip this branch
    else if (!routeToCheck.startsWith(currentRoute)) {
        return false;
    } else {
        for (let i = 0; i < tree.childrens.length; i++) {
            let found = existInTree(treeRoute + tree.route, routeToCheck, tree.childrens[i]);
            if (found) {
                return true;
            }
        }
        return false;
    }
}
// eslint-disable-next-line
function buildRoutesSet(node, currentRoute = '', setRoutes = new Set()) {
    // Include the route for the current node
    let route = currentRoute + node.route;
    setRoutes.add(route);
    // Recursively build the set for each child
    if (node.childrens) {
        node.childrens.forEach((child) => {
            buildRoutesSet(child, route, setRoutes);
        });
    }

    return setRoutes;
}
// eslint-disable-next-line
function buildHashmap(node, currentRoute = '', hashMap = {}) {
    // Include the route for the current node
    let route = currentRoute + node.route;
    hashMap[route] = node.name;
    // Recursively build the set for each child
    if (node.childrens) {
        node.childrens.forEach((child) => {
            buildHashmap(child, route, hashMap);
        });
    }

    return hashMap;
}

function filterTreeByRoutes(node, hashMap, ancestorRoute) {
    // Build the full route for the current node
    let fullRoute = ancestorRoute === '*' ? node.route : ancestorRoute;

    // Check if the full route of the node exists in the hashMap
    if (!Object.prototype.hasOwnProperty.call(hashMap, fullRoute)) {
        return null; // If not in hashMap, skip this node and its children
    }

    // Process children if they exist
    if (node.children && node.children.length > 0) {
        node.children = node.children
            .map((child) => filterTreeByRoutes(child, hashMap, fullRoute + child.route)) // Pass the current fullRoute as the new ancestorRoute
            .filter((child) => child !== null); // Filter out null children
    }

    return node;
}

function filterTreeComponentsByRoutes(componentsTree, roleFeatures) {
    if (!filterEnabled) {
        return componentsTree;
    }
    // We should a call to a function that check the structure of the componentsTree
    var tree = buildTree(roleFeatures);
    var hashMap = buildHashmap(tree);
    return filterTreeByRoutes(componentsTree, hashMap, '*');
}

// eslint-disable-next-line
export { filterTreeComponentsByRoutes };