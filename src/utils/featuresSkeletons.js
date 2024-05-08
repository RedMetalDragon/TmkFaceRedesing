import { featureFilterEnabled } from './globalConfig.js';

/**
 * The above functions are used to build and filter a tree structure based on routes and node names.
 * @param arrayOfNodes - The `arrayOfNodes` parameter in the `buildTree` function is an array of nodes
 * that you want to build a tree structure from. Each node in the array represents a part of the
 * hierarchical structure, and nodes can have children nodes to form a tree.
 * @param [parent] - The `parent` parameter in the `buildTree` function refers to the parent node to
 * which the built tree structure will be attached. By default, if no parent is provided, it will
 * attach the built tree to the `treeFeaturesSkeleton` object, which represents the root of the tree
 * structure.
 * @returns The `filterTreeComponentsByRoutes` function is returning the filtered `componentsTree`
 * based on the `roleFeatures` provided. It builds a tree structure from `roleFeatures`, creates a
 * hashmap from that tree, and then filters the `componentsTree` based on the routes present in the
 * hashmap. The filtered `componentsTree` will only contain nodes that have routes present in the
 * `roleFeatures`
 */

const treeFeaturesSkeleton = {
    name: 'root',
    route: '*',
    childrens: []
};

/**
 * Builds a tree structure from an array of nodes.
 * The buildTree function takes an array of nodes and recursively builds a tree structure. Each node in the array can have children nodes, forming a hierarchical structure.
 * @param {Array} arrayOfNodes - The array of nodes to build the tree from.
 * @param {Object} [parent=treeFeaturesSkeleton] - The parent node to attach the built tree to. Defaults to treeFeaturesSkeleton.
 * @returns {Object} The parent node with the built tree structure.
 */
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

/**
 * Replaces spaces with underscores and converts the name to lowercase.
 * The replaceNodeName function takes a name string and replaces any spaces with underscores. It then converts the name to lowercase.
 * @param {string} name - The name string to be replaced.
 * @returns {string} The modified name string with spaces replaced by underscores and converted to lowercase.
 */
function replaceNodeName(name) {
    return name.replace(' ', '_').toLowerCase();
}

function replaceNodeRoute(route) {
    const replaced = '/';
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
    if (!featureFilterEnabled) {
        return componentsTree;
    }
    // We should a call to a function that check the structure of the componentsTree
    var tree = buildTree(roleFeatures);
    var hashMap = buildHashmap(tree);
    return filterTreeByRoutes(componentsTree, hashMap, '*');
}

// eslint-disable-next-line
export { filterTreeComponentsByRoutes };
