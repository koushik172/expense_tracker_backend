import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

import * as s3 from "../utils/s3Storage.js";

const { uploadFiles, deleteFiles } = s3;

export const createReport = async (req, res) => {
	try {
		let list = await req.user.getExpenses({ attributes: ["amount", "description", "category", "type", "createdAt"] });

		// Create a new instance of jsPDF
		let doc = new jsPDF();

		// Convert the list to an array of arrays
		let data = list.map((item) => [item.amount, item.description, item.category, item.type, item.createdAt]);

		// Add the data to the PDF as a table
		await doc.autoTable({
			head: [["Amount", "Description", "Category", "Type", "CreatedAt"]],
			body: data,
		});

		let pdfContent = doc.output();

		let date = new Date();

		let filename = `${date.getDate()}_${date.getMonth() + 1}_${date.getFullYear()}.pdf`;

		let fileUrl = await uploadFiles(`User_${req.user.id} / ${filename}`, pdfContent);

		let hasReport = await req.user.getReports({ where: { fileName: filename }, limit: 1 });

		if (hasReport.length === 0) {
			await req.user.createReport({
				fileUrl: fileUrl,
				fileName: filename,
			});
		}

		res.status(200).json(fileUrl);
	} catch (error) {
		console.log(error);
	}
};

export const getReports = async (req, res) => {
	if (req.user.premium === false) return res.status(401).json("Unauthorised.");

	let data = await req.user.getReports({ where: { userId: req.user.id } });
	res.status(200).json({ reports: data });
};

export const deleteReport = async (req, res) => {
	if (req.user.premium === false) return res.status(401).json("Unauthorised.");
	deleteFiles(req.body.filename);
	res.status(200).json("");
};
