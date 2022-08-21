import { render, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { List } from '.';

describe('<App/>', () => {
	it('should render the list items', () => {
		const { getByText, queryByText, rerender } = render(
			<List initialItems={['user1', 'user2', 'user3']} />
		);

		expect(getByText('user1')).toBeInTheDocument();
		expect(getByText('user2')).toBeInTheDocument();
		expect(getByText('user3')).toBeInTheDocument();

		rerender(<List initialItems={['unknown']} />);
		// I use query because it can not break my test
		expect(queryByText('unknown')).not.toBeInTheDocument();
	});

	it('should be able to add new user to the list', async () => {
		const { getByText, findByText, getByPlaceholderText } = render(
			<List initialItems={[]} />
		);

		const input = getByPlaceholderText('New user');
		const newUser = 'user4';
		const addButton = getByText('Add new user');

		await userEvent.type(input, newUser);
		await userEvent.click(addButton);

		expect(await findByText(newUser)).toBeInTheDocument();

		// this code below also is a correct way todo the same above (waitFor => is a loop for waiting a valid response)
		// await waitFor(async () => {
		// 	expect(getByText(newUser)).toBeInTheDocument();
		// });
	});

	it('should be able to remove a user in the list', async () => {
		const { getAllByText, getByText, getAllByRole } = render(
			<List initialItems={['user1']} />
		);

		const firstUser = 'user1';
		const removeButtons = getAllByText('Remove user');

		await userEvent.click(removeButtons[0]);
		await waitForElementToBeRemoved(() => getByText(firstUser));

		// this code below also is a correct way todo the same above
		// await waitFor(() => {
		// 	expect(getByText(firstUser)).not.toBeInTheDocument();
		// });
	});
});
