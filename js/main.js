$('#twoTab').addClass('active');
$.ajax({
    url: "https://api.github.com/users/Uttertastic",
    success: function(response) {
        $('#lilIcon').html(`
      <img src="${response.avatar_url}">
      `);
        $('#lilLogin').html(`
      ${response.login}
      `);
        $('#userInfo').html(`
      <img src="${response.avatar_url}">
      <h3>${response.name}</h3>
      <h5>${response.login}</h5>
      <hr>
      <h6><img src="octicons/lib/svg/circuit-board.svg"><a href="#"> ${response.bio}</a></h6>
      <hr>
      <h6><img src="octicons/lib/svg/organization.svg">       The Iron Yard</h6>
      <h6><img src="octicons/lib/svg/location.svg"> ${response.location}</h6>
      <h6><img src="octicons/lib/svg/link.svg"> ${response.email}</h6>
      <h6><img src="octicons/lib/svg/clock.svg"> Joined ${moment(response.created_at).from()}</h6>
      <hr>
      <div class="row numbers">
        <div class="col-md-4">
          <h2>${response.followers}</h2>
          <p>Followers</p>
        </div>
        <div class="col-md-4">
          <h2>97</h2>
          <p>Starred</p>
        </div>
        <div class="col-md-4">
          <h2>${response.following}</h2>
          <p>Following</p>
        </div>
      </div>
      <hr>
      `);
    }
})

$.ajax({
    url: "https://api.github.com/users/Uttertastic/repos",
    success: function(response) {
        response.forEach(function(repo) {
            $('#repoGoHere').append(`
        <div class="repos row">
          <div class="col-md-10">
            <h4>${repo.name}</h4>
            <p>Updated ${moment(repo.updated).from()}</p>
          </div>
          <div class="col-md-2 repoRight">
            <ul>
              <li><p>${repo.language}</p></li>
              <li><img src="octicons/lib/svg/star.svg">${repo.stargazers_count}</li>
              <li><img src="octicons/lib/svg/git-branch.svg">${repo.forks_count}</li>
            </ul>
          </div>
        </div>
        <hr>
        `);
        })
    }
})
$.ajax({
    url: "https://api.github.com/users/Uttertastic/events",
    success: function(response) {
        response.forEach(function(activity) {
          if(activity.type = "PushEvent"){
            $('#activityTab').append(`
              <div class="container-fluid">
                <div class="col-md-1 gitIcon">
                  <img src="octicons/lib/svg/git-commit.svg">
                </div>
                <div class="col-md-11 activityImg">
                  <p>${moment(activity.created_at).from()}</p>
                  <h5>${activity.actor.login} pushed to ${activity.payload.ref} at ${activity.repo.name}</h5>
                  <div class="container-fluid">
                    <img src="${activity.actor.avatar_url}" class="col-md-2">
                    <p><img src="${activity.actor.avatar_url}"> ${activity.id} added ${activity.type}</p>
                  </div>
                </div>
              </div>
              <hr>
        `);}
        })
    }
})
