const ClassA = require ('./myModule');
console.log(ClassA);

const classA = new ClassA();


//Require is bad, it was made before ES6 modules, and it's not a good practice to use it in new code.