# Alternative Development Workflow for HubSpot Private App
# Use this when 'hs project dev' gets stuck

Write-Host "🚀 HubSpot Development Workflow" -ForegroundColor Green
Write-Host "==============================" -ForegroundColor Green

Write-Host "`n📋 Step 1: Install Dependencies" -ForegroundColor Yellow
hs project install-deps

Write-Host "`n📦 Step 2: Upload Changes" -ForegroundColor Yellow
hs project upload

Write-Host "`n🌐 Step 3: Open Project in Browser" -ForegroundColor Yellow
hs project open

Write-Host "`n✅ Development Process Complete!" -ForegroundColor Green
Write-Host "Your app changes are now live in HubSpot." -ForegroundColor Green
Write-Host ""
Write-Host "🔍 To test your app:" -ForegroundColor Cyan
Write-Host "1. Go to any Contact record in HubSpot" -ForegroundColor White
Write-Host "2. Look for 'Custom Contact Analytics' card" -ForegroundColor White
Write-Host "3. Make changes to your code" -ForegroundColor White
Write-Host "4. Run this script again to upload changes" -ForegroundColor White
