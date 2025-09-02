# 🚀 Deployment Checklist & Testing Guide

## ✅ Pre-Deployment Checklist

### 1. Environment Setup
- [ ] HubSpot CLI installed (`hs --version`)
- [ ] Authenticated with HubSpot (`hs auth info`)
- [ ] Project dependencies installed (`hs project install-deps`)

### 2. Configuration Verification
- [ ] `hsproject.json` contains correct project name
- [ ] `app-hsmeta.json` has proper app configuration
- [ ] Required scopes are configured
- [ ] Card metadata is properly set

### 3. Code Quality
- [ ] React components are syntactically correct
- [ ] No console errors in local development
- [ ] UI components are properly imported
- [ ] Error handling is implemented

### 4. Security
- [ ] No hardcoded secrets or API keys
- [ ] Proper scope limitations
- [ ] hubspot.config.yml not tracked in git

## 🧪 Testing Procedures

### Local Testing
```bash
# Start local development server
hs project dev
```

**Expected Results:**
- [ ] Server starts without errors
- [ ] App loads in HubSpot interface
- [ ] UI components render correctly
- [ ] Refresh functionality works
- [ ] Error states display properly

### Production Deployment
```bash
# Upload to HubSpot
hs project upload
```

**Expected Results:**
- [ ] Upload completes successfully
- [ ] Build process succeeds
- [ ] Auto-deployment completes
- [ ] No build warnings (except known OAuth warning)

### Post-Deployment Verification

#### 1. App Installation
1. Navigate to: `https://app.hubspot.com/developer-projects/[PORTAL-ID]/project/center`
2. Verify app appears in developer projects
3. Install app if not already installed

#### 2. UI Testing
1. Go to a contact record in HubSpot
2. Look for "Custom Contact Analytics" card
3. Verify card displays properly
4. Test refresh functionality
5. Check responsive behavior

#### 3. Functionality Testing
- [ ] Contact ID is correctly retrieved from context
- [ ] Mock data displays properly
- [ ] Loading spinner appears during refresh
- [ ] Error handling works (simulate errors)
- [ ] All UI elements are clickable and functional

## 🔍 Common Issues & Solutions

### Issue: "No contact ID found"
**Solution:** Ensure you're viewing the card on an actual contact record, not the contacts list view.

### Issue: Build fails
**Solutions:**
1. Check syntax errors in JSX files
2. Verify all imports are correct
3. Run `hs project install-deps` again

### Issue: Card doesn't appear
**Solutions:**
1. Ensure app is installed in your HubSpot account
2. Check that card location is set to "crm.record.tab"
3. Verify object types includes "CONTACT"

### Issue: Authentication errors
**Solutions:**
1. Re-run `hs init` to re-authenticate
2. Check private app scopes in HubSpot settings
3. Verify access token hasn't expired

## 📊 Performance Checklist

### App Performance
- [ ] Initial load time < 2 seconds
- [ ] Smooth UI interactions
- [ ] No memory leaks in React components
- [ ] Proper cleanup in useEffect hooks

### HubSpot Integration
- [ ] Minimal API calls
- [ ] Proper error handling for API failures
- [ ] Respectful of rate limits
- [ ] Efficient data fetching

## 🚦 Go-Live Checklist

### Before Launch
- [ ] All tests passed
- [ ] Documentation is complete
- [ ] Support contacts are updated
- [ ] Backup deployment plan ready

### Launch Process
1. [ ] Upload final version (`hs project upload`)
2. [ ] Verify successful deployment
3. [ ] Test in production environment
4. [ ] Monitor for errors
5. [ ] Inform users of new app availability

### Post-Launch
- [ ] Monitor app performance
- [ ] Check for user-reported issues
- [ ] Review HubSpot logs for errors
- [ ] Document any issues found

## 🔧 Rollback Plan

If issues occur after deployment:

1. **Immediate Response:**
   ```bash
   # Check recent deployments
   hs project status
   
   # View deployment history
   # (Navigate to HubSpot developer projects interface)
   ```

2. **Rollback Options:**
   - Deploy previous version from git
   - Disable app temporarily
   - Fix issues and redeploy

3. **Communication:**
   - Notify affected users
   - Document issues and resolution
   - Update deployment procedures

## 📈 Monitoring & Maintenance

### Regular Checks
- [ ] Weekly: Check app performance metrics
- [ ] Monthly: Review user feedback
- [ ] Quarterly: Update dependencies
- [ ] As needed: HubSpot platform updates

### Key Metrics to Track
- App installation rate
- User engagement with card
- Error rates and types
- Performance metrics

## 🎯 Success Criteria

**Deployment is considered successful when:**
- [ ] App installs without errors
- [ ] All UI elements function correctly
- [ ] Performance meets expectations
- [ ] No critical errors in logs
- [ ] Users can complete intended workflows

---

**Date:** {{ deployment_date }}  
**Version:** {{ app_version }}  
**Deployed by:** {{ deployer_name }}
