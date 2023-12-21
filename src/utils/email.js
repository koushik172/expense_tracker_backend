import pkg from "sib-api-v3-sdk";
const { ApiClient, TransactionalEmailsApi, SendSmtpEmail } = pkg;

/**
 * Accepts an object with :
 *
 * name,
 * email,
 * subject,
 * body(can be a html body),
 *
 */

export const Email = async (data) => {
	// Configure API key authorization
	const defaultClient = ApiClient.instance;
	const apiKey = defaultClient.authentications["api-key"];
	apiKey.apiKey = process.env.SIB_KEY; // Replace with your API key

	const apiInstance = new TransactionalEmailsApi();

	let sendSmtpEmail = new SendSmtpEmail();

	// Define the sender
	sendSmtpEmail.sender = {
		name: "expense_tracker_2.0",
		email: "koushikrajbanshi62@gmail.com",
	};

	// Define the recipient
	sendSmtpEmail.to = [
		{
			email: data.email,
			name: data.name,
		},
	];

	// Define the email content
	sendSmtpEmail.subject = data.subject;
	sendSmtpEmail.htmlContent = `<html><body><div>${data.body}</div></body></html>`;

	// Send the email
	await apiInstance
		.sendTransacEmail(sendSmtpEmail)
		.then((data) => {
			console.log("API called successfully. Returned data: " + Object.values(data));
		})
		.catch((error) => {
			console.error(error);
		});
};
