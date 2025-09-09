import React, { useState, useEffect } from "react";
import {
	Text,
	Link,
	List,
	Button,
	LoadingSpinner,
	Flex,
	Box,
	Divider,
	Alert,
	Tag,
	BarChart,
	Form,
	MultiSelect,
} from "@hubspot/ui-extensions";
import { hubspot } from "@hubspot/ui-extensions";

hubspot.extend(
	({ context, runServerlessFunction }) => (
		<Extension context={context} runServerlessFunction={runServerlessFunction} />
	),
	{
		languageOptions: {
			react: true
		}
	}
);

const Extension = ({ context, runServerlessFunction }) => {
	const [contactData, setContactData] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [formValue, setFormValue] = useState([]);

	const dailyInventorySample = [
		{
			Product: "Cats",
			Amount: 187,
		},
		{
			Product: "Dogs",
			Amount: 65,
		},
		{
			Product: "Frogs",
			Amount: 120,
		},
	];

	const contactId = context?.crm?.objectId;

	const fetchContactData = async () => {
		if (!contactId) {
			setError("No contact ID found");
			return;
		}

		setLoading(true);
		setError(null);

		try {
			const mockData = {
				id: contactId,
			};

			setContactData(mockData);
			new Date().toLocaleTimeString();
		} catch (err) {
			setError("Failed to fetch contact data: " + err.message);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchContactData();
	}, [contactId]);

	if (loading) {
		return (
			<Flex direction="column" align="center" gap="medium">
				<LoadingSpinner size="medium" />
				<Text>Loading contact data...</Text>
			</Flex>
		);
	}

	if (error) {
		return (
			<Alert title="Error" variant="error">
				<Text>{error}</Text>
				<Button onClick={fetchContactData} variant="primary">
					Retry
				</Button>
			</Alert>
		);
	}

	return (
		<Flex direction="column" gap="medium">
			<Text variant="microcopy" format={{ fontWeight: "bold" }}>
				My custom view
			</Text>

			{contactData && (
				<>
					<Box>
						<Flex direction="row" gap="small" wrap="wrap">
							<Tag variant="success">ID: {contactData.id}</Tag>
							<Tag variant="info">Active Contact</Tag>
						</Flex>
					</Box>

					<Divider />
				</>
			)}

			<List variant="unordered-styled">
				<Link href="https://developers.hubspot.com/docs/platform/ui-components">
					UI Components Documentation
				</Link>
			</List>
			<Divider />

			<BarChart
				data={dailyInventorySample}
				axes={{
					x: { field: "Product", fieldType: "category" },
					y: { field: "Amount", fieldType: "linear" },
					options: { groupFieldByColor: "Product" },
				}}
				options={{
					title: "My chart",
					showLegend: true,
					showDataLabels: true,
					showTooltips: true,
				}}
			/>

			<Divider />

			<Form
				preventDefault={true}
				onSubmit={() => console.log(formValue, "Коректно")}
			>
				<MultiSelect
					value={formValue}
					placeholder="Pick"
					label="Choose skills"
					name="selectProduct"
					required={true}
					onChange={(value) => setFormValue(value)}
					options={[
						{ label: "Angular", value: "p1" },
						{ label: "React", value: "p2" },
						{ label: ".NET", value: "p3" },
						{ label: "Laravel", value: "p4" },
						{ label: "PHP", value: "p5" },
						{ label: "Warp AI", value: "p6" },
					]}
				/>
				<Button type="submit">Submit</Button>
			</Form>
		</Flex>
	);
};
