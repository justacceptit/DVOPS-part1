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
    client_id = "db38f2ea-7803-465d-8ea5-3f006db84950"
    client_secret = "UvR8Q~o2x6Tp-6fuI_IjOsKbxcPxuYj7IMrOxbQo"
    }
}