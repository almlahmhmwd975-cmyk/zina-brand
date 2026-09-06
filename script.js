document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // 1. نظام تشغيل وتحويل الوضع الليلي (Dark Mode)
    // ==========================================
    const darkModeToggle = document.getElementById("dark-mode-toggle");
    const bodyElement = document.body;

    // التحقق مما إذا كان الزائر قد اختار الوضع المظلم سابقاً
    if (localStorage.getItem("theme") === "dark") {
        bodyElement.classList.add("dark-theme");
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>'; // تغيير الأيقونة لشمس
    }

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

    // ==========================================
    // 2. بوابة الإداريين المخصصة وتسجيل الدخول (Admin Login)
    // ==========================================
    const adminLoginBtn = document.getElementById("admin-login-btn");
    const loginModal = document.getElementById("login-modal");
    const closeModal = document.querySelector(".close-modal");
    const adminLoginForm = document.getElementById("admin-login-form");

    // فتح النافذة المنبثقة عند الضغط على زر إداريين
    adminLoginBtn.addEventListener("click", () => {
        loginModal.style.display = "flex";
    });

    // إغلاق النافذة عند الضغط على علامة X
    closeModal.addEventListener("click", () => {
        loginModal.style.display = "none";
    });

    // التحقق من بيانات الدخول لزينة لفتح الـ CMS
    adminLoginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = document.getElementById("admin-email").value.trim();
        const password = document.getElementById("admin-password").value;

        // يمكنك تعديل الإيميل والباسورد الافتراضيين هنا حسب رغبتك
        if (email === "zina@brand.com" && password === "zina2026") {
            alert("مرحباً بكِ يا زينة! جاري توجيهك إلى لوحة التحكم...");
            loginModal.style.display = "none";
            // فتح لوحة تحكم Decap CMS الموجودة في مجلد admin تلقائياً
            window.location.href = "/admin/";
        } else {
            alert("عذراً، البريد الإلكتروني أو كلمة السر غير صحيحة!");
        }
    });

    // ==========================================
    // 3. نظام تكبير صور الإكسسوارات (Lightbox)
    // ==========================================
    const lightboxModal = document.getElementById("lightbox-modal");
    const lightboxImg = document.getElementById("lightbox-img");
    const lightboxCaption = document.getElementById("lightbox-caption");
    const closeLightbox = document.querySelector(".close-lightbox");
    const zoomableImages = document.querySelectorAll(".zoomable-img");

    zoomableImages.forEach(img => {
        img.addEventListener("click", () => {
            lightboxModal.style.display = "flex";
            lightboxImg.src = img.src;
            lightboxCaption.textContent = img.alt;
        });
    });

    closeLightbox.addEventListener("click", () => {
        lightboxModal.style.display = "none";
    });

    // إغلاق النوافذ عند الضغط في أي مكان خارجها
    window.addEventListener("click", (e) => {
        if (e.target === loginModal) loginModal.style.display = "none";
        if (e.target === lightboxModal) lightboxModal.style.display = "none";
    });

    // ==========================================
    // 4. نظام الطلبات الذكي ومشاركة المنتجات
    // ==========================================
    const buyButtons = document.querySelectorAll(".buy-btn");
    const shareButtons = document.querySelectorAll(".share-btn");

    // إرسال تفاصيل المنتج للواتساب تلقائياً عند طلب الشراء
    buyButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            e.preventDefault();
            const productCard = button.closest(".product-card");
            const productName = productCard.querySelector("h3").textContent;
            const productPrice = productCard.querySelector(".price").textContent;

            // رقم واتساب زينة الحقيقي
            const phoneNumber = "201080849840"; 
            const message = `مرحباً زينة ✨\nأود طلب قطعة من متجركِ:\n\n📦 المنتج: *${productName}*\n💰 السعر: *${productPrice}*`;
            
           
const whatsappURL = "https://wa.me" + phoneNumber + "?text=" + encodeURIComponent(message);
window.open(whatsappURL, "_blank");

            
        });
    });

    // نسخ رابط المنتج عند الضغط على زر المشاركة
    shareButtons.forEach(button => {
        button.addEventListener("click", () => {
            const productCard = button.closest(".product-card");
            const productId = productCard.getAttribute("data-id");
            // إنشاء رابط مباشر للمنتج يعتمد على مكانه في الصفحة
            const productURL = `${window.location.origin}${window.location.pathname}#product-${productId}`;

            navigator.clipboard.writeText(productURL).then(() => {
                alert("تم نسخ رابط المنتج بنجاح! يمكنك الآن مشاركته في تيك توك أو واتساب.");
            }).catch(() => {
                alert("عذراً، لم نتمكن من نسخ الرابط تلقائياً.");
            });
        });
    });

});
