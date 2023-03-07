async function getRepos(str) {
  let usersinfo = [];
  i = 0;
  for(let name of names) {
    fetch(`https://api.github.com/users/${name}`)
    .then(response => !response.ok ? null : response.json())
    .then((data)=>{
        usersinfo.push({
        login: data.login,
        name: data.name,
        location: data.location,
      });
      console.log(usersinfo[i].login, usersinfo[i].name, usersinfo[i].location )
      i++;
    })
  }
  return usersinfo; 
}
let names = ['mojombo', 'katyi', 'test'];
let users = getUsers(names);
console.log(users.array)