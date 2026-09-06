document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // 1. نظام تشغيل وتحويل الوضع الليلي (Dark Mode)
    // ==========================================
    const darkModeToggle = document.getElementById("dark-mode-toggle");
    const bodyElement = document.body;

    if (localStorage.getItem("theme") === "dark") {
        bodyElement.classList.add("dark-theme");
        if(darkModeToggle) darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }

    if(darkModeToggle) {
        darkModeToggle.addEventListener("click", () => {
            bodyElement.classList.toggle("dark-theme");
            if (bodyElement.classList.contains("dark-theme")) {
                localStorage.setItem("theme", "dark");
                darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            } else {
                localStorage.setItem("theme", "light");
                darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            }
        });
    }

    // ==========================================
    // 2. بوابة الإداريين المخصصة وتسجيل الدخول
    // ==========================================
    const adminLoginBtn = document.getElementById("admin-login-btn");
    const loginModal = document.getElementById("login-modal");
    const closeModal = document.querySelector(".close-modal");
    const adminLoginForm = document.getElementById("admin-login-form");

    if(adminLoginBtn) {
        adminLoginBtn.addEventListener("click", () => {
            loginModal.style.display = "flex";
        });
    }

    if(closeModal) {
        closeModal.addEventListener("click", () => {
            loginModal.style.display = "none";
        });
    }

    if(adminLoginForm) {
        adminLoginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const email = document.getElementById("admin-email").value.trim();
            const password = document.getElementById("admin-password").value;

            if (email === "zina@brand.com" && password === "zina2026") {
                alert("مرحباً بكِ يا زينة! جاري توجيهك إلى لوحة التحكم...");
                loginModal.style.display = "none";
               window.location.href = "/control/index.html";

            } else {
                alert("عذراً، البريد الإلكتروني أو كلمة السر غير صحيحة!");
            }
        });
    }

    // ==========================================
    // 3. 🆕 جلب وعرض المنتجات المرفوعة من الهاتف تلقائياً
    // ==========================================
    const productsContainer = document.querySelector(".products-container");
    // جلب قائمة المنتجات المخزنة من لوحة التحكم
    const savedProducts = JSON.parse(localStorage.getItem("zina_products")) || [];

    if (productsContainer && savedProducts.length > 0) {
        savedProducts.forEach(product => {
            // إنشاء كارت HTML مخصص لكل منتج جديد تم رفعه
            const card = document.createElement("div");
            card.className = "product-card";
            card.setAttribute("data-id", product.id);

            // تجهيز شارة الحالة إن وجدت
            const badgeHTML = product.badge ? `<span class="badge">${product.badge}</span>` : "";

            card.innerHTML = `
                <div class="product-image">
                    <img src="${product.image}" alt="${product.title}" class="zoomable-img">
                    ${badgeHTML}
                </div>
                <div class="product-info">
                    <h3>${product.title}</h3>
                    <p class="price">${product.price}</p>
                    <div class="card-actions">
                        <a href="#" class="buy-btn">
                            <i class="fab fa-whatsapp"></i> اطلبي الآن
                        </a>
                        <button class="share-btn" title="مشاركة المنتج">
                            <i class="fas fa-share-alt"></i>
                        </button>
                    </div>
                </div>
            `;
            // إضافة المنتج المرفوع حديثاً إلى أول المعرض ليراه الزوار فوراً
            productsContainer.insertBefore(card, productsContainer.firstChild);
        });
    }

    // ==========================================
    // 4. نظام تكبير الصور والطلبات والمشاركة (Dynamic Bind)
    // ==========================================
    const lightboxModal = document.getElementById("lightbox-modal");
    const lightboxImg = document.getElementById("lightbox-img");
    const lightboxCaption = document.getElementById("lightbox-caption");
    const closeLightbox = document.querySelector(".close-lightbox");

    // نستخدم تكتيك الـ Delegation ليعمل الكود مع المنتجات القديمة والجديدة معاً
    document.body.addEventListener("click", (e) => {
        // أ) تكبير الصورة عند الضغط عليها
        if (e.target.classList.contains("zoomable-img")) {
            if(lightboxModal && lightboxImg && lightboxCaption) {
                lightboxModal.style.display = "flex";
                lightboxImg.src = e.target.src;
                lightboxCaption.textContent = e.target.alt;
            }
        }

        // ب) تشغيل زر الواتساب الذكي للطلب
        if (e.target.closest(".buy-btn")) {
            e.preventDefault();
            const card = e.target.closest(".product-card");
            if (card) {
                const productName = card.querySelector("h3").textContent;
                const productPrice = card.querySelector(".price").textContent;
                const phoneNumber = "201234567890"; // رقم افتراضي للطلبات

                const message = `مرحباً زينة ✨\nأود طلب قطعة من متجركِ:\n\n📦 المنتج: *${productName}*\n💰 السعر: *${productPrice}*`;
                const whatsappURL = "https://wa.me" + phoneNumber + "?text=" + encodeURIComponent(message);
                window.open(whatsappURL, "_blank");
            }
        }

        // ج) تشغيل زر مشاركة رابط المنتج
        if (e.target.closest(".share-btn")) {
            const card = e.target.closest(".product-card");
            if (card) {
                const productId = card.getAttribute("data-id");
                const productURL = window.location.origin + window.location.pathname + "#product-" + productId;

                navigator.clipboard.writeText(productURL).then(() => {
                    alert("تم نسخ رابط المنتج بنجاح! يمكنك الآن مشاركته في تيك توك أو واتساب.");
                }).catch(() => {
                    alert("عذراً، لم نتمكن من نسخ الرابط.");
                });
            }
        }
    });

    if(closeLightbox) {
        closeLightbox.addEventListener("click", () => {
            lightboxModal.style.display = "none";
        });
    }

    window.addEventListener("click", (e) => {
        if (e.target === loginModal) loginModal.style.display = "none";
        if (e.target === lightboxModal) lightboxModal.style.display = "none";
    });

});
