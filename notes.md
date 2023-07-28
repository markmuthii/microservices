# Notes, TODOs and Questions that arise during the project

- The following code shows some ways in which an object can be destructured to only include some keys and not others in a new object.

```javascript
console.log(process.env.JWT_KEY);

const obj = {
  a: 12,
  c: 2,
  b: 54,
};

const obj2 = (({ a, c }) => ({ a, c }))(obj);

function desObj({ a, c, b }: { a: any, b: any, c: any }) {
  return { a, b };
}

console.log(desObj(obj));

const { a, ...desObj2 } = obj;

console.log(desObj2);
```

- The same also features in the users controller (now below), which was my initial implementation to only have the id and email being returned in the response, before the use of toJSON in the User Schema, provided by mongoose.

```javascript
// This is not necessary after adding the toJSON in the User schema
const userData = (({ id, password, email }) => ({ id, email }))(user);

// This could be a way to destructure the user object,
// but it includes metadata from mongo,
// so we are sticking to the above
const { __v, ...userData } = user;
```
