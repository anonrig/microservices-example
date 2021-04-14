## Deployment

We will be using Helm charts to deploy GRPC and HTTP microservices.

**Dependencies**: You need to install [PostgreSQL](https://github.com/bitnami/charts/tree/master/bitnami/postgresql/#installing-the-chart) and [Kafka](https://github.com/bitnami/charts/tree/master/bitnami/kafka) using the links provided. You can install it using Bitnami's Helm Charts.

### Recommendations

1. Install Linkerd or Envoy for load balancing inter-microservice communication load balanding using GRPC.
2. Install Redis and update your `public` microservice to keep track of your rate limiting through it (instead of memory: which is the default).
3. Make sure to separate your Kafka and PostgreSQL cluster from your application cluster to handle failovers. Make sure that PG has the necessary memory and cpu, and runs on cluster mode with 1 master and 2 slave nodes.
4. If you're using Cloudflare as your CDN and DNS provider, make sure that you install Automated Origin CA for Kubernetes to automatically generate SSL certificates (instead of let's encrypt) and turn on the "Full" SSL protection on Cloudflare for SSL pinning and validation to protect your infrastructure against MITM attacks. More information can be found using their [Github page](https://github.com/cloudflare/origin-ca-issuer).
5. By default, autoscaling is turned on the configurations. If you have a low budget and don't want to provide high availability, turn off it or reduce the maximum replication count.

### Installation

**Important Note**: We will not cover Let's Encrypt setup or any other configuration related to Kubernetes cluster in this documentation. Make sure that you have the necessary TLS kubernetes secrets referenced in the `*-values.yaml` file.

1. Create a namespace on your kubernetes cluster using `kubectl create namespace microservices`

2. Update your environment values in `service-environments.yaml` and update them using

```bash
kubectl apply -f ./service-environments.yaml
```

3. Prepare your deployments

- For HTTP microservices who need an ingress:

```bash
helm install -f ./public-values.yaml public-worker ./charts/http-microserice-chart -n microservices
```

- For GRPC microservices with built-in health check:

```bash
helm install -f ./subscription-values.yaml subscription-worker ./charts/grpc-microserice-chart -n microservices
```
