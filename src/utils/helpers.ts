export function isEqual(obj1: any, obj2: any) {
  function getType(obj: any) {
    return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
  }

  function areArraysEqual() {
    // Check length
    if (obj1.length !== obj2.length) return false;

    // Check each item in the array
    for (let i = 0; i < obj1.length; i++) {
      if (!isEqual(obj1[i], obj2[i])) return false;
    }

    // If no errors, return true
    return true;
  }

  function areObjectsEqual() {
    if (Object.keys(obj1).length !== Object.keys(obj2).length) return false;

    // Check each item in the object
    for (let key in obj1) {
      if (Object.prototype.hasOwnProperty.call(obj1, key)) {
        if (!isEqual(obj1[key], obj2[key])) return false;
      }
    }

    // If no errors, return true
    return true;
  }

  function areFunctionsEqual() {
    return obj1.toString() === obj2.toString();
  }

  function arePrimativesEqual() {
    return obj1 === obj2;
  }

  // Get the object type
  let type = getType(obj1);

  // If the two items are not the same type, return false
  if (type !== getType(obj2)) return false;

  // Compare based on type
  if (type === 'array') return areArraysEqual();
  if (type === 'object') return areObjectsEqual();
  if (type === 'function') return areFunctionsEqual();
  return arePrimativesEqual();
}

export const sanitizeHTML = (str: string) => {
  return str.replace(/[^\w. ]/gi, function (c) {
    return '&#' + c.charCodeAt(0) + ';';
  });
};
