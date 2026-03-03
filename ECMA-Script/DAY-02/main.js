//task1
const myCustomReplace = {
  //use symbol replace to create a custom replace behavior
  //symbole here act as key value 
  [Symbol.replace](str) {
    // custome behavior to replace the string
    //1- check if the string length is greater than 15
    if (str.length > 15) {
      // 2- if true, return the first 15 characters followed by "..."
      return str.substring(0, 15) + "...";
    }
    // 3- if false, return the original string
    return str;
  }
};


let text1 = "This is a very long text that should be truncated";
let text2 = "Short text";

console.log(text1.replace(myCustomReplace)); 
console.log(text2.replace(myCustomReplace));


//task2
var myUser = {
    name: "Ahmed",
    age: 25,
    track: "SD",

    [Symbol.iterator]: function() {
        let keys = Object.keys(this); 
        let index = 0;
        let self = this; 

        
        return {
            next: function() {
                if (index < keys.length) {
                    let keyName = keys[index];
                    let keyValue = self[keyName];
                    index++;

                
                    return {
                        value: { key: keyName, val: keyValue },
                        done: false
                    };
                } else {
                
                    return { done: true };
                }
            }
        };
    }
};


for (let item of myUser) {
    console.log(`Property: ${item.key}, Value: ${item.val}`);
}

// task3

function* myObjectGenerator(obj) {
    let keys = Object.keys(obj);
    
    for (let key of keys) {
        
        yield { key: key, value: obj[key] }; 
    }
}


let user = { name: "Mohamed", age: 22, track: "JS" };
let generatorObj = myObjectGenerator(user); // return itrator object

for (let item of generatorObj) {
    console.log(`Property: ${item.key}, Value: ${item.value}`);
}