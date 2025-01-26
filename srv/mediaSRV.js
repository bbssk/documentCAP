const cds = require("@sap/cds");
const { Readable, PassThrough } = require("stream");

module.exports = cds.service.impl(function () {
    const { MediaFile } = this.entities;
    this.on("UPDATE", MediaFile, async (req, next) => {
        const url = req._.req.path;

        if (url.includes('content')) {
            const db = await cds.connect.to("db");
            const id = req.data.ID;
            const obj = await db.read(MediaFile, id);
            if (!obj) {
                req.reject(404, "No data found!");
                return;
            }

            obj.fileName = req.headers.slug;
            obj.mediaType = req.headers['content-type'];
            obj.url = `/media/MediaFile(${id})/content`;

            const stream = new PassThrough();
            const chunks = [];

            stream.on('data', (chunk) => {
                chunks.push(chunk);
            });

            stream.on('end', async () => {
                obj.content = Buffer.concat(chunks).toString();
                await db.update(MediaFile, id).with(obj);
                
            });
            req.data.content.pipe(stream);
        }else next();

    });
});
