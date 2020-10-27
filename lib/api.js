// lib/api.js
const API_ENDPOINT = `https://api.takeshape.io/project/${process.env.TAKESHAPE_PROJECT}/graphql`;
const TAKESHAPE_API_KEY = process.env.TAKESHAPE_API_KEY;

const fetchData = async (query, { variables } = {}) => {
  const res = await fetch(API_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${TAKESHAPE_API_KEY}`,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const responseJson = await res.json();
  if (responseJson.errors) {
    console.error(
      "Something went Wrong. Failed to fetch API!!" + responseJson.errors
    );
  }
  return responseJson.data;
};

// get all posts to display on landing page
export async function getAllPosts() {
  const data = await fetchData(
    `
      query AllPosts {
        allPosts: getPostList {
            items {
              _id
              title
              deck
              slug
              author {
                name
              }
            }
          }
      }
    `
  );
  return data.allPosts.items;
}

// get all slugs of the posts to generate static paths
export async function getAllSlugs() {
  const data = await fetchData(`
      {
        allPosts: getPostList {
          items {
            slug
          }
        }
      }
    `);
  return data.allPosts.items;
}

// get single post based on the slug passed
export async function getPostBySlug(slug) {
  const data = await fetchData(
    `
      query PostBySlug($slug: String) {
        post: getPostList(where: {slug: {eq: $slug}}) {
          items {
            _id
            title
            slug
            deck
            bodyHtml
            author{
              name
            }
          }
        }
      }`,
    {
      variables: {
        slug,
      },
    }
  );
  return data.post.items[0];
}
