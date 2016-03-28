[CmdletBinding()]Param();

$global:rgName = "Study";
$global:location = "East US";

############################### Resource Group First ###############################
##
if ((Get-AzureRmResourceGroup -Name $global:rgName -ErrorAction SilentlyContinue) -eq $null) {
    Write-Verbose "Creating Resource Group";
    New-AzureRmResourceGroup -Name $global:rgName -Location $global:location;
}

############################### Web Apps ###############################
##
$global:webAppName = "RobDev-TestWeb";
if ((Get-AzureRmAppServicePlan -ResourceGroupName $global:rgName -Name "$($global:webAppName)-ASP" -ErrorAction SilentlyContinue) -eq $null) {
    Write-Verbose "Creating App Service Plan";
    New-AzureRMAppServicePlan -Name "$($global:webAppName)-ASP" -Location $global:location -ResourceGroup $global:rgName -Tier Standard;
}

$webApp = Get-AzureRmWebApp -ResourceGroupName $global:rgName -Name $global:webAppName -ErrorAction SilentlyContinue;
if ($webApp -eq $null) {
    Write-Verbose "Creating Web App";
    New-AzureRMWebApp -Name $global:webAppName -Location $global:location -ResourceGroup $global:rgName -AppServicePlan "$($global:webAppName)-ASP";    
}

Write-Host -ForegroundColor Yellow "WebSite Address is: http://$($webApp.EnabledHostNames[0])";
if ((Get-AzureRmWebAppSlot -ResourceGroupName $global:rgName -Name $global:webAppName -Slot "staging" -ErrorAction SilentlyContinue) -eq $null) {
    Write-Verbose "Creating Staging Slot";
    New-AzureRmWebAppSlot -ResourceGroupName $global:rgName -Name $global:webAppName -Slot "staging" -AppServicePlan "$($global:webAppName)-ASP";
}

Write-Verbose "Running a test swap with staging";
$ParametersObject = @{targetSlot  = "production"}
Invoke-AzureRmResourceAction -ResourceGroupName $global:rgName -ResourceType Microsoft.Web/sites/slots -ResourceName "$($global:webAppName)/staging" -Action slotsswap -Parameters $ParametersObject;
