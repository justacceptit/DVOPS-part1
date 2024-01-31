terraform {
    required_providers {
        azurerm = {
            source = "hashicorp/azurerm"
        }
    }
}
provider "azurerm" {
    features {}
}
resource "azurerm_resource_group" "dvopsResourceGroup" {
    name = "dvopsResourceGroup"
    location = "East US"
}
resource "azurerm_kubernetes_cluster" "dvopsAKSCluster" {
    name = "dvopsAKSCluster"
    location = azurerm_resource_group.dvopsResourceGroup.location
    resource_group_name = azurerm_resource_group.dvopsResourceGroup.name
    dns_prefix = "rms-aks"
default_node_pool {
    name = "default"
    node_count = 1
    vm_size = "Standard_DS2_v2"
}
service_principal {
    client_id = "f6053be3-5d52-476c-956a-1479b38ead6e"
    client_secret = "jXV8Q~KoCOnkPb0G~YMBiru.5IwrKwBgOCcvlbVg"
    }
}