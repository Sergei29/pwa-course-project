var shareImageButton = document.querySelector("#share-image-button");
var createPostArea = document.querySelector("#create-post");
var closeCreatePostModalButton = document.querySelector(
  "#close-create-post-modal-btn",
);

function openCreatePostModal() {
  createPostArea.style.display = "block";

  if (deferredPrompt && deferredPrompt.prompt) {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((result) => {
      console.log("user choice: ", result.outcome);
      if (result.outcome === "dismissed") {
        console.log("user cancelled installation");
      } else {
        console.log("user added app to homescreen");
      }
    });
    deferredPrompt = null;
  }
}

function closeCreatePostModal() {
  createPostArea.style.display = "none";
}

shareImageButton.addEventListener("click", openCreatePostModal);

closeCreatePostModalButton.addEventListener("click", closeCreatePostModal);
