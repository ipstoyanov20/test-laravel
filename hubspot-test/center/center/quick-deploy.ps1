# Quick Deploy Script for HubSpot App Development
# Use this instead of the dev server for main account testing

Write-Host "🚀 Deploying HubSpot App Changes" -ForegroundColor Green
Write-Host "================================" -ForegroundColor Green

# Upload changes
Write-Host "`n📦 Uploading changes to HubSpot..." -ForegroundColor Yellow
hs project upload --config ../hubspot.config.yml

Write-Host "`n✅ Deployment Complete!" -ForegroundColor Green
Write-Host ""
Write-Host "🔍 To test your changes:" -ForegroundColor Cyan
Write-Host "1. Go to any Contact record in your HubSpot account" -ForegroundColor White
Write-Host "2. Look for 'Custom Contact Analytics' card/tab" -ForegroundColor White
Write-Host "3. Verify your changes are visible" -ForegroundColor White
Write-Host ""
Write-Host "📝 Development tip:" -ForegroundColor Yellow
Write-Host "- Make code changes" -ForegroundColor White  
Write-Host "- Run this script to deploy" -ForegroundColor White
Write-Host "- Test in HubSpot immediately" -ForegroundColor White
