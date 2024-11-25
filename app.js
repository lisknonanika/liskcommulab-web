const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");
const { JSDOM } = require("jsdom");
const path = require("path");
const port = 3210;

const app = express();
app.set("view engine", "ejs");
app.set("views", "views");

app.use(cors({ origin: true, credentials: true }));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", async (req, res, next) => {
    res.render("template/index.ejs",
    {
        data: {
            type: "home",
            blog: [await getCommulabBlog()]
        }
    });
});

app.get("/network-monitor", (req, res, next) => {
    res.render("template/index.ejs",
    {
        data: {
            type: "network-monitor"
        }
    });
});

app.listen(port, ()=> {
    console.log(`[start]commulab web(http://127.0.0.1:${port})`);
});

const getCommulabBlog = async() => {
    const blog = {
        error: false,
        title: "",
        thumbnail: "",
        description: "",
        writer: "",
        date: "",
        link: ""
    }

    try {
        const response = await fetch("https://note.com/liskcommulab/m/m573457bba814/rss", { mode: "cors" });
        const xml = await response.text();
    
        const jsdom = new JSDOM();
        const parser = new jsdom.window.DOMParser();
        const dom = parser.parseFromString(xml, "application/xhtml+xml");
        const item = dom.querySelector("item");
        for await (let node of item.childNodes) {
            if (node.nodeName === "title") blog.title = node.textContent;
            if (node.nodeName === "media:thumbnail") blog.thumbnail = node.textContent;
            if (node.nodeName === "description") blog.description = node.textContent.replace('>続きをみる</a>', ' target="_blank" rel="noopener noreferrer">続きをみる</a>');
            if (node.nodeName === "note:creatorName") blog.writer = node.textContent;
            if (node.nodeName === "pubDate") blog.date = new Date(node.textContent).toLocaleString("ja-JP");
            if (node.nodeName === "link") blog.link = node.textContent;
        }
    } catch (err) {
        blog.error = true;
    }
    return blog;
}
