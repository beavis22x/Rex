# Rex
Function difference:

/**
     * Compare two JSON files and return object with differences
     * @param  {pathfile}   path1 The first path to JSON file
     * @param  {pathfile}   path2 The second path to JSON file
     * @return {object}       If true, both arrays are equal
*/
     
We have two helpers functions arraysMatch and compare

2. Loop through the first object. We must make sure that we check the properties of a particular object avoiding the properties inherited from the prototype. We loop through the keys of the first object and, if the second object has the same key pass control to the compare function

3. Loop through the second object and find missing items. If the first one doesn't have the same key we add the key-value pair in differences object with the note in the key “add property”.

Function compare:
/**
     * Compare two items and push non-matches to object
     * @param  {*}      item1 The value of first object
     * @param  {*}      item2 The value of second object
     * @param  {String} key   The key in our objects
     */


As the value in JSON may contain only string, number, object, array, true, false or null:

1. Get the object type. If we hit one of the conditions we exit the function.

2. If type2 is undefined it has been removed, we take the key from the function parameters with value “remove property” and add it in differences object.

3. If items are different types, we add the key of object with the note “changed type of the property” and value equal item2 in differences object. For example, if value of property has changed from array to object and vice versa

4. Catches the object. If first item type is an object, we recursively pass through the object and if there is no enumerable property in object we exit from recursion and add the key object with the note “changed type of the property” and value equal item2 in differences object.

5. Catches an array. If the item type is an array we use helper function arraysMatch which return boolean. If func return false we take the key of object with the note “changed values of array” and value equal item2 and add it in differences object.  

6. Catches primitives except bigint, symbol. If the items are unequal we take the key of object and value with the note “changed from ‘item1’ to ‘item2’ ” and add it in differences object.  

Function arraysMatch:
/**
     * Check if two arrays are equal
     * @param  {Array}   arr1 The first array
     * @param  {Array}   arr2 The second array
     * @return {Boolean}      If true, both arrays are equal
 */
1. Check if the arrays are the same length.

2. Check if all items exist and are in the same order
