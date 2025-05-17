// 家庭の常備薬ガイド用JavaScript

// FAQ accordion functionality
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close all other items
            faqItems.forEach(otherItem => {
                if(otherItem !== item && otherItem.classList.contains('faq-active')) {
                    otherItem.classList.remove('faq-active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('faq-active');
        });
    });

    // フォーム送信イベントの処理
    const ctaForm = document.querySelector('.cta-form');
    if (ctaForm) {
        ctaForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = ctaForm.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (isValidEmail(email)) {
                // 通常は実際のバックエンドにフォームを送信します
                // ここでは成功メッセージを表示するだけにします
                showFormSuccess();
                emailInput.value = '';
            } else {
                // 無効なメールアドレスの場合のエラーメッセージ
                showFormError();
            }
        });
    }

    // ページロード時のアニメーション
    animateOnScroll();
    window.addEventListener('scroll', throttle(animateOnScroll, 100));
});

// メールアドレスのバリデーション関数
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// フォーム送信成功時の処理
function showFormSuccess() {
    const ctaContainer = document.querySelector('.cta-container');
    const form = document.querySelector('.cta-form');
    
    // 既存のメッセージを削除
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // 成功メッセージを作成
    const successMessage = document.createElement('div');
    successMessage.className = 'form-message success-message';
    successMessage.textContent = 'ありがとうございます！ガイドをメールでお送りしました。';
    
    // フォームの後に挿入
    form.parentNode.insertBefore(successMessage, form.nextSibling);
    
    // 3秒後にメッセージを削除
    setTimeout(() => {
        successMessage.remove();
    }, 3000);
}

// フォームエラー時の処理
function showFormError() {
    const form = document.querySelector('.cta-form');
    const emailInput = form.querySelector('input[type="email"]');
    
    // 既存のメッセージを削除
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // エラーメッセージを作成
    const errorMessage = document.createElement('div');
    errorMessage.className = 'form-message error-message';
    errorMessage.textContent = '有効なメールアドレスを入力してください。';
    
    // フォームの後に挿入
    form.parentNode.insertBefore(errorMessage, form.nextSibling);
    
    // 入力フィールドにエラースタイルを適用
    emailInput.classList.add('input-error');
    
    // 入力フィールドのフォーカス時にエラースタイルを削除
    emailInput.addEventListener('focus', function() {
        emailInput.classList.remove('input-error');
        errorMessage.remove();
    }, { once: true });
}

// スクロール時のアニメーション
function animateOnScroll() {
    const elements = document.querySelectorAll('.scenario-item, .content-card, .testimonial');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        // 要素が画面内に入ったかどうかをチェック
        if (elementPosition < windowHeight - 100) {
            element.classList.add('fade-in');
        }
    });
}

// スロットリング関数（スクロールイベントの頻度を制限する）
function throttle(func, delay) {
    let lastCall = 0;
    return function(...args) {
        const now = new Date().getTime();
        if (now - lastCall < delay) {
            return;
        }
        lastCall = now;
        return func(...args);
    };
}

// スムーススクロール
const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
smoothScrollLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ページトップへ戻るボタン
window.addEventListener('scroll', function() {
    const scrollToTopBtn = document.querySelector('.scroll-to-top');
    
    if (window.pageYOffset > 300) {
        if (scrollToTopBtn) {
            scrollToTopBtn.classList.add('show');
        }
    } else {
        if (scrollToTopBtn) {
            scrollToTopBtn.classList.remove('show');
        }
    }
});

// ページが読み込まれたときにCSSアニメーションのクラスを追加
window.addEventListener('load', function() {
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});
