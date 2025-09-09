import React, { useState } from 'react';
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
const testData = {
  en: {
    language: 'English',
    categories: [
      {
        id: 'billing',
        name: 'Billing & Payments',
        articles: [
          {
            id: 'billing-1',
            title: 'How to update payment method',
            content: 'To update your payment method, navigate to Account Settings > Billing > Payment Methods. Click "Add New Payment Method" and follow the prompts to add your new card or payment information.',
            lastUpdated: '2024-01-15'
          },
          {
            id: 'billing-2',
            title: 'Understanding your invoice',
            content: 'Your monthly invoice includes all charges for your subscription, additional features, and usage-based fees. You can download your invoice from the Billing section of your account.',
            lastUpdated: '2024-01-10'
          }
        ]
      },
      {
        id: 'technical',
        name: 'Technical Support',
        articles: [
          {
            id: 'tech-1',
            title: 'API Integration Guide',
            content: 'Our REST API allows you to integrate your systems with our platform. You\'ll need an API key which can be generated in your developer settings. Full documentation is available in our API reference.',
            lastUpdated: '2024-01-20'
          },
          {
            id: 'tech-2',
            title: 'Troubleshooting connection issues',
            content: 'If you\'re experiencing connection issues, first check your internet connection. Then verify your firewall settings allow connections to our domains. Contact support if issues persist.',
            lastUpdated: '2024-01-18'
          }
        ]
      },
      {
        id: 'account',
        name: 'Account Management',
        articles: [
          {
            id: 'account-1',
            title: 'Changing your subscription plan',
            content: 'You can upgrade or downgrade your subscription at any time from Account Settings > Subscription. Changes take effect immediately for upgrades, or at the next billing cycle for downgrades.',
            lastUpdated: '2024-01-12'
          }
        ]
      }
    ]
  },
  es: {
    language: 'Español',
    categories: [
      {
        id: 'billing',
        name: 'Facturación y Pagos',
        articles: [
          {
            id: 'billing-1',
            title: 'Cómo actualizar el método de pago',
            content: 'Para actualizar su método de pago, navegue a Configuración de Cuenta > Facturación > Métodos de Pago. Haga clic en "Agregar Nuevo Método de Pago" y siga las instrucciones para agregar su nueva tarjeta o información de pago.',
            lastUpdated: '2024-01-15'
          },
          {
            id: 'billing-2',
            title: 'Entendiendo su factura',
            content: 'Su factura mensual incluye todos los cargos por su suscripción, características adicionales y tarifas basadas en uso. Puede descargar su factura desde la sección de Facturación de su cuenta.',
            lastUpdated: '2024-01-10'
          }
        ]
      },
      {
        id: 'technical',
        name: 'Soporte Técnico',
        articles: [
          {
            id: 'tech-1',
            title: 'Guía de Integración API',
            content: 'Nuestra API REST le permite integrar sus sistemas con nuestra plataforma. Necesitará una clave API que puede generar en su configuración de desarrollador. La documentación completa está disponible en nuestra referencia API.',
            lastUpdated: '2024-01-20'
          }
        ]
      }
    ]
  },
  fr: {
    language: 'Français',
    categories: [
      {
        id: 'billing',
        name: 'Facturation et Paiements',
        articles: [
          {
            id: 'billing-1',
            title: 'Comment mettre à jour votre méthode de paiement',
            content: 'Pour mettre à jour votre méthode de paiement, naviguez vers Paramètres du Compte > Facturation > Méthodes de Paiement. Cliquez sur "Ajouter une Nouvelle Méthode de Paiement" et suivez les instructions pour ajouter votre nouvelle carte ou informations de paiement.',
            lastUpdated: '2024-01-15'
          }
        ]
      },
      {
        id: 'technical',
        name: 'Support Technique',
        articles: [
          {
            id: 'tech-1',
            title: 'Guide d\'Intégration API',
            content: 'Notre API REST vous permet d\'intégrer vos systèmes avec notre plateforme. Vous aurez besoin d\'une clé API que vous pouvez générer dans vos paramètres développeur. La documentation complète est disponible dans notre référence API.',
            lastUpdated: '2024-01-20'
          }
        ]
      }
    ]
  }
};

const HelpCenterTicket = ({ actions }) => {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const currentLanguageData = testData[selectedLanguage];

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

  const languageOptions = [
    { label: 'English', value: 'en' },
    { label: 'Español', value: 'es' },
    { label: 'Français', value: 'fr' }
  ];

  const filteredCategories = currentLanguageData.categories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.articles.some(article =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  if (isLoading) {
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
            <Select
              label=""
              name="language"
              options={languageOptions}
              value={selectedLanguage}
              onChange={handleLanguageChange}
            />
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
              {filteredCategories.map((category) => (
                <Button
                  key={category.id}
                  variant="secondary"
                  onClick={() => handleCategoryClick(category)}
                >
                  {category.name}
                </Button>
              ))}
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
              {selectedCategory.articles.map((article) => (
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
                            }}>
                              {article.content}
                            </Text>
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
              ))}
            </Flex>
          )}
        </Flex>
      </Box>

    </Flex>
  );
};

hubspot.extend(({ context, runServerlessFunction, actions }) => (
  <HelpCenterTicket actions={actions} />
));

export default HelpCenterTicket;
