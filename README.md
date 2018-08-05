# react boilerplate ssr example

this project was created with [razzle](https://github.com/jaredpalmer/razzle) and is an example of [react-boilerplate](https://github.com/react-boilerplate/react-boilerplate) with server-side rendering

## differences

the only difference of merit is that react-router-dom and react-router-redux are replaced by [@reach/router](https://github.com/reach/router). this isn't a full solution to replacing `react-router-redux`, but its a lot better than react-router itself. it's easy to remove, so feel free.

other differences

- no htaccess or nginx.conf (you can add those yourself)
- no favicons/icons
- no manifest.json (replaced with an assets-manifest.json thats compiled by razzle)
