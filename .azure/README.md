# Azure Deployment Assets

Exemplary deployment configurations of the demonstration site using Azure App Service, which costs no money.

There is a free plan of Azure App Service with limited resources for us to deploy our docker containers. It's totally enough for demonstration scenarios. But since Azure do not offer free databases, SQLite is the best choice for us. According to [this issue](https://github.com/MicrosoftDocs/azure-docs/issues/47130), SQLite cannot directly work in Azure Persisted Storage, but it works properly in containers. Therefore, as a workaround, we can access the database file in the container, and copy it to the Azure Persisted Storage periodically. This workaround is terrible, but it seems to be the best solution.
