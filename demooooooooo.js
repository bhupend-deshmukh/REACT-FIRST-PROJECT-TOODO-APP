// function func2(){
//     for(var i = 0; i < 3; i++){
//       setTimeout(()=> console.log(i),2000);
//   }
// }

// func2();


const a = ['a','b','c','d']
const b = ['b','c']

const final = a.filter((e, i)=> !b.includes(i))
console.log(final);
