## clouddisk

Clouddisk is for setup your own cloud disk on your server.

- Support to management files
- Support to 10+ file types preview
- Support to upload files
- Support to download files

It's built by React and Express, and support you to manage your files by broswer from any device.

### Get started

Run the docker container by pulling the image directly.

```sh
docker run -d -p 7001:80 -v ~/Downloads:/data cenxky/clouddisk
```

Alternative, you can also use `git clone` to start development.

```sh
git clone git@github.com:cenxky/clouddisk.git
cd clouddisk && npm install
npm run dev
```

Then, visit cloud disk by URL:

```
http://localhost:7001
```

### License

Released under the MIT license. See LICENSE file for details.
