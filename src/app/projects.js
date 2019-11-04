export async function fetchProjects() {
  // await wait(1000);
  return fetch(`https://bestofjs-api-v3.firebaseapp.com/projects.json`)
    .then(res => res.json())
    .then(data => data.projects.slice(0, 2000));
}

function wait(ms = 500) {
  return new Promise(resolve =>
    setTimeout(() => resolve(), 200 + Math.random() * ms)
  );
}

// Used to filter projects when the user enters text in the search box
// Search results are sorted by "relevance"
export function filterProjectsByQuery(projects, query) {
  console.log("> Search", query);
  return projects
    .map(project => ({ ...project, rank: rank(project, query) }))
    .filter(project => project.rank > 0);
}

// for a given project and a query,
// return how much "relevant" is the project in the search results
// `tags` is an array of tags that match the text
function rank(project, query) {
  const equals = new RegExp("^" + query + "$", "i");
  const startsWith = new RegExp("^" + query, "i");
  const contains = new RegExp(query.replace(/ /g, ".+"), "i"); // the query is split if it contains spaces

  if (equals.test(project.name)) {
    // top level relevance: project whose name or package name is what the user entered
    return 7;
  }

  if (startsWith.test(project.name)) {
    return 6;
  }

  if (project.packageName && startsWith.test(project.packageName)) {
    return 5;
  }

  if (query.length > 1) {
    if (contains.test(project.name)) {
      return 4;
    }
  }

  if (query.length > 2) {
    if (contains.test(project.description)) {
      return 3;
    }
    if (contains.test(project.full_name)) {
      return 2;
    }
    if (contains.test(project.url)) {
      return 1;
    }
  }

  // by default: the project is not included in search results
  return 0;
}

const isUrl = input => input.startsWith("http");

const formatIconUrl = input =>
  isUrl(input) ? input : `https://bestofjs.org/logos/${input}`;

const formatOwnerAvatar = (owner_id, size) =>
  `https://avatars.githubusercontent.com/u/${owner_id}?v=3&s=${size}`;

export function getProjectAvatarURL(project, size) {
  return project.icon
    ? formatIconUrl(project.icon)
    : formatOwnerAvatar(project.owner_id, size);
}
