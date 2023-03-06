import { compareSync, genSaltSync, hashSync } from "bcrypt"

const name="aspire"
const a=genSaltSync(10)
const b=hashSync(name,a)
const c=hashSync(name,0)
console.log(c);
console.log(a,b);
console.log( compareSync('aspire','$2b$10$eb2VpVF3cTIVmVzAwRB7deJ0R6PZHRyf1bj3YqxqHd0bKQv5CNB.q'))
