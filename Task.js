if (!process.argv[2]) {
    throw "path1 is invalid"
}

if (!process.argv[3]) {
    throw "path2 is invalid"
}

const path1 = process.argv[2].trim();
const path2 = process.argv[3].trim();

const fs = require('fs');

let rawdata1 = fs.readFileSync(path1);
let rawdata2 = fs.readFileSync(path2);

const obj1 = JSON.parse(rawdata1);
const obj2 = JSON.parse(rawdata2);

console.dir(difference(obj1, obj2), { depth: null });

function difference(obj1, obj2) {

    // Make sure an object to compare is provided
    if (!obj1 || Object.prototype.toString.call(obj1) !== '[object Object]') {
        throw ('First argument is not an object');
    }

    if (!obj2 || Object.prototype.toString.call(obj2) !== '[object Object]') {
        throw ('Second argument is not an object');
    }

    const differences = {};

    /**
     * Check if two arrays are equal
     * @param  {Array}  arr1 The first array
     * @param  {Array}  arr2 The second array
     * @return {Boolean}  If true, both arrays are equal
     */
    const arraysMatch = function (arr1, arr2) {

        // Check if the arrays are the same length
        if (arr1.length !== arr2.length) return false;

        // Check if all items exist and are in the same order
        for (let i = 0; i < arr1.length; i++) {
            if (arr1[i] !== arr2[i]) return false;
        }

        // Otherwise, return true
        return true;

    };

    /**
     * Compare two items and push non-matches to object
     * @param  {*}      item1 The first item
     * @param  {*}      item2 The second item
     * @param  {String} key   The key in our object
     */
    const compare = function (item1, item2, key) {

        // Get the object type
        const type1 = Object.prototype.toString.call(item1);
        const type2 = Object.prototype.toString.call(item2);

        // If type2 is undefined it has been removed
        if (type2 === '[object Undefined]') {
            differences[key] = 'remove property';
            return;
        }

        // If items are different types
        if (type1 !== type2) {
            differences[`changed type of the property ${key}`] = item2;
            return;
        }

        // If an object, compare recursively
        if (type1 === '[object Object]') {
            const objDiff = difference(item1, item2);
            if (Object.keys(objDiff).length > 0) {
                differences[key] = objDiff;
            }
            return;
        }

        // If an array, compare
        if (type1 === '[object Array]' && type2 === '[object Array]') {
            if (!arraysMatch(item1, item2)) {
                differences[`changed values of array ${key}`] = item2;
            }
            return;
        }

        // Otherwise, just compare
        if (item1 !== item2) {
            differences[key] = `changed from ${item1} to ${item2}`;
            return;
        }
    };

    // Loop through the first object.
    // Make sure that we check the properties of a particular object
    // avoiding the properties inherited from the prototype

    for (let key in obj1) {
        if (obj1.hasOwnProperty(key)) {
            compare(obj1[key], obj2[key], key);
        }
    }

    // Loop through the second object and find missing items
    for (let key in obj2) {
        if (obj2.hasOwnProperty(key)) {
            if (!obj1[key]) {
                differences[`add property ${key}`] = obj2[key];
            }
        }
    }

    return differences;
}



