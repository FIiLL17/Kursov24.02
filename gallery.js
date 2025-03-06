let currentImages = [];
        let currentIndex = 0;

        function openModal(category, images, title, descriptions) {
            currentImages = images;
            currentIndex = 0;
            document.getElementById("modal-image").src = currentImages[currentIndex];
            document.getElementById("modal-title").textContent = title;
            document.getElementById("modal-description1").textContent = descriptions[0] || "";
            document.getElementById("modal-description2").textContent = descriptions[1] || "";
            document.getElementById("modal-description3").textContent = descriptions[2] || "";
            document.getElementById("modal").style.display = "flex";
        }

        function closeModal(event) {
            if (!event || event.target.id === "modal" || event.target.classList.contains("close-button")) {
                document.getElementById("modal").style.display = "none";
            }
        }

        function nextImage(event) {
            event.stopPropagation();
            if (currentIndex < currentImages.length - 1) {
                currentIndex++;
                document.getElementById("modal-image").src = currentImages[currentIndex];
            }
        }

        function prevImage(event) {
            event.stopPropagation();
            if (currentIndex > 0) {
                currentIndex--;
                document.getElementById("modal-image").src = currentImages[currentIndex];
            }
        }