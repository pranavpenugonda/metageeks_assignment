const fs = require("fs");

fs.readFile("users.json", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }

  try {
    const users = JSON.parse(data);

    const usersWithTotalPosts = users.map((user) => ({
      ...user,
      totalPosts: user.posts.length,
    }));

    fs.writeFile(
      "users_with_total_posts.json",
      JSON.stringify(usersWithTotalPosts, null, 2),
      "utf8",
      (err) => {
        if (err) {
          console.error("Error writing file:", err);
          return;
        }
        console.log(
          "Modified data has been successfully written to users_with_total_posts.json"
        );
      }
    );
  } catch (error) {
    console.error("Error parsing JSON:", error);
  }
});
