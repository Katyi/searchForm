async function getRepos() {
    document.getElementById('searchResults').remove();
    let div =document.createElement('div');
    div.id = 'searchResults';
    document.getElementById('container').append(div);

    let searchWord = document.getElementById('searchWord').value;
    usersinfo = [];
    await fetch(`https://api.github.com/search/repositories?q=${searchWord}&per_page=10`)
    .then(response => !response.ok ? null : response.json())
    .then((data)=>{
      if (data.items.length === 0) {
        let h1 = document.createElement('h1');
        let declaration = document.createTextNode('Ничего не найдено :-(');
        h1.append(declaration);
        document.getElementById('searchResults').append(h1);
      }
        data.items.forEach((element, index) => {
          usersinfo.push({
            id: element.id,
            userName: element.owner.login,
            repo: element.name,
            description: element.description,
            html_url: element.html_url
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
          let text = document.createTextNode(`${index + 1}. user:`);
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

          let a = document.createElement('a');
          let repo = document.createTextNode(element.name);
          a.id = 'repo';
          a.href = element.html_url;
          a.target = "_blank";
          a.append(repo);
          document.getElementById(repoRow).append(a);

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
      })
      .catch(error=>{
        console.log(error);
      });
      document.getElementById("searchWord").value = "";
}
