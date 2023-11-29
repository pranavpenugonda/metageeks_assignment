const axios = require("axios");

async function getUsersWithPosts() {
  try {
    const usersResponse = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    const users = usersResponse.data;

    const usersWithPosts = await axios.all(
      users.map(async (user) => {
        const postsResponse = await axios.get(
          `https://jsonplaceholder.typicode.com/posts?userId=${user.id}`
        );
        const posts = postsResponse.data;

        return {
          ...user,
          posts,
        };
      })
    );

    return usersWithPosts;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

getUsersWithPosts()
  .then((usersWithPosts) => {
    try {
      const jsonData = JSON.stringify(usersWithPosts, null, 2);
      console.log(jsonData);
    } catch (error) {
      console.error("Error converting data to JSON:", error);
    }
  })
  .catch((error) => {
    console.error("Error:", error);
  });
