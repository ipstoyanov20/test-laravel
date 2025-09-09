import React, { useState, useEffect } from 'react';
import {
  Divider,
  Flex,
  LoadingSpinner,
  Text,
  Button,
  Select,
  Input,
  Box,
  Modal,
  ModalBody,
  ModalFooter,
  hubspot
} from '@hubspot/ui-extensions';

const languageOptions = [
  { label: 'English', value: 'en' },
  { label: 'Español', value: 'es' },
  { label: 'Français', value: 'fr' }
];

const HelpCenterTicket = ({ actions }) => {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [fetchData, setFetchData] = useState(null);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const getDisplayData = () => {
    if (fetchData && fetchData.status === 'success' && fetchData.data && fetchData.data.categories) {
      const apiCategories = fetchData.data.categories.map((category, index) => ({
        id: category.id ? category.id.toString() : `category-${index}`,
        name: category.title || 'Untitled Category',
        description: category.description || '',
        articles: (category.articles || []).map((article, articleIndex) => ({
          id: article.id ? article.id.toString() : `article-${index}-${articleIndex}`,
          title: typeof article.title === 'object' ? (article.title[selectedLanguage] || article.title.en || Object.values(article.title)[0]) : (article.title || 'Untitled Article'),
          content: typeof article.content === 'object' ? (article.content[selectedLanguage] || article.content.en || Object.values(article.content)[0]) : (article.content || 'No content available'),
          lastUpdated: article.updated || article.created || new Date().toISOString().split('T')[0]
        })),
        articlesCount: category.articles_count || (category.articles ? category.articles.length : 0),
        links: category._links || {}
      }));
      
      return {
        language: fetchData.data.site?.defaultLanguage || selectedLanguage,
        categories: apiCategories,
        site: fetchData.data.site || {}
      };
    }
    return {
      language: selectedLanguage,
      categories: [],
      site: {}
    };
  };

  const currentLanguageData = getDisplayData();

  useEffect(() => {
    handleFetch();
  }, []);

  const handleLanguageChange = (value) => {
    setIsLoading(true);
    setTimeout(() => {
      setSelectedLanguage(value);
      setSelectedCategory(null);
      setIsLoading(false);
    }, 300);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
  };

  const handleFetch = async () => {
    setFetchLoading(true);
    setFetchError(null);
    setFetchData(null);
    
    console.log('🚀 Starting fetch request...');
    
    try {
      const response = await hubspot.fetch('https://helpcenter.io/api/hubspot/data', {
        method: 'GET'
      });
      
      console.log('📡 Response received:', {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok,
        headers: Object.fromEntries(response.headers.entries())
      });
      
      if (!response.ok) {
        const errorDetails = {
          status: response.status,
          statusText: response.statusText,
          url: response.url,
          timestamp: new Date().toISOString()
        };
        
        console.error('❌ HTTP Error:', errorDetails);
        
        let errorBody = '';
        try {
          errorBody = await response.text();
          console.log('📄 Error response body:', errorBody);
        } catch (bodyError) {
          console.error('❌ Could not read error body:', bodyError);
        }
        
        throw new Error(`HTTP ${response.status}: ${response.statusText}\n\nURL: ${response.url}\nTime: ${errorDetails.timestamp}\n\nResponse Body: ${errorBody || 'No response body'}`);
      }
      
      const responseText = await response.text();
      console.log('📝 Raw response text:', responseText);
      
      if (!responseText || responseText.trim() === '') {
        const emptyResult = { 
          message: 'Empty response received', 
          status: 'success',
          timestamp: new Date().toISOString()
        };
        console.log('⚠️ Empty response:', emptyResult);
        setFetchData(emptyResult);
        return;
      }
      
      try {
        const data = JSON.parse(responseText);
        const result = { 
          ...data, 
          _meta: {
            timestamp: new Date().toISOString(),
            source: 'helpcenter-io.test',
            note: 'Live data from HelpCenter API'
          }
        };
        console.log('✅ Parsed JSON data:', result);
        setFetchData(result);
      } catch (parseError) {
        const parseResult = { 
          message: 'Received non-JSON response', 
          content: responseText,
          parseError: parseError.message,
          status: 'success',
          timestamp: new Date().toISOString()
        };
        console.log('⚠️ JSON Parse Error:', parseResult);
        setFetchData(parseResult);
      }
    } catch (error) {
      const fullError = {
        message: error.message,
        name: error.name,
        stack: error.stack,
        timestamp: new Date().toISOString()
      };
      
      console.error('💥 Fetch Error:', fullError);
      setFetchError(`${error.name}: ${error.message}\n\nStack Trace:\n${error.stack}\n\nTime: ${fullError.timestamp}`);
    } finally {
      setFetchLoading(false);
      console.log('🏁 Fetch operation completed');
    }
  };
  const filteredCategories = currentLanguageData.categories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.articles.some(article =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  if (isLoading || fetchLoading) {
    return (
      <Flex direction="column" align="center" gap="medium">
        <LoadingSpinner />
        <Text>Loading help center content...</Text>
      </Flex>
    );
  }

  return (
    <Flex direction="row" gap="none" style={{ minHeight: '700px', backgroundColor: '#f8f9fa' }}>
      <Box style={{
        width: '320px',
        borderRight: '1px solid #e1e5e9',
        padding: '20px',
        backgroundColor: 'white',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <Flex direction="column" gap="medium">
          <Flex justify="space-between" gap={'small'} align="center">
            <Text format={{ fontWeight: 'bold', fontSize: '12px', color: '#2c5282' }}>
              Help Center
            </Text>
            <Flex gap="small" align="center">
              <Select
                label=""
                name="language"
                options={languageOptions}
                value={selectedLanguage}
                onChange={handleLanguageChange}
              />
              <Button
                variant="secondary"
                onClick={handleFetch}
                disabled={fetchLoading}
                style={{ padding: '8px', minWidth: '32px' }}
              >
                {fetchLoading ? '⟳' : '↻'}
              </Button>
            </Flex>
          </Flex>

          <Input
            label=""
            name="search"
            placeholder=" Search articles..."
            value={searchQuery}
            onChange={setSearchQuery}
          />

          <Divider />

          {!selectedCategory ? (
            <Flex direction="column" gap="small">
              <Text format={{ fontWeight: 'bold', color: '#4a5568', fontSize: '16px' }}>
                Categories
              </Text>
              {currentLanguageData.categories.length === 0 ? (
                <Box style={{
                  padding: '20px',
                  textAlign: 'center',
                  backgroundColor: '#f7fafc',
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0'
                }}>
                  <Text format={{ color: '#718096' }}>
                    {fetchError ? 'Failed to load categories' : 'No categories available'}
                  </Text>
                  {fetchError && (
                    <Text format={{ fontSize: '11px', color: '#e53e3e' }}>
                      Click refresh to try again
                    </Text>
                  )}
                </Box>
              ) : filteredCategories.map((category) => (
                <Box key={category.id} style={{ marginBottom: '8px' }}>
                  <Button
                    variant="secondary"
                    onClick={() => handleCategoryClick(category)}
                    style={{ width: '100%' }}
                  >
                    {category.name}
                  </Button>
                </Box>
              ))}
            </Flex>
            </Flex>
          ) : (
            <Flex direction="column" gap="small">
              <Button
                variant="secondary"
                onClick={handleBackToCategories}
                style={{ 
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  fontSize: '14px'
                }}
              >
                ← Back to Categories
              </Button>
              <Text format={{ fontWeight: 'bold', color: '#2d3748', fontSize: '16px' }}>
                {selectedCategory.name}
              </Text>
              {selectedCategory.description && (
                <Text format={{ fontSize: '12px', color: '#666', fontStyle: 'italic' }}>
                  {selectedCategory.description}
                </Text>
              )}
              {selectedCategory.articles && selectedCategory.articles.length > 0 ? (
                selectedCategory.articles.map((article) => (
                <Button
                  key={article.id}
                  variant="secondary"
                  style={{ width: '100%' }}
                  overlay={
                    <Modal
                      id={`article-${article.id}`}
                      title={` ${article.title}`}
                      width="lg"
                    >
                      <ModalBody>
                        <Flex direction="column" gap="medium">
                          <Box style={{ 
                            padding: '8px 12px', 
                            backgroundColor: '#ebf8ff', 
                            borderRadius: '8px',
                            borderLeft: '4px solid #3182ce',
                            marginTop: '-8px'
                          }}>
                            <Text variant="microcopy" format={{ color: '#2c5282', fontWeight: 'medium' }}>
                              {selectedCategory?.name} • 🕰️ {article.lastUpdated}
                            </Text>
                          </Box>

                          <Box style={{
                            padding: '20px',
                            backgroundColor: '#f7fafc',
                            borderRadius: '12px',
                            border: '1px solid #e2e8f0'
                          }}>
                            <Text style={{
                              lineHeight: '1.7',
                              fontSize: '15px',
                              color: '#2d3748'
                            }}
                            dangerouslySetInnerHtml={{
                              __html: article.content
                            }}
                            />
                          </Box>

                          <Box style={{
                            padding: '16px',
                            backgroundColor: '#f0fff4',
                            borderRadius: '8px',
                            border: '1px solid #c6f6d5'
                          }}>
                            <Flex direction="column" gap="small">
                              <Text format={{ fontWeight: 'bold', color: '#22543d' }}>
                                Was this article helpful?
                              </Text>
                              <Flex direction="row" gap="small">
                                <Button variant="primary" style={{ borderRadius: '8px' }}>
                                  👍 Yes, this helped!
                                </Button>
                                <Button variant="secondary" style={{ borderRadius: '8px' }}>
                                  👎 Need more help
                                </Button>
                              </Flex>
                            </Flex>
                          </Box>
                        </Flex>
                      </ModalBody>
                      <ModalFooter>
                        <Flex justify="space-between" gap='small' align="center" style={{ width: '100%' }}>
                          <Button variant="secondary" style={{ borderRadius: '8px' }}>
                            Share Article
                          </Button>
                          <Button
                            variant="primary"
                            onClick={() => actions.closeOverlay(`article-${article.id}`)}
                            style={{ borderRadius: '8px' }}
                          >
                            ✓ Close
                          </Button>
                        </Flex>
                      </ModalFooter>
                    </Modal>
                  }
                >
                  {article.title.split(' ').slice(0, 3).join(' ')}...
                </Button>
                ))
              ) : (
                <Box style={{
                  padding: '16px',
                  backgroundColor: '#f7fafc',
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0',
                  textAlign: 'center'
                }}>
                  <Text format={{ color: '#718096' }}>
                    No articles available in this category yet.
                  </Text>
                  {selectedCategory.links && selectedCategory.links.view && (
                    <Text format={{ fontSize: '11px', color: '#4a5568' }}>
                      View online: {selectedCategory.links.view}
                    </Text>
                  )}
                </Box>
              )}
            </Flex>
          )}
          
          <Divider />
          
          {fetchError && (
            <Box style={{ 
              padding: '8px', 
              backgroundColor: '#fed7d7', 
              borderRadius: '4px', 
              border: '1px solid #f56565' 
            }}>
              <Text format={{ fontSize: '12px', color: '#c53030' }}>
                Error: {fetchError}
              </Text>
            </Box>
          )}
        </Flex>
      </Box>

    </Flex>
  );
};

hubspot.extend(
  ({ context, actions }) => (
    <HelpCenterTicket actions={actions} />
  ),
  {
    languageOptions: {
      react: true
    }
  }
);

export default HelpCenterTicket;
