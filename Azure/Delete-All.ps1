[CmdletBinding()]Param();

$global:rgName = "Study";
$global:location = "East US";

############################### Web Apps ###############################
##
Get-AzureRmResource | ? { $_.ResourceType -match "Microsoft.Web/sites/slots" } | % {
    Write-Verbose "Removing Web App Slot $($_.Name)";
    Remove-AzureRmResource -ResourceId $_.ResourceId -Force | Out-Null;
}

Get-AzureRmWebApp -ResourceGroupName $global:rgName | ? { $_.Name -ne $null } | % {
    Write-Verbose "Removing Web App $($_.Name)";
    Remove-AzureRMWebApp -Name $_.Name -ResourceGroup $global:rgName -Force;    
}

Get-AzureRmAppServicePlan -ResourceGroupName $global:rgName | % {
    Write-Verbose "Removing App Service Plan $($_.Name)";
    Remove-AzureRMAppServicePlan -Name "$($_.Name)" -ResourceGroup $global:rgName -Force;
}

############################### Resource Group Last ###############################
##
#if ((Get-AzureRmResourceGroup -Name $global:rgName -ErrorAction SilentlyContinue) -ne $null) {
#    Write-Verbose "Removing Resource Group";
#    Remove-AzureRmResourceGroup -Name $global:rgName -Force;
#}
