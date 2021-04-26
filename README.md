<h1 align="center">
    <img alt="Binamik Logo" src="./public/logo.svg"/>
</h1>

<h3 align="center">
  API para teste Frontend
</h3>

<p align="center">
  <img alt="Made by Binamik" src="https://img.shields.io/badge/made%20by-Binamik-%231ed6bb">
</p>

## :computer: Project

Essa é a [API](https://binamik-frontend-test-api.vercel.app/) que você utilizará para o desenvolvimento da aplicação para o teste da vaga de fontend da Binamik.

Essa [API](https://binamik-frontend-test-api.vercel.app/) simula uma api simples de uma pizzaria que realiza suas vendas online e para o acesso do usuário final existem apenas 3 rotas:

### Listagem de Pizzas:
``` ts
[GET] > "/api/v1/pizzas"

QueryParams:
  lang: "pt" | "en" (default: "pt")

example: "/api/v1/pizzas?lang=en"
```

### Detalhamento de cada pizza:
```ts
[GET] > "/api/v1/pizzas/{pizzaId}"

RouteParams:
  pizzaId: string //required

QueryParams:
  lang: "pt" | "en" (default: "pt")

example: "/api/v1/pizzas/pizza_01?lang=en"
```

### Realização de pedido:
```ts
[POST] > "/api/v1/orders/pizza"

RequestBody: {
  pizzaId: string
  size: string
  extras: string[]
  notes: string //optional
}
```

Para informações mais detalhadas sobre cada uma das rotas acesse a home onde disponibilizamos um Swagger com todo o detalhamento das informações mais relevantes.

Segue abaixo o link para acessar a api:
https://binamik-frontend-test-api.vercel.app/

Caso tenha qualquer dúvida ou encontre um bug entre em contato conosco.

Made with ♥ by the Binamik Team :wave:
