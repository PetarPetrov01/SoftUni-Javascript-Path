import { showHome } from "./home.js";
import { el } from "./dom.js";

const homeAnchorEl = document.querySelector("a");
homeAnchorEl.addEventListener("click", showHome);

function fetchPost() {
  const postId = localStorage.getItem("postId");
  loadPost(postId);
}

fetchPost();

async function loadPost(postId) {
  try {
    const res = await fetch(`http://localhost:3030/jsonstore/collections/myboard/posts/${postId}`);

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message);
    }
    const post = await res.json();
    const themContentDivEl = document.querySelector(".theme-content");
    themContentDivEl.replaceChildren();

    const themeTitileDivEl = el("div", "", themContentDivEl, { class: "theme-title" });
    const themeNameWrapperDivEl = el("div", "", themeTitileDivEl, { class: "theme-name-wrapper", });
    const themeNameDivEl = el("div", "", themeNameWrapperDivEl, { class: "theme-name", });
    el("h2", post.title, themeNameDivEl, {});

    const commentDivEl = el("div", "", themContentDivEl, { class: "comment", });
    const headerDivEl = el("div", "", commentDivEl, { class: "header", });
    el("img", "", headerDivEl, { src: "./static/profile.png", alt: "avatar", });
    const paragraphElement = el("p", "", headerDivEl, {});

    paragraphElement.innerHTML = `<span>${post.username}</span> posted on <time>${post.createDate}</time>`;
    el("p", post.content, headerDivEl, { class: "post-content", });

    const comments = await loadComments(postId);

    for (const comment of Object.values(comments)) {
      const userCommentDivEl = el("div", "", commentDivEl, { class: "user-comment", });
      const topicNameWrapper = el("div", "", userCommentDivEl, { class: "topic-name-wrapper", });
      const topicNameDivEl = el("div", "", topicNameWrapper, { class: "topic-name", });
      const paragraphEl = el("p", "", topicNameDivEl, {});
      paragraphEl.innerHTML = `<strong>${comment.username}</strong> commented on <time>${comment.createDate}</time>`;

      const postContentDivEl = el("div", "", topicNameDivEl, { class: "post-content", });
      el("p", comment.content, postContentDivEl, {});
    }

    const asnwerCommentDivEl = el("div", "", themContentDivEl, { class: "answer-comment", });
    const answerParagraphEl = el("p", "", asnwerCommentDivEl, {});
    answerParagraphEl.innerHTML = `<span>currentUser</span> comment:`;

    const divElementAnswer = el("div", "", asnwerCommentDivEl, { class: "answer", });
    const formAnswerEl = el("form", "", divElementAnswer, {});
    formAnswerEl.innerHTML = ` <textarea name="postText" id="comment" cols="30" rows="10"></textarea>`;

    const formDivEl = el("div", "", formAnswerEl, {});
    const labeEl = el("label", "", formDivEl, {
      for: "username",
    });
    labeEl.innerHTML = `Username <span class='red'>*</span>`;

    el("input", "", formDivEl, {
      type: "text",
      name: "username",
      id: "username",
    });

    el("button", "Post", formAnswerEl, { id: "postButton", });
    let formElement = document.querySelector("form");
    formElement.setAttribute("dataset.id", postId);

    const postButtonEl = document.getElementById("postButton");

    postButtonEl.addEventListener("click", async (event,) => {
      event.preventDefault();
      let postId = formElement.getAttribute("dataset.id");

      let content = document.querySelector('textarea').value.trim();
      let username = document.querySelector('input').value.trim();

      let createDate = new Date();
      try {
        if (!username) {
          throw new Error('Username is requierd!')
        } else if (!content) {
          throw new Error('Content is requierd!')
        }
        const res = await fetch('http://localhost:3030/jsonstore/collections/myboard/comments', {
          method: "post",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ username, content, createDate, postId })
        })
        if (!res.ok) {
          throw new Error('ERORR')
        }
        fetchPost()
        formElement.reset();
      } catch (err) {
        alert(err.message)
      }
    });
  } catch (error) {
    alert(error.message);
  }
}

async function loadComments(postId) {
  try {
    const res = await fetch("http://localhost:3030/jsonstore/collections/myboard/comments");
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message);
    }
    const comments = await res.json();
    return Object.values(comments).filter(
      (c) => c.postId === postId
    );
  } catch (error) {
    alert(error.message);
  }
}
