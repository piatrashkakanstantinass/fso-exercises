const username = "test_user";
const correctPassword = "secure1234psswd";

const anotherUsername = "test_user2";
const anotherPassword = "some_other_password";

Cypress.Commands.add("createBlog", (blog) => {
  cy.request({
    url: "http://localhost:3003/api/blogs",
    method: "POST",
    body: blog,
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token}`,
    },
  }).then(() => {
    cy.visit("http://localhost:5173");
  });
});

describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    cy.request("POST", "http://localhost:3003/api/users", {
      username,
      password: correctPassword,
      name: "Test user",
    });
    cy.request("POST", "http://localhost:3003/api/users", {
      username: anotherUsername,
      password: anotherPassword,
      name: "Test user 2",
    });
    cy.visit("http://localhost:5173");
  });

  it("Login form is shown", function () {
    cy.contains("log in to application");
    cy.contains("username");
    cy.contains("password");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("input[name='username']").type(username);
      cy.get("input[name='password']").type(correctPassword);
      cy.contains("login").click();

      cy.contains("blogs");
      cy.contains(`${username} logged in`);
      cy.contains("new blog");
    });

    it("fails with wrong credentials", function () {
      cy.get("input[name='username']").type(username);
      cy.get("input[name='password']").type(
        correctPassword.substring(0, correctPassword.length - 1)
      );
      cy.contains("login").click();

      cy.contains("Wrong credentials").should(
        "have.css",
        "color",
        "rgb(255, 0, 0)"
      );
    });
  });

  describe("When logged in", function () {
    const newBlog = {
      title: "Cool blog",
      url: "https://random.org",
      author: "Cool author",
    };
    let token;

    beforeEach(function () {
      cy.request("POST", "http://localhost:3003/api/login", {
        username,
        password: correctPassword,
      }).then((response) => {
        localStorage.setItem("user", JSON.stringify(response.body));
        token = response.body.token;
      });
      cy.reload();
    });

    it("A blog can be created", function () {
      cy.contains("new blog").click();

      cy.get("input[name='title']").type(newBlog.title);
      cy.get("input[name='author']").type(newBlog.author);
      cy.get("input[name='url']").type(newBlog.url);

      cy.get("button").contains("create").click();
      cy.contains(`a new blog ${newBlog.title} by ${newBlog.author} added`);
    });

    describe("Blog actions", function () {
      beforeEach(function () {
        cy.request({
          url: "http://localhost:3003/api/blogs",
          method: "POST",
          auth: {
            bearer: token,
          },
          body: newBlog,
        });
        cy.reload();
      });

      it("A blog can be liked", function () {
        cy.contains(newBlog.title).parent().find("button").click();

        cy.get(".like-count").contains("0");
        cy.contains("like").click();
        cy.get(".like-count").contains("1");
      });

      it("User who created a blog can delete it", function () {
        cy.contains(newBlog.title).parent().find("button").click();

        cy.contains("delete").click();
        cy.get("body").should("not.contain", newBlog.title);
      });

      it("Only creator can see delete button", function () {
        cy.request("POST", "http://localhost:3003/api/login", {
          username: anotherUsername,
          password: anotherPassword,
        }).then((response) => {
          localStorage.setItem("user", JSON.stringify(response.body));
          token = response.body.token;
        });
        cy.reload();

        cy.contains(newBlog.title).parent().find("button").click();
        cy.get("body").should("not.contain", "delete");
      });

      it.only("Blogs are ordered by likes", function () {
        Cypress.config("defaultCommandTimeout", 30000);
        cy.createBlog({
          title: "The best blog ever",
          url: "cool ulr",
          author: "some authro",
          likes: 25,
        });
        cy.reload();
        cy.createBlog({
          title: "Decent blog",
          url: "cool ulr",
          author: "some authro",
          likes: 10,
        });
        cy.reload();
        cy.contains("The best blog ever");

        const likes = [];

        cy.get(".blog")
          .each((blog) => {
            cy.wrap(blog).contains("view").click();
            cy.wrap(blog)
              .get(".like-count")
              .invoke("text")
              .then((likeCount) => {
                likes.push(Number(likeCount));
              });
            cy.wrap(blog).contains("hide").click();
          })
          .then(() => {
            cy.wrap(
              likes.reduce((a, c) => {
                if (a === false || a < c) {
                  return false;
                }
                return c;
              })
            ).should("not.be", false);
          });
      });
    });
  });
});
