[CmdletBinding()]Param();

# Shutdown all study assets,

Get-AzureRMWebApp -ResourceGroup "Study" | % { Stop-AzureRMWebApp -Name $_.Name -ResourceGroupName "Study" }
