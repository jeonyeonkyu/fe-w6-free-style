// const _ = {
//   $: (selector, base = document.body.children) => {
//     const array = [];
//     const selectNode = (attr, base) => {
//       for (let node of base) {
//         if (node[attr] === selector) {
//           array.push(node.children)
//         }
//       }
//       console.dir(array)
//     }
//     switch (selector[0]) {
//       case '.':
//         return selectNode('className', base);
//       case '#':
//         return selectNode('id', base);
//       default:
//         return selectNode('tagName', base);
//     }
//   }
// }

// console.log(_.$('DIV'));
//일단 보류..
