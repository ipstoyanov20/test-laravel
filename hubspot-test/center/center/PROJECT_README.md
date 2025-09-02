# Custom Contact Analytics - HubSpot Private App

A custom private app that provides enhanced contact analytics and insights directly within HubSpot CRM.

## 🎯 Overview

This HubSpot private app demonstrates how to build custom UI extensions that integrate seamlessly with HubSpot's CRM interface. The app displays a custom card on contact records with enhanced analytics and contact information.

## 🚀 Features

- **Custom Contact Analytics Card**: Displays enhanced contact information with visual improvements
- **Real-time Data Refresh**: Users can manually refresh contact data
- **Modern UI Components**: Uses HubSpot's UI extension library for consistent design
- **Responsive Layout**: Adapts to different screen sizes and layouts
- **Error Handling**: Graceful error handling with retry functionality

## 🏗️ Project Structure

```
center/
├── hsproject.json                 # Project configuration
├── src/
│   └── app/
│       ├── app-hsmeta.json       # Main app configuration
│       └── cards/
│           ├── get-started-app-card.jsx         # Main card component (React)
│           ├── get-started-app-card-hsmeta.json # Card configuration
│           ├── package.json                      # Dependencies
│           └── package-lock.json                # Locked dependencies
└── PROJECT_README.md             # This file
```

## 📋 Prerequisites

- HubSpot account (free or paid)
- Node.js (v14 or higher)
- HubSpot CLI (`npm install -g @hubspot/cli`)
- Private app created in HubSpot with appropriate scopes

## 🔧 Required Scopes

The app requires the following HubSpot scopes:

### Required Scopes:
- `crm.objects.contacts.read` - Read contact data
- `crm.objects.contacts.write` - Write contact data
- `crm.objects.companies.read` - Read company data
- `crm.objects.deals.read` - Read deal data

### Optional Scopes:
- `crm.schemas.contacts.read` - Read contact schema definitions

## 🛠️ Installation & Setup

### 1. Install HubSpot CLI
```bash
npm install -g @hubspot/cli
```

### 2. Initialize HubSpot CLI
```bash
hs init
```
Follow the prompts to authenticate with your HubSpot account.

### 3. Project Setup
This project was created using:
```bash
hs get-started
```

### 4. Install Dependencies
```bash
hs project install-deps
```

### 5. Upload to HubSpot
```bash
hs project upload
```

## 🧪 Development

### Local Development Server
To start local development with hot-reload:
```bash
hs project dev
```

### Building and Deploying
To upload changes to HubSpot:
```bash
hs project upload
```

## 📱 App Components

### Main App (`app-hsmeta.json`)
- **Name**: Custom Contact Analytics App
- **Distribution**: Private
- **Authentication**: Static token
- **Location**: CRM contact records

### Contact Analytics Card (`get-started-app-card.jsx`)
- **Framework**: React with HubSpot UI Extensions
- **Location**: Contact record tabs
- **Features**:
  - Contact information display
  - Quick stats (deal count, revenue)
  - Data refresh functionality
  - Loading states and error handling
  - Responsive design

## 🎨 UI Components Used

The app utilizes HubSpot's UI extension library:
- `Text` - Text display with various formatting options
- `Button` - Interactive buttons for actions
- `LoadingSpinner` - Loading indicators
- `Flex` & `Box` - Layout components
- `Divider` - Visual separators
- `Alert` - Error and info messages
- `Tag` - Status indicators
- `Link` - External links
- `List` - Organized information lists

## 📊 Data Flow

1. **Context Retrieval**: App gets contact ID from HubSpot context
2. **Data Fetching**: Simulated API call to get contact data (in production, this would call HubSpot's API)
3. **State Management**: React hooks manage loading, error, and data states
4. **UI Rendering**: Components render based on current state
5. **User Interaction**: Refresh button allows manual data updates

## 🔐 Security Features

- **Static Authentication**: Uses HubSpot's static token authentication
- **Scope Limitations**: Only requests necessary permissions
- **Secure Configuration**: Sensitive data stored in HubSpot's secure environment

## 🚦 Next Steps & Enhancements

### Immediate Improvements:
1. **Real API Integration**: Replace mock data with actual HubSpot API calls
2. **Additional Data Sources**: Integrate with deals, companies, and tickets
3. **Custom Properties**: Display custom contact properties
4. **Data Visualization**: Add charts and graphs

### Advanced Features:
1. **Workflow Automation**: Trigger actions based on contact data
2. **External Integrations**: Connect with third-party services
3. **Bulk Operations**: Process multiple contacts
4. **Custom Reports**: Generate analytics reports

## 🐛 Troubleshooting

### Common Issues:

1. **"No contact ID found"**: Ensure the app is installed and the card is placed on a contact record
2. **Build failures**: Check that all dependencies are properly installed
3. **Authentication errors**: Verify your private app has the required scopes

### Debug Commands:
```bash
# Check project status
hs project status

# View logs
hs logs

# Reinstall dependencies
hs project install-deps

# Re-upload project
hs project upload
```

## 📚 Learning Resources

- [HubSpot Developer Documentation](https://developers.hubspot.com/docs)
- [UI Extensions Reference](https://developers.hubspot.com/docs/platform/ui-components)
- [Private Apps Guide](https://developers.hubspot.com/docs/platform/private-apps)
- [HubSpot API Reference](https://developers.hubspot.com/docs/api/overview)

## 🤝 Support

For questions and support:
- [HubSpot Developer Community](https://community.hubspot.com/t5/developers/ct-p/developers)
- [HubSpot Developer Slack](https://developers.hubspot.com/slack)
- [Official Documentation](https://developers.hubspot.com/docs)

---

**Built with ❤️ using HubSpot's Developer Platform**
