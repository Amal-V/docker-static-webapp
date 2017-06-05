angular.module("fr-qa-controller.config", [])
.constant("ENV", "development")
.constant("APP", {"NAME":"fr-qa-controller","API":"https://kdtpmsonx5.execute-api.us-east-1.amazonaws.com/Prod"})
.constant("SERVICES", {"SERVICE_ONE_URL":"www.example1.com","SERVICE_TWO_URL":"www.example2.com"});
