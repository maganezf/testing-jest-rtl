import { useState } from 'react';

interface ListProps {
	initialItems: string[];
}

export function List({ initialItems }: ListProps) {
	const [newUser, setNewUser] = useState<string>('');
	const [list, setList] = useState<string[]>(initialItems);

	const addToList = () =>
		setTimeout(() => {
			setList(state => [...state, newUser]);
			setNewUser('');
		}, 500);

	const removeFromList = (userToRemove: string) =>
		setTimeout(() => {
			setList(state => state.filter(user => user !== userToRemove));
			setNewUser('');
		}, 500);

	return (
		<>
			<h1 className="title">Hello World</h1>
			<p data-testid="description">
				Lorem ipsum dolor sit amet consectetur adipisicing elit.
			</p>

			<input
				type="text"
				placeholder="New user"
				value={newUser}
				onChange={({ target: { value } }) => setNewUser(value)}
			/>

			<button
				type="button"
				onClick={addToList}
				disabled={list.includes(newUser)}
			>
				Add new user
			</button>

			<ul>
				{list.map((user, key) => (
					<li key={user + key}>
						{user}{' '}
						<button type="button" onClick={() => removeFromList(user)}>
							Remove user
						</button>
					</li>
				))}
			</ul>
		</>
	);
}
