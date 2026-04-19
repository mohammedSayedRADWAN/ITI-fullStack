import React, { createContext, useContext, useState, useEffect } from 'react';

const translations = {
  en: {
    welcome: 'Welcome',
    productsApp: 'Products App',
    home: 'Home',
    cart: 'Cart',
    login: 'Login',
    signup: 'Signup',
    loginTitle: 'Login to your account',
    loginDesc: 'Enter your email below to login to your account',
    signupTitle: 'Create an account',
    signupDesc: 'Enter your information below to create your account',
    email: 'Email',
    password: 'Password',
    fullName: 'Full Name',
    confirmPassword: 'Confirm Password',
    forgotPassword: 'Forgot your password?',
    dontHaveAccount: "Don't have an account?",
    alreadyHaveAccount: 'Already have an account?',
    signIn: 'Sign in',
    createAccount: 'Create Account',
    loginWithGoogle: 'Login with Google',
    signupWithGoogle: 'Sign up with Google',
    passwordHint: 'Must be at least 8 characters long.',
    confirmPasswordHint: 'Please confirm your password.',
    emailHint: "We'll use this to contact you.",
    startShopping: 'Start Shopping',
    emptyCart: 'Your cart is empty',
    total: 'Total',
  },
  ar: {
    welcome: 'مرحباً',
    productsApp: 'تطبيق المنتجات',
    home: 'الرئيسية',
    cart: 'السلة',
    login: 'تسجيل الدخول',
    signup: 'إنشاء حساب',
    loginTitle: 'تسجيل الدخول إلى حسابك',
    loginDesc: 'أدخل بريدك الإلكتروني أدناه لتسجيل الدخول',
    signupTitle: 'إنشاء حساب جديد',
    signupDesc: 'أدخل معلوماتك أدناه لإنشاء حسابك',
    email: 'البريد الإلكتروني',
    password: 'كلمة المرور',
    fullName: 'الاسم الكامل',
    confirmPassword: 'تأكيد كلمة المرور',
    forgotPassword: 'نسيت كلمة المرور؟',
    dontHaveAccount: 'ليس لديك حساب؟',
    alreadyHaveAccount: 'لديك حساب بالفعل؟',
    signIn: 'تسجيل الدخول',
    createAccount: 'إنشاء الحساب',
    loginWithGoogle: 'الدخول بواسطة جوجل',
    signupWithGoogle: 'التسجيل بواسطة جوجل',
    passwordHint: 'يجب أن تكون ٨ أحرف على الأقل.',
    confirmPasswordHint: 'يرجى تأكيد كلمة المرور الخاصة بك.',
    emailHint: 'سنستخدم هذا للتواصل معك.',
    startShopping: 'ابدأ التسوق',
    emptyCart: 'سلة التسوق فارغة',
    total: 'المجموع',
  },
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'ar' : 'en'));
  };

  const t = (key) => {
    return translations[language][key] || key;
  };

  const dir = language === 'ar' ? 'rtl' : 'ltr';

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
