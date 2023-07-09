import { el } from "./dom.js";

export async function showHome(e) {
    e.preventDefault();
    localStorage.clear;
    window.location = "./index.html";
}


if (!window.location.href.includes("theme-content.html")) {
    loadPosts();
}

function showComments(e) {
    let postId;
    if (e.target.tagName === "a") {
        postId = e.target.dataset.id;
    } else {
        postId = e.target.parentElement.getAttribute("dataset.id");
    }
    localStorage.setItem("postId", postId);
    window.location = "./theme-content.html";
}

async function loadPosts() {
    let topicDivEl = document.querySelector(".topic-title");
    topicDivEl.replaceChildren();

    try {
        let response = await fetch("http://localhost:3030/jsonstore/collections/myboard/posts");
        if (!response.ok) {
            let error = await response.json();
            throw new Error(error.message);
        }

        let posts = await response.json();
        for (const [postId, post] of Object.entries(posts)) {

            let topicContainerDivEl = el("div", "", topicDivEl, { class: "topic-container" });
            let topicNameWrapperDivEl = el("div", "", topicContainerDivEl, { class: "topic-name-wrapper", });
            let topicNameDivEl = el("div", "", topicNameWrapperDivEl, { class: "topic-name", });
            let anchorEl = el("a", "", topicNameDivEl, { href: "#", "dataset.id": postId, class: "normal", });
            anchorEl.addEventListener("click", showComments);

            el("h2", post.title, anchorEl, {});
            let columnsDivElement = el("div", "", topicNameDivEl, { class: "columns", });
            let divElement = el("div", "", columnsDivElement, {});
            let dateParagraphEl = el("p", "Date:", divElement, {});
            el("time", post.createDate, dateParagraphEl, {});
            let nickNameDivEl = el("div", "", divElement, { class: "nick-name", });
            let userNameParagraphEl = el("p", "Username: ", nickNameDivEl, {});
            el("span", post.username, userNameParagraphEl, {});
        }
    } catch (error) {
        alert(error.message);
    }
}

export async function createPost(e) {
    e.preventDefault();

    const formElement = document.querySelector("form");

    let formData = new FormData(formElement);

    const title = formData.get("topicName").trim();
    const username = formData.get("username").trim();
    const content = formData.get("postText").trim();
    const createDate = new Date();

    try {
        if (!title) {
            throw new Error("You need a title!");
        } else if (!username) {
            throw new Error("You can't post without username!");
        } else if (!content) {
            throw new Error("Post content is requierd!");
        }
        const body = JSON.stringify({ title, username, content, createDate })
        const res = await fetch("http://localhost:3030/jsonstore/collections/myboard/posts", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body
        }
        );

        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.message);
        }

        formElement.reset();
        await loadPosts();
    } catch (error) {
        alert(error.message);
    }
}

export function onCancel(e) {
    e.preventDefault();

    document.querySelector("form").reset()
}
