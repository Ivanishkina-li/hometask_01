"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
// const express = require("express");
const app = (0, express_1.default)();
const port = 3000;
const parserMiddleWare = (0, body_parser_1.default)({});
let videosDB = [
    {
        id: 1,
        title: "backend 1 lesson",
        author: "IT-kamasutra",
        canBeDownloaded: true,
        minAgeRestriction: null,
        createdAt: new Date().toISOString(),
        publicationDate: new Date().toISOString(),
        availableResolutions: ["P720", "P1080", "P1440", "P2160"],
    },
    {
        id: 2,
        title: "подкаст ",
        author: "мы обречены",
        canBeDownloaded: true,
        minAgeRestriction: null,
        createdAt: new Date().toISOString(),
        publicationDate: new Date().toISOString(),
        availableResolutions: ["P720", "P1080", "P1440", "P2160"],
    },
];
app.get("/videos", (req, res) => {
    res.send(videosDB);
});
app.post("/videos", (req, res) => {
    let title = req.body.title;
    let author = req.body.author;
    if (!title ||
        typeof title !== "string" ||
        !title.trim() ||
        title.length > 40) {
        res.status(400).send({
            errorsMessages: [
                {
                    message: "title is incorrect",
                    field: "title",
                },
            ],
        });
        if (!author ||
            typeof author !== "string" ||
            !title.trim() ||
            title.length > 20) {
            res.status(400).send({
                errorsMessages: [
                    {
                        message: "author is incorrect",
                        field: "author",
                    },
                ],
            });
            return;
        }
        const newVideo = {
            id: +new Date(),
            title: req.body.title,
            author: req.body.author,
            canBeDownloaded: req.body.canBeDownloaded || false,
            minAgeRestriction: req.body.minAgeRestriction || null,
            createdAt: new Date().toISOString(),
            publicationDate: new Date().toISOString(),
            availableResolutions: req.body.availableResolutions,
        };
        videosDB.push(newVideo);
        res.status(201).send(newVideo);
    }
});
app.put("/videos/Videoid", (req, res) => {
    let title = req.body.title;
    if (!title || typeof title !== "string" || title.trim()) {
        res.status(400).send({
            errorsMessages: [
                {
                    message: "string",
                    field: "string",
                },
            ],
        });
        return;
    }
    let id = +req.params.Videoid;
    const video = videosDB.find((v) => v.id === id);
    if (video) {
        video.title = title;
        res.status(204).send(video);
    }
    else {
        res.send(404);
    }
});
app.get("/videos/:Videoid", (req, res) => {
    let id = +req.params.Videoid;
    const video = videosDB.find((v) => v.id === id);
    if (video) {
        res.status(200).send(video);
    }
    else {
        res.send(404);
    }
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
