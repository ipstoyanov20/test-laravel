import React, { useState } from "react";
import {
	Text,
	Button,
	LoadingSpinner,
	Flex,
	Box,
	Alert,
	Heading,
} from "@hubspot/ui-extensions";
import { hubspot } from "@hubspot/ui-extensions";

hubspot.extend(() => <HelpCenterTicket />);

const HelpCenterTicket = () => {
	const [articles, setArticles] = useState([]);
	const [message, setMessage] = useState(null);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);

	const fetchArticles = async () => {
		setLoading(true);
		setError(null);
		setMessage(null);

		try {
			const resp = await fetch(`https://api.helpcenter.io/v1/articles`, {
				headers: {
					Accept: "application/json",
					apikey: "BZLqTTFgwQ0SasnBkT4bK6vVwGbjAYcdloCzqafkYO7qsrrmdyHdKjY18NGXfKe0",
				},
			});
			
			if (!resp.ok) {
				const err = await resp.json();
				throw new Error(err.error || "Unknown error");
			}
			
			const data = await resp.json();
			console.log(data);
			setArticles(data.data || []);
			setMessage(`Fetched ${data.data?.length || 0} articles`);
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	const handleCopyLink = (article) => {
		navigator.clipboard.writeText(article.url || "");
		setMessage("Link copied");
	};

	return (
		<Flex direction="column" gap="medium">
			<Heading size="sm">HelpCenter Articles</Heading>

			{message && (
				<Alert title="Success" variant="success">
					<Text>{message}</Text>
				</Alert>
			)}

			{error && (
				<Alert title="Error" variant="danger">
					<Text>{error}</Text>
					<Button onClick={() => setError(null)} variant="secondary" size="sm">
						Dismiss
					</Button>
				</Alert>
			)}

			<Button onClick={fetchArticles} disabled={loading}>
				{loading ? <LoadingSpinner /> : "Fetch Articles"}
			</Button>

			{articles.length === 0 && !loading ? (
				<Text>No articles found.</Text>
			) : (
				<Flex direction="column" gap="small">
					{articles.map((article) => (
						<Box
							key={article.id}
							style={{
								padding: "12px",
								border: "1px solid #e6e6e6",
								borderRadius: "4px",
							}}
						>
							<Text format={{ fontWeight: "bold" }}>
								{article.title?.en || `Article ${article.id}`}
							</Text>
							<Flex direction="row" gap="small" style={{ marginTop: "8px" }}>
								<Button size="xs" onClick={() => handleCopyLink(article)}>
									Copy Link
								</Button>
							</Flex>
						</Box>
					))}
				</Flex>
			)}
		</Flex>
	);
};

export default HelpCenterTicket;
