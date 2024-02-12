
export async function getAccountName(email:string) {
	const usr = email.split('@')[0];
	const user = usr.split('\.');
    console.log(user);
	return `${capitalizeFirstLetter(user[0])} ${capitalizeFirstLetter(user[1])}`;
}

function capitalizeFirstLetter(string:string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}
