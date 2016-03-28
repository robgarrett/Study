[CmdletBinding()]Param();

$global:rgName = "Study";
$global:location = "East US";

############################### Web Apps ###############################
##
$global:webAppName = "RobDev-TestWeb";
$webApp = Get-AzureRmWebApp -ResourceGroupName $global:rgName -Name $global:webAppName -ErrorAction SilentlyContinue;
if ((Get-AzureRmWebAppSlot -ResourceGroupName $global:rgName -Name $global:webAppName -Slot "staging" -ErrorAction SilentlyContinue) -ne $null) {
    Write-Verbose "Remove Staging Slot";
    Remove-AzureRmWebAppSlot -ResourceGroupName $global:rgName -Name $global:webAppName -Slot "staging";
}

if ($webApp -ne $null) {
    Write-Verbose "Removing Web App";
    Remove-AzureRMWebApp -Name $global:webAppName -ResourceGroup $global:rgName -Force;    
}

if ((Get-AzureRmAppServicePlan -ResourceGroupName $global:rgName -Name "$($global:webAppName)-ASP" -ErrorAction SilentlyContinue) -ne $null) {
    Write-Verbose "Removing App Service Plan";
    Remove-AzureRMAppServicePlan -Name "$($global:webAppName)-ASP" -ResourceGroup $global:rgName -Force;
}


############################### Resource Group Last ###############################
##
if ((Get-AzureRmResourceGroup -Name $global:rgName -ErrorAction SilentlyContinue) -ne $null) {
    Write-Verbose "Removing Resource Group";
    Remove-AzureRmResourceGroup -Name $global:rgName -Force;
}
