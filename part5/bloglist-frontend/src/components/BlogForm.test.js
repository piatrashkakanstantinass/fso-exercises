import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogForm from "./BlogForm";

test("calls event handler with right details", async () => {
  const onSubmit = jest.fn();
  const { container } = render(<BlogForm onSubmit={onSubmit} />);

  const newTitle = "test title";
  const newAuthor = "test author";
  const newUrl = "test url";

  const titleInput = container.querySelector("input[name='title']");
  const authorInput = container.querySelector("input[name='author']");
  const urlinput = container.querySelector("input[name='url']");

  await userEvent.type(titleInput, newTitle);
  await userEvent.type(authorInput, newAuthor);
  await userEvent.type(urlinput, newUrl);

  await userEvent.click(screen.getByText("create"));

  expect(onSubmit.mock.calls).toHaveLength(1);
  expect(onSubmit.mock.calls[0][0]).toBe(newTitle);
  expect(onSubmit.mock.calls[0][1]).toBe(newAuthor);
  expect(onSubmit.mock.calls[0][2]).toBe(newUrl);
});
