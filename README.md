Simple example of elixir websockets, React and TomTom map SDK

## Why
I wanted to learn more about websockets and Elixir since I had to write some raport on my University
that was related to Elixir in microservices.

In general find that Elixir is a really fun language and because of Erlang BEAM + OTS it
is really easy to make production ready, scallable and maintainable microservices.

## How to run
```
cd my\_websocket\_app
mix deps.get
iex -S mix&

cd ../frontend
npm i
export REACT_APP_TOMTOM_KEY='here_put_your_tomtom_api_key'
npm run start&
```


## Todo
- Dockerize everything
- Add communication between Registry that is based on JSON. I hope this is possible.
