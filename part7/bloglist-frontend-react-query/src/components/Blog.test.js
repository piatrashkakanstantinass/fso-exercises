import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

const blog = {
  title: "Canonical string reduction",
  author: "Edsger W. Dijkstra",
  url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
  likes: 14,
};
let mockOnIncreaseLike;

let container;
beforeEach(() => {
  mockOnIncreaseLike = jest.fn();
  container = render(
    <Blog blog={blog} onIncreaseLike={mockOnIncreaseLike} />,
  ).container;
});

test("renders title and author, but not url or likes by default", async () => {
  expect(container).toHaveTextContent(blog.title);
  expect(container).toHaveTextContent(blog.author);
  expect(container).not.toHaveTextContent(blog.url);
  expect(container).not.toHaveTextContent(blog.likes);
});

test("clicking view shows url and likes", async () => {
  const button = screen.getByText("view");
  await userEvent.click(button);

  expect(container).toHaveTextContent(blog.url);
  expect(container).toHaveTextContent(blog.likes);
});

test("clicking like button twice fires event twic", async () => {
  const expandButton = screen.getByText("view");
  await userEvent.click(expandButton);

  const likeButton = screen.getByText("like");
  await userEvent.click(likeButton);
  await userEvent.click(likeButton);

  expect(mockOnIncreaseLike.mock.calls).toHaveLength(2);
});
