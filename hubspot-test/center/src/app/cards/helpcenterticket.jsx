import { useEffect, useState } from 'react';
import { hubspot, Text, Alert, Flex, LoadingSpinner } from '@hubspot/ui-extensions';

hubspot.extend(({ context }) => <HelpCenterApp context={context} />);

const HelpCenterApp = ({ context }) => {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Заменете с вашия реален API ключ от HelpCenter.io
  const API_KEY = '9mf91MrWS9EEJTK7h8ij4gW6gxLVg4TS1oCnk8VM1SsxyrLycXHPBSiGCaOX1cSg';
  const BASE_URL = 'https://helpcenter-io.test/api/hubspot';

  const headers = {
    'Authorization': `Bearer ${API_KEY}`,
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        const response = await hubspot.fetch(`${BASE_URL}/data`, {
          method: 'GET',
          headers: headers,
          timeout: 10000
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        
        if (data.status === 'success') {
          setCategories(data.data.categories || []);
          setError(null);
        } else {
          setError(data.message || 'Failed to load data');
        }
      } catch (err) {
        console.error('Error fetching initial data:', err);
        setError(`Failed to connect to HelpCenter: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  const searchArticles = async (query) => {
    if (!query.trim()) return;
    
    try {
      setLoading(true);
      const response = await hubspot.fetch(`${BASE_URL}/search`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ q: query }),
        timeout: 10000
      });

      const data = await response.json();
      
      if (data.status === 'success') {
        setArticles(data.data.articles || []);
      } else {
        setError(data.message || 'Search failed');
      }
    } catch (err) {
      console.error('Error searching articles:', err);
      setError(`Search failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const getSuggestions = async (query) => {
    if (!query.trim()) return;
    
    try {
      const response = await hubspot.fetch(`${BASE_URL}/suggestions?q=${encodeURIComponent(query)}`, {
        method: 'GET',
        headers: headers,
        timeout: 10000
      });

      const data = await response.json();
      
      if (data.status === 'success') {
        return data.data.articles || [];
      }
    } catch (err) {
      console.error('Error getting suggestions:', err);
    }
    return [];
  };

  if (loading && !categories.length) {
    return (
      <Flex direction="column" align="center" gap="medium">
        <LoadingSpinner />
        <Text>Loading HelpCenter data...</Text>
      </Flex>
    );
  }

  if (error) {
    return (
      <Alert title="Connection Error" variant="error">
        {error}
      </Alert>
    );
  }

  return (
    <Flex direction="column" gap="medium">
      <Text variant="microcopy">
        HelpCenter Integration - {categories.length} categories loaded
      </Text>
      
      {categories.length > 0 && (
        <Flex direction="column" gap="small">
          <Text variant="bold">Available Categories:</Text>
          {categories.slice(0, 5).map((category, index) => (
            <Text key={index}>• {category.name}</Text>
          ))}
        </Flex>
      )}

      {articles.length > 0 && (
        <Flex direction="column" gap="small">
          <Text variant="bold">Search Results:</Text>
          {articles.slice(0, 3).map((article, index) => (
            <Text key={index}>• {article.title}</Text>
          ))}
        </Flex>
      )}
    </Flex>
  );
};