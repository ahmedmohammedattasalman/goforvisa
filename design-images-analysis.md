# GoForVisa Affiliate Portal Design Analysis

This document provides a detailed layout, styling, and text content analysis of the GoForVisa Affiliate Portal designs (9 images) to guide the Next.js development.

---

## Global Design System & Styling Guide

*   **Language & Layout**: Arabic (Right-to-Left / RTL). All elements flow from right to left.
*   **Typography**: Clean modern Arabic Sans-Serif font (e.g., Cairo, Tajawal, or Google Sans Arabic).
*   **Color Palette**:
    *   **Primary Dark/Navy**: `#0F172A` / `#0A192F` (used for header backgrounds, sidebar, primary buttons, table headers).
    *   **Primary Gold/Bronze Accent**: `#C5A059` / `#D4AF37` (used for active states, highlighted stats, primary brand elements, icons).
    *   **Backgrounds**: Light neutral grey (`#F8F9FA` or `#F4F6F9`) for page backgrounds; pure white (`#FFFFFF`) for cards, forms, tables.
    *   **Success Green**: `#10B981` / `#2ECC71` (used for "Completed" states, positive margins, success alerts).
    *   **Info Blue**: `#3B82F6` / `#3498DB` (used for "Processing" states).
    *   **Warning Orange/Yellow**: `#F59E0B` / `#E67E22` (used for pending review, waiting for documents).
    *   **Danger Red**: `#EF4444` / `#E74C3C` (used for cancelled states).

---

## Detailed Page Analyses

### Image 1: Overview Dashboard Composite (`WhatsApp Image 2026-06-19 at 1.14.07 AM.jpeg`)
*   **Description**: A composite of the entire design system layout and dashboard modules.
*   **Header Section**:
    *   Left side: GoForVisa Gold Logo + Text `GoForVisa خدمات التأشيرات والهجرة`.
    *   Center Title: `بوابة شركاء GoForVisa` (GoForVisa Partner Portal).
    *   Center Subtitles:
        *   `اربح 500 درهم عن كل ملف مكتمل بنجاح` (Earn 500 DH for each successfully completed file) in gold/green accent.
        *   `أرسل عملاؤك إلى GoForVisa، ونحن نتكفل بجميع الإجراءات والمتابعة حتى الإنجاز` (Send your clients to GoForVisa, and we handle all procedures...).
*   **Top Info Section ("كيف يعمل البرنامج؟" / How the Program Works)**:
    1.  `التسجيل كشريك` - "تقوم بتسجيل حساب جديد من صفحة اعمل معنا" (User profile icon).
    2.  `مراجعة الحساب` - "يتم مراجعة طلبك من طرف فريق GoForVisa" (Checklist icon).
    3.  `تفعيل الحساب` - "بعد الموافقة يتم تفعيل حسابك وإشعارك عبر الإيميل" (Email success check icon).
    4.  `إرسال عميل جديد` - "تقوم بإدخال بيانات العميل وإرسال الطلب" (Send client icon).
    5.  `معالجة الملف` - "فريق GoForVisa يتواصل مع العميل ويتكفل بجميع الإجراءات" (Processing/gears icon).
    6.  `احتساب العمولات` - "عند إنجاز الملف واستلام كامل المبلغ يتم إضافة عمولتك" (Dollar coin icon).

---

### Image 2: Partner Login Page (`WhatsApp Image 2026-06-19 at 1.14.07 AM (1).jpeg`)
*   **Description**: Login screen for partners.
*   **UI Components**:
    *   Centered card component on neutral background.
    *   Large circular blue icon with a white user outline at top of card.
    *   Title: `تسجيل دخول الشريك` (Partner Login).
    *   Subtitle: `مرحباً بك، قم بتسجيل الدخول إلى حسابك لمتابعة أعمالك` (Welcome...).
    *   **Form Input Fields**:
        *   `البريد الإلكتروني` (Email): Left-aligned mail icon, placeholder: `أدخل بريدك الإلكتروني` (Enter your email).
        *   `كلمة المرور` (Password): Left-aligned lock icon, placeholder: `أدخل كلمة المرور` (Enter your password), right-aligned eye icon for toggling visibility.
    *   Link: `نسيت كلمة المرور؟` (Forgot password?) in blue text.
    *   Button: `تسجيل الدخول` (Login) - Full-width, Gold background, white text, lock icon.
    *   Divider: `أو` (Or) with horizontal lines.
    *   Button: `تسجيل حساب جديد` (Register new account) - Full-width, white background, blue outline, blue text.
*   **Footer**:
    *   `دعم العملاء` (Customer Support): `+212 6 12 34 56 78` (with headset icon).
    *   `البريد الإلكتروني` (Email): `contact@goforvisa.ma` (with mail icon).
    *   `أوقات العمل` (Working Hours): `الإثنين - الجمعة : 9:00 - 18:00` (with clock icon).
    *   Copyright: `جميع الحقوق محفوظة. GoForVisa 2024 ©`

