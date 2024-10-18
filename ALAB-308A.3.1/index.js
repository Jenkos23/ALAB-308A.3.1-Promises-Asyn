// Importing database functions. DO NOT MODIFY THIS LINE.
import { central, db1, db2, db3, vault } from "./database.js";

// function getUserData(id) {
//   // return new Promise((resolve, reject) => {
//   //   stTimeout(resolve, id);
//   // });
//   const dbs = {
//     db1: db1,
//     db2: db2,
//     db3: db3,
//   };
// }

// asyn function fetchUserData(id) {
//   return new Promise((resolve, reject)) =>{
//     //input validation
//     if (typeof userid !== 'number' || id < 1 || id > 10) {
//       throw new Error('Ivalid user ID');
//     }

//     try{
//       //Get the correct databases based on the user ID
//       const { db1: Acessfromdb1, db2: Acessfromdb2, db3: Acessfromdb3} = await central(id);

//       //Create an array to hold promises for data feteching form each database

//       const promises
//     }

//   }
// }

//Trying another format
function fetchUserData(id){
    //defining dbs
    // const dbs = {
    //     db1: db1,
    //     db2: db2,
    //     db3: db3,
    //   };
    
  return new Promise(async (resolve, reject) => {
    //Validate the id
    if (typeof id !== 'number' || id< 1 || id> 10){
      return reject (new Error('Invalid User ID'));
    }

    try{
      //Get the database name from the central database
      const returnedValuefromCentral = await central(id);
      const dbs = { db1, db2, db3};
      //Fetch user basic  information from the corresponding database
      const basicinfo = await dbs[returnedValuefromCentral](id);

      //fetch user personal info from the vault dbase
      const returnedValuefromVault = await vault(id);

      //Assemble the final user OBJ:
      const userData = {
        id: id,
        name: returnedValuefromVault.name,
        username: basicinfo.username,
        email: returnedValuefromVault.email,
        address: {
          street: returnedValuefromVault.address.street,
          suite: returnedValuefromVault.address.suite,
          city: returnedValuefromVault.address.city,
          zipcode: returnedValuefromVault.address.zipcode,
          geo: {
            lat: returnedValuefromVault.address.geo.lat,
            lng: returnedValuefromVault.address.geo.lng
          }
        },
        phone: returnedValuefromVault.phone,
        website: basicinfo.website,
        company: {
          name: basicinfo.company.name,
          catchPhrase: basicinfo.company.catchPhrase,
          bs: basicinfo.company.bs
        }
      };
      
      resolve(userData);


    } catch (err) {
      reject ( new Error (`Failed to fetch data: ${err.message}`));
    }
  });
}


// Calling the fetchUserData() function
fetchUserData(1)
   .then(userData => {
    console.log(userData);
  }).catch(err => {
    console.error(err);
  });