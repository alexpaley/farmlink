# jel


## Clientside Development
public folder is for static assets only.  Only modify front-end source (stylus, jade, js) files in the client folder.

#### Setting up dependencies

``` shell
cd client
npm install
npm install -g jeet stylus gulp # may require sudo
```

#### local dev

``` shell
cd client
gulp dev # will watch for changes and rebuild
open public/index.html # in another terminal window
```

#### rebuilding for nginx

``` shell
ssh mafia@jel.me
cd /home/mafia/code/go/src/github.com/alexpaley/jel
git pull origin master
cd client
gulp # rebuilds files and puts them in the public folder
```