---

### Image 3: Create Partner Account Page (`WhatsApp Image 2026-06-19 at 1.14.07 AM (2).jpeg`)
*   **Description**: Partner registration form.
*   **UI Components**:
    *   Centered card titled: `إنشاء حساب شريك جديد` (Create new partner account).
    *   Subtitle: `املأ المعلومات التالية لإنشاء حسابك كشريك في GoForVisa`.
    *   **Section 1: المعلومات الشخصية (Personal Info)** (with user badge icon):
        *   `الاسم الكامل` (Full Name) - placeholder: `أدخل اسمك الكامل`
        *   `اسم الشركة (اختياري)` (Company Name - Optional) - placeholder: `أدخل اسم الشركة` (with business icon)
        *   `رقم الهاتف` (Phone Number) - placeholder: `أدخل رقم هاتفك` (with phone icon)
        *   `البريد الإلكتروني` (Email) - placeholder: `أدخل بريدك الإلكتروني` (with mail icon)
        *   `المدينة` (City) - dropdown selector with map pin icon: `اختر مدينتك`
    *   **Section 2: معلومات الحساب (Account Info)** (with lock badge icon):
        *   `كلمة المرور` (Password) - placeholder: `أدخل كلمة المرور` (with visibility eye icon)
        *   `تأكيد كلمة المرور` (Confirm Password) - placeholder: `أعد إدخال كلمة المرور` (with visibility eye icon)
        *   **Requirements Box (متطلبات كلمة المرور)**:
            *   `أن تكون الكلمة 8 أحرف على الأقل` (At least 8 characters)
            *   `أن تحتوي على حرف كبير وحرف صغير` (Contains uppercase and lowercase letters)
            *   `أن تحتوي على رقم واحد على الأقل` (Contains at least one number)
    *   Checkbox: `أوافق على الشروط والأحكام وسياسة الخصوصية` (I agree to terms...).
    *   Button: `إنشاء حساب` (Create account) - Full-width, Navy Blue background, user-plus icon.
    *   Link: `لديك حساب بالفعل؟ تسجيل الدخول` (Already have an account? Login) centered at the bottom.

---

### Image 4: Send New Client Page (`WhatsApp Image 2026-06-19 at 1.14.07 AM (3).jpeg`)
*   **Description**: Submission form for new client referrals.
*   **Layout**: Right sidebar layout. Active menu: `إرسال عميل جديد`.
*   **Form Sections**:
    *   **معلومات العميل (Client Info)**:
        *   `الاسم الكامل` (Full Name) - placeholder: `أدخل اسم العميل الكامل` (with user icon)
        *   `رقم الهاتف` (Phone Number) - placeholder: `أدخل رقم الهاتف` (with phone icon)
        *   `البريد الإلكتروني` (Email) - placeholder: `أدخل البريد الإلكتروني` (with mail icon)
        *   `الجنسية` (Nationality) - placeholder: `أدخل الجنسية` (with globe icon)
        *   `تاريخ الميلاد` (Date of Birth) - Date picker, placeholder: `تاريخ الميلاد` (with calendar icon)
    *   **معلومات الطلب (Request Info)**:
        *   `الدولة المطلوبة` (Requested Country) - Dropdown (e.g. France, Spain).
        *   `نوع التأشيرة` (Visa Type) - Dropdown (e.g. Tourist, Work, Study).
        *   `ملاحظات إضافية` (Additional Notes) - Text area.
    *   Button: `إرسال الطلب` (Send request) - Navy Blue background.

---

### Image 5: Files List Page (`WhatsApp Image 2026-06-19 at 1.14.07 AM (4).jpeg`)
*   **Description**: Tabular overview of all files submitted by the partner.
*   **Layout**: Right sidebar layout. Active menu: `قائمة الملفات`.
*   **UI Components**:
    *   Header search & filter row:
        *   Search field: `بحث برقم الملف، اسم العميل...` (Search by file number, client name...).
        *   Filter dropdown: `تصفية حسب الحالة` (Filter by status).
        *   Date range picker.
    *   **Table Columns**:
        *   `رقم الملف` (File Number) - e.g., `GFV-2024-000123`
        *   `اسم العميل` (Client Name)
        *   `الدولة` (Country)
        *   `نوع التأشيرة` (Visa Type)
        *   `تاريخ الإرسال` (Send Date)
        *   `الحالة` (Status) - pill badges with colors:
            *   `تم الإنجاز` (Green)
            *   `قيد المعالجة` (Blue)
            *   `في انتظار البيانات` (Orange)
            *   `ملغى` (Red)
        *   `العمولة` (Commission) - e.g., `500 DH`
        *   `إجراءات` (Actions) - eye icon button.

