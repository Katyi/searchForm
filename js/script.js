async function getRepos() {
    usersinfo = [];
    document.getElementById('searchResults').remove();
    let div =document.createElement('div');
    div.id = 'searchResults';
    document.getElementById('container').append(div);

    let searchWord = document.getElementById('searchWord').value;
    console.log(searchWord);
    fetch(`https://api.github.com/search/repositories?q=${searchWord}&per_page=10`)
    .then(response => !response.ok ? null : response.json())
    .then((data)=>{// ищем CommentsForm 
        data.items.forEach(element => {
          usersinfo.push({
            id: element.id,
            userName: element.owner.login,
            repo: element.name,
            description: element.description
          })

          div = document.createElement("div");
          let searchResult = 'searchResult' + element.id;
          div.id = searchResult;
          div.className = 'searchResult';
          document.getElementById('searchResults').append(div);

          div = document.createElement('div');
          let userNameRow = 'userNameRow' + element.id;
          div.id = userNameRow;
          div.className = 'userNameRow';
          document.getElementById(searchResult).append(div);

          div = document.createElement('div');
          let text = document.createTextNode('user:');
          div.id = 'userNameText';
          div.append(text);
          document.getElementById(userNameRow).append(div);

          div = document.createElement('div');
          div.id = 'userName';
          let userName = document.createTextNode(element.owner.login);
          div.append(userName);
          document.getElementById(userNameRow).append(div);

          div = document.createElement('div');
          let repoRow = 'repoRow' + element.id;
          div.id = repoRow;
          div.className = 'repoRow';
          document.getElementById(searchResult).append(div);

          div = document.createElement('div');
          text = document.createTextNode('repository:');
          div.id = 'repoText';
          div.append(text);
          document.getElementById(repoRow).append(div);

          div = document.createElement('div');
          div.id = 'repo';
          let repo = document.createTextNode(element.name);
          div.append(repo);
          document.getElementById(repoRow).append(div);

          div = document.createElement('div');
          descRow = 'descRow' + element.id;
          div.id = descRow;
          div.className = 'descRow';
          document.getElementById(searchResult).append(div);

          div = document.createElement('div');
          text = document.createTextNode('description:');
          div.id = 'descText';
          div.append(text);
          document.getElementById(descRow).append(div);

          div = document.createElement('div');
          div.id = 'description';
          let description = document.createTextNode(element.description);
          div.append(description);
          document.getElementById(descRow).append(div);
          
        });
      });
  console.log(usersinfo);

  document.getElementById("searchWord").value = "";

  
}
