# Redis JSON Directory Spider

Spiders a directory tree containing JSON files and writes their contents to [Redis](https://redis.io) using [RedisJSON](https://redisjson.io).

Use the supplied `docker-compose.yml` to get an appropriate Redis server with RedisJSON installed.

Uses [node-redis](https://npmjs.com/package/redis) version 4.

TODO: Proper README...

## Getting Started:

```bash
$ git clone https://github.com/simonprickett/redis-json-directory-spider.git
$ docker-compose up -d
$ npm install
$ node spider.js
```

Expected output:

```
data/folder1/file1.json
{ "name": "file1.json" }
data/folder1/file2.json
{ "name": "file2.json" }
data/folder2/file3.json
{ "name": "file3.json" }
data/folder2/file4.json
{ "name": "file4.json" }
data/folder3/file5.json
{ "name": "file5.json" }
data/folder3/file6.json
{ "name": "file6.json" }
spider $ redis-cli
127.0.0.1:6379> keys file:*
1) "file:data/folder2/file3.json"
2) "file:data/folder1/file2.json"
3) "file:data/folder3/file6.json"
4) "file:data/folder1/file1.json"
5) "file:data/folder3/file5.json"
6) "file:data/folder2/file4.json"
127.0.0.1:6379> json.get file:data/folder1/file2.json $
"{\"name\":\"file2.json\"}"
```