---

### Image 6: Profits and Commissions Page (`WhatsApp Image 2026-06-19 at 1.14.07 AM (5).jpeg`)
*   **Description**: Overview of commissions, payout history, and requesting a withdrawal.
*   **Layout**: Right sidebar layout. Active menu: `الأرباح والعمولات`.
*   **Top Cards (Metrics)**:
    1.  `الرصيد الحالي` (Current Balance): `12,000 DH` (highlighted in gold, with `طلب سحب الأرباح` button).
    2.  `إجمالي العمولات` (Total Commissions): `32,500 DH`
    3.  `العمولات المدفوعة` (Paid Commissions): `20,500 DH`
*   **Two-Column Sub-Layout**:
    *   **Right Column - طلب سحب الأرباح (Withdrawal Request)**:
        *   `طريقة السحب` (Withdrawal Method): Radio/Dropdown cards (Wafacash, Cash Plus, Bank Transfer).
        *   `المبلغ المراد سحبه` (Amount to withdraw): input field with placeholder `أدخل المبلغ بالدرهم`.
        *   Button: `إرسال طلب السحب` (Send request) - Navy background.
    *   **Left Column - سجل السحوبات (Withdrawal History)**:
        *   Table columns: `رقم العملية` (Transaction ID), `التاريخ` (Date), `طريقة السحب` (Method), `المبلغ` (Amount), `الحالة` (Status) (e.g. `تم التحويل` green, `قيد المراجعة` orange).

---

### Image 7: Payments Page (`WhatsApp Image 2026-06-19 at 1.14.07 AM (6).jpeg`)
*   **Description**: Financial overview of payments received from client files.
*   **Layout**: Right sidebar layout. Active menu: `المدفوعات`.
*   **Top Cards (Metrics)**:
    1.  `إجمالي المبيعات` (Total Sales): `90,000 DH`
    2.  `الدفعات المستلمة` (Received Payments): `75,000 DH`
    3.  `الدفعات المتبقية` (Remaining Payments): `15,000 DH`
*   **Client Payments Table (تفاصيل مدفوعات العملاء)**:
    *   Table columns: `رقم الملف` (File ID), `اسم العميل` (Client), `قيمة الخدمة` (Fee: 3,000 DH), `الدفعة الأولى` (1st Pay: 1,500 DH), `الدفعة الثانية` (2nd Pay: 1,500 DH), `المجموع المستلم` (Total Recv), `الحالة` (Status badge, e.g. `مدفوع بالكامل` Green, `جزئي` Orange).

---

### Image 8: Notifications Page (`WhatsApp Image 2026-06-19 at 1.14.07 AM (7).jpeg`)
*   **Description**: View list of all system and status notifications.
*   **Layout**: Right sidebar layout. Active menu: `إرسال عميل جديد` is active in the menu in the original, but the content shows notifications list. We should make `الإشعارات` active when showing this page.
*   **UI Components**:
    *   Header options: `تحديد الكل كمقروء` (Mark all as read), `حذف المحدد` (Delete selected).
    *   List items containing:
        *   Notification type icon (Success check, info, warning alert).
        *   Description text (e.g., `تم تغيير حالة الملف رقم GFV-2024-000123 إلى تم الإنجاز` or `تمت إضافة عمولة 500 درهم إلى رصيدك`).
        *   Time descriptor (e.g., `منذ ساعتين` - 2 hours ago, `منذ يوم` - 1 day ago).
        *   Checkbox for selection, and inline close/delete button.

---

### Image 9: Profile & Settings Page (`WhatsApp Image 2026-06-19 at 1.14.08 AM.jpeg`)
*   **Description**: User settings, profile updates, password change, and banking info.
*   **Layout**: Right sidebar layout. Active menu: `الملف الشخصي`.
*   **Three Configuration Cards**:
    1.  **المعلومات الشخصية (Personal Info)**:
        *   Fields: `الاسم الكامل` (Full Name), `اسم الشركة` (Company), `البريد الإلكتروني` (Email), `رقم الهاتف` (Phone), `المدينة` (City).
        *   Button: `حفظ التغييرات` (Save changes) - Gold background.
    2.  **تغيير كلمة المرور (Change Password)**:
        *   Fields: `كلمة المرور الحالية` (Current Password), `كلمة المرور الجديدة` (New Password), `تأكيد كلمة المرور الجديدة` (Confirm New Password).
        *   Button: `تحديث كلمة المرور` (Update password) - Navy background.
    3.  **المعلومات البنكية (Bank Info)** (Required for bank transfer payouts):
        *   Fields: `اسم البنك` (Bank Name), `صاحب الحساب` (Account Holder Name), `رقم الحساب / RIB / IBAN`.
        *   Button: `حفظ البيانات البنكية` (Save bank info) - Navy background.
